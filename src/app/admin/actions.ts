"use server";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { category } from "@prisma/client";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function uploadImage(file: File) {
  const supabase = await createClient();
  
  // Create a unique file name
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `product-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from("products")
    .upload(filePath, file);

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("products")
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function addProduct(formData: FormData) {
  const item_name = formData.get("item_name") as string;
  const description = formData.get("description") as string;
  const info = formData.get("info") as string;
  const base_price = BigInt(formData.get("base_price") as string);
  const product_type = formData.get("product_type") as category;
  
  const imageFile = formData.get("image") as File;
  let imageUrl = "";

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile);
  }

  await prisma.products.create({
    data: {
      item_name,
      description,
      info,
      base_price,
      product_type,
      image_large: imageUrl || null,
      image_medium: imageUrl || null,
      image_small: imageUrl || null,
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
  
  const imageFile = formData.get("image") as File;
  let imageUrl = formData.get("existing_image") as string;

  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImage(imageFile);
  }

  await prisma.products.update({
    where: { id },
    data: {
      item_name,
      description,
      info,
      base_price,
      product_type,
      image_large: imageUrl || null,
      image_medium: imageUrl || null,
      image_small: imageUrl || null,
    },
  });

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
