import { TableHead, TableRow } from "@/components/ui/table";
function EventHeaderRow() {
  return (
    <TableRow className="grid md:grid-cols-6 grid-cols-6 py-4">
      <TableHead className="text-black h-full ">Title</TableHead>
      <TableHead className="text-black h-full ">Date</TableHead>
      <TableHead className="text-black h-full ">Description</TableHead>
      <TableHead className="text-black h-full ">Operator</TableHead>
      <TableHead className="text-black hidden md:block text-left h-full ">
        Status
      </TableHead>
      <TableHead className="text-black h-full ">Actions</TableHead>
    </TableRow>
  );
}
export default EventHeaderRow;
