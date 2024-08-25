import { redirect } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

function getDiffInDays(pastDate: Date) {
    const now = new Date();
    const diff = now.getTime() - pastDate.getTime();
    const differenceInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${differenceInDays} days`;
}

export default async function Items() {
    const session = await getServerAuthSession();
    if (!session) {
        redirect('/api/auth/signin');
    }
    const items = await api.item.getItemsByUser();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Last Completed</TableHead>
                <TableHead>Days Since</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map(item =>
                    <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>{item.lastCompletedAt?.toLocaleDateString() ?? '-'}</TableCell>
                    <TableCell>{item.lastCompletedAt ? getDiffInDays(item.lastCompletedAt) : '-'}</TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </main>
    );
}