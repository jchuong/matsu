'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

const itemSchema = z.object({
    name: z.string().min(1).max(256),
    lastCompletedAt: z.date().optional()
});
interface AddEditItemProps {
    id?: number;
}
export default function AddEditItem({ id }: AddEditItemProps) {
    const [open, setOpen] = useState(false);
    const formId = useId();
    const form = useForm<z.infer<typeof itemSchema>>({
        resolver: zodResolver(itemSchema),
    });

    const onSubmit = (values: z.infer<typeof itemSchema>) => {
        console.log(values);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    {id ? 'Edit Item' : 'Add new item'}
                </DialogTitle>
                <DialogDescription>
                    Use this to add or modify an item
                </DialogDescription>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} id={formId} className='space-y-4'>
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" form={formId} >Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
}   
