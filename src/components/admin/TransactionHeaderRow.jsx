import { TableHead, TableRow } from "@/components/ui/table";
function TransactionHeaderRow() {
  return (
    <TableRow className="grid md:grid-cols-6 grid-cols-6 py-4">
      <TableHead className="text-black h-full ">Attendee</TableHead>
      <TableHead className="text-black h-full ">Checkin Code</TableHead>
      <TableHead className="text-black h-full ">Date</TableHead>
      <TableHead className="text-black h-full ">Amount</TableHead>
      <TableHead className="text-black h-full ">Method</TableHead>
      <TableHead className="text-black text-left h-full">Status</TableHead>
    </TableRow>
  );
}
export default TransactionHeaderRow;
