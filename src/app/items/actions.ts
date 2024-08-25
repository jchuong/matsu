'use server'
import { revalidatePath } from 'next/cache';
import { api } from '~/trpc/server';

export async function completeToday(id: number) {
    await api.item.completeItemToday({ id });
    console.log('id updated', id);
    revalidatePath('/items');
}