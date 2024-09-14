"use server";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export async function completeToday(id: number) {
  await api.item.completeItemToday({ id });
  console.log("id updated", id);
  revalidatePath("/items");
}

export async function create(input: { name: string, lastCompletedAt?: Date }) {
  await api.item.create(input);
  revalidatePath("/items");
}