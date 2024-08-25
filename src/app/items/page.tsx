import { redirect } from "next/navigation";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { getServerAuthSession } from "~/server/auth";

export default async function Items() {
    const session = await getServerAuthSession();
    if (!session) {
        redirect('/api/auth/signin');
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </main>
    );
}