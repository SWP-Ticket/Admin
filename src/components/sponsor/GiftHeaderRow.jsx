import { TableHead, TableRow } from "@/components/ui/table";
function GiftHeaderRow() {
  return (
    <TableRow className="grid md:grid-cols-6 grid-cols-6 py-4">
      <TableHead className="text-black h-full ">Name</TableHead>
      <TableHead className="text-black h-full ">Description</TableHead>
      <TableHead className="text-black h-full ">Event</TableHead>
      <TableHead className="text-black h-full ">Booth</TableHead>
      <TableHead className="text-black h-full ">Quantity</TableHead>
      <TableHead className="text-black h-full text-center">Actions</TableHead>
    </TableRow>
  );
}
export default GiftHeaderRow;
