"use server";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function addProduct(formData: FormData) {
  const item_name = formData.get("item_name") as string;
  const description = formData.get("description") as string;
  const base_price = BigInt(formData.get("base_price") as string);
  const product_type = formData.get("product_type") as any; // Cast to category enum

  await prisma.products.create({
    data: {
      item_name,
      description,
      base_price,
      product_type,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function updateProduct(id: bigint, formData: FormData) {
  const item_name = formData.get("item_name") as string;
  const description = formData.get("description") as string;
  const base_price = BigInt(formData.get("base_price") as string);
  const product_type = formData.get("product_type") as any;

  await prisma.products.update({
    where: { id },
    data: {
      item_name,
      description,
      base_price,
      product_type,
    },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  revalidatePath(`/product/${id}`);
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
