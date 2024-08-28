import { TableHead, TableRow } from "@/components/ui/table";
function VenueHeaderRow() {
  return (
    <TableRow className="grid md:grid-cols-4 grid-cols-4 py-4">
      <TableHead className="text-black h-full ">Name</TableHead>
      <TableHead className="text-black h-full ">Description</TableHead>
      <TableHead className="text-black hidden md:block text-left h-full ">
        Status
      </TableHead>
      <TableHead className="text-black h-full text-center">Actions</TableHead>
    </TableRow>
  );
}
export default VenueHeaderRow;
