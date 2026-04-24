"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js"; // Import for admin client
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { category, promo_display_type } from "@prisma/client";
import sharp from "sharp";

// Admin client that bypasses RLS
const createAdminClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function sanitizeName(name: string) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

async function uploadAndResizeImage(file: File, itemName: string) {
  const supabase = createAdminClient(); // Use admin client to bypass RLS
  const buffer = Buffer.from(await file.arrayBuffer());
  
  const fileExt = "webp"; 
  const sanitizedItemName = sanitizeName(itemName);
  const baseFileName = `${sanitizedItemName}-${Math.random().toString(36).substring(2, 7)}-${Date.now()}`;
  
  const sizes = [
    { name: "small", width: 200 },
    { name: "medium", width: 600 },
    { name: "large", width: 1200 },
  ];

  const uploadPromises = sizes.map(async (size) => {
    const resizedBuffer = await sharp(buffer)
      .resize(size.width, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const filePath = `products/${baseFileName}-${size.name}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from("sugar_plum_assets")
      .upload(filePath, resizedBuffer, {
        contentType: `image/${fileExt}`,
        upsert: true
      });

    if (error) {
      throw new Error(`Failed to upload ${size.name} image: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from("sugar_plum_assets")
      .getPublicUrl(filePath);

    return { size: size.name, url: publicUrl };
  });

  const results = await Promise.all(uploadPromises);
  
  return {
    image_small: results.find(r => r.size === "small")?.url,
    image_medium: results.find(r => r.size === "medium")?.url,
    image_large: results.find(r => r.size === "large")?.url,
  };
}

async function uploadPromotionImage(file: File, title: string) {
  const supabase = createAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  
  const fileExt = "webp"; 
  const sanitizedTitle = sanitizeName(title);
  const fileName = `promo-${sanitizedTitle}-${Math.random().toString(36).substring(2, 7)}-${Date.now()}.${fileExt}`;
  const filePath = `promotions/${fileName}`;

  // Optimized for 16:9 as discussed (1200x675)
  const resizedBuffer = await sharp(buffer)
    .resize(1200, 675, { fit: "cover", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
    
  const { error } = await supabase.storage
    .from("sugar_plum_assets")
    .upload(filePath, resizedBuffer, {
      contentType: `image/${fileExt}`,
      upsert: true
    });

  if (error) {
    throw new Error(`Failed to upload promotion image: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from("sugar_plum_assets")
    .getPublicUrl(filePath);

  return publicUrl;
}

async function deleteOldImages(urls: (string | null)[]) {
  const supabase = createAdminClient();
  const paths = urls
    .filter(url => url !== null)
    .map(url => {
        // More robust URL parsing to get the path after 'sugar_plum_assets/'
        try {
            const urlObj = new URL(url!);
            const pathParts = urlObj.pathname.split('/sugar_plum_assets/');
            return pathParts.length > 1 ? decodeURIComponent(pathParts[1]) : null;
        } catch (e) {
            // Fallback for simple string splitting
            const parts = url!.split('/sugar_plum_assets/');
            return parts.length > 1 ? parts[1] : null;
        }
    })
    .filter(path => path !== null) as string[];

  if (paths.length > 0) {
    const { error } = await supabase.storage
      .from("sugar_plum_assets")
      .remove(paths);
    
    if (error) {
        console.error("Failed to delete some images from storage:", error.message);
    }
  }
}

export async function addProduct(formData: FormData) {
  const item_name = formData.get("item_name") as string;
  const description = formData.get("description") as string;
  const info = formData.get("info") as string;
  const base_price = BigInt(formData.get("base_price") as string);
  const product_type = formData.get("product_type") as category;
  
  const package_sizes = formData.getAll("package_sizes").map(id => BigInt(id as string));
  const flavor_options = formData.getAll("flavor_options").map(id => BigInt(id as string));

  const imageFile = formData.get("image") as File;
  let images = {
    image_small: null as string | null,
    image_medium: null as string | null,
    image_large: null as string | null,
  };

  if (imageFile && imageFile.size > 0) {
    const uploadedImages = await uploadAndResizeImage(imageFile, item_name);
    images = {
        image_small: uploadedImages.image_small || null,
        image_medium: uploadedImages.image_medium || null,
        image_large: uploadedImages.image_large || null,
    };
  }

  await prisma.products.create({
    data: {
      item_name,
      description,
      info,
      base_price,
      product_type,
      image_large: images.image_large,
      image_medium: images.image_medium,
      image_small: images.image_small,
      avg_rating: 0,
      ratings: BigInt(0),
      product_package_sizes: {
        create: package_sizes.map(id => ({ package_id: id }))
      },
      product_flavour_options: {
        create: flavor_options.map(id => ({ flavor_id: id }))
      }
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  redirect("/admin/menu");
}

export async function updateProduct(id: bigint, formData: FormData) {
  const item_name = formData.get("item_name") as string;
  const description = formData.get("description") as string;
  const info = formData.get("info") as string;
  const base_price = BigInt(formData.get("base_price") as string);
  const product_type = formData.get("product_type") as category;
  
  const package_sizes = formData.getAll("package_sizes").map(id => BigInt(id as string));
  const flavor_options = formData.getAll("flavor_options").map(id => BigInt(id as string));

  const imageFile = formData.get("image") as File;
  const existingSmall = formData.get("existing_image_small") as string | null;
  const existingMedium = formData.get("existing_image_medium") as string | null;
  const existingLarge = formData.get("existing_image_large") as string | null;

  let images = {
    image_small: existingSmall,
    image_medium: existingMedium,
    image_large: existingLarge,
  };

  if (imageFile && imageFile.size > 0) {
    const uploadedImages = await uploadAndResizeImage(imageFile, item_name);
    
    // Clean up old images if new ones were uploaded successfully
    if (uploadedImages.image_large) {
        await deleteOldImages([existingSmall, existingMedium, existingLarge]);
    }

    images = {
        image_small: uploadedImages.image_small || null,
        image_medium: uploadedImages.image_medium || null,
        image_large: uploadedImages.image_large || null,
    };
  }

  await prisma.$transaction([
    // Delete existing relations
    prisma.product_package_sizes.deleteMany({ where: { product_id: id } }),
    prisma.product_flavour_options.deleteMany({ where: { product_id: id } }),
    // Update product and create new relations
    prisma.products.update({
      where: { id },
      data: {
        item_name,
        description,
        info,
        base_price,
        product_type,
        image_large: images.image_large,
        image_medium: images.image_medium,
        image_small: images.image_small,
        product_package_sizes: {
          create: package_sizes.map(pid => ({ package_id: pid }))
        },
        product_flavour_options: {
          create: flavor_options.map(fid => ({ flavor_id: fid }))
        }
      },
    })
  ]);

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath(`/product/${id}`);
  redirect("/admin/menu");
}

export async function deleteProduct(id: bigint) {
  // Soft delete
  await prisma.products.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function restoreProduct(id: bigint) {
  await prisma.products.update({
    where: { id },
    data: {
      deleted_at: null,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function permanentlyDeleteProduct(id: bigint) {
    const product = await prisma.products.findUnique({
        where: { id },
        select: { image_small: true, image_medium: true, image_large: true }
    });

    if (product) {
        await deleteOldImages([product.image_small, product.image_medium, product.image_large]);
    }

    await prisma.$transaction([
        prisma.product_package_sizes.deleteMany({ where: { product_id: id } }),
        prisma.product_flavour_options.deleteMany({ where: { product_id: id } }),
        prisma.products.delete({ where: { id } })
    ]);

    revalidatePath("/admin/menu");
    revalidatePath("/menu");
}

export async function addPromotion(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const priority = parseInt(formData.get("priority") as string) || 0;
  const display_type = formData.get("display_type") as promo_display_type;
  
  const startDateStr = formData.get("start_date") as string;
  const endDateStr = formData.get("end_date") as string;
  const start_date = startDateStr ? new Date(startDateStr) : null;
  const end_date = endDateStr ? new Date(endDateStr) : null;

  const imageFile = formData.get("image") as File;
  let image_url = null;

  if (imageFile && imageFile.size > 0) {
    image_url = await uploadPromotionImage(imageFile, title);
  }

  await prisma.promotions.create({
    data: {
      title,
      description,
      link,
      priority,
      display_type,
      start_date,
      end_date,
      image_url,
      is_active: true,
    },
  });

  revalidatePath("/admin/promotions");
  revalidatePath("/");
  redirect("/admin/promotions");
}

export async function updatePromotion(id: bigint, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const link = formData.get("link") as string;
  const priority = parseInt(formData.get("priority") as string) || 0;
  const display_type = formData.get("display_type") as promo_display_type;
  
  const startDateStr = formData.get("start_date") as string;
  const endDateStr = formData.get("end_date") as string;
  const start_date = startDateStr ? new Date(startDateStr) : null;
  const end_date = endDateStr ? new Date(endDateStr) : null;
  
  const imageFile = formData.get("image") as File;
  const existingImage = formData.get("existing_image") as string | null;
  let image_url = existingImage;

  if (imageFile && imageFile.size > 0) {
    image_url = await uploadPromotionImage(imageFile, title);
    if (existingImage) {
        await deleteOldImages([existingImage]);
    }
  }

  await prisma.promotions.update({
    where: { id },
    data: {
      title,
      description,
      link,
      priority,
      display_type,
      start_date,
      end_date,
      image_url,
    },
  });

  revalidatePath("/admin/promotions");
  revalidatePath("/");
  redirect("/admin/promotions");
}

export async function softDeletePromotion(id: bigint) {
  await prisma.promotions.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });

  revalidatePath("/admin/promotions");
  revalidatePath("/");
}

export async function restorePromotion(id: bigint) {
  await prisma.promotions.update({
    where: { id },
    data: {
      deleted_at: null,
    },
  });

  revalidatePath("/admin/promotions");
  revalidatePath("/");
}

export async function permanentlyDeletePromotion(id: bigint) {
  const promo = await prisma.promotions.findUnique({
    where: { id },
    select: { image_url: true }
  });

  if (promo?.image_url) {
    await deleteOldImages([promo.image_url]);
  }

  await prisma.promotions.delete({
    where: { id },
  });

  revalidatePath("/admin/promotions");
  revalidatePath("/");
}

export async function togglePromotionStatus(id: bigint, currentStatus: boolean) {
  await prisma.promotions.update({
    where: { id },
    data: { is_active: !currentStatus },
  });
  revalidatePath("/admin/promotions");
  revalidatePath("/");
}
