import { TableHead, TableRow } from "@/components/ui/table";
function EventHeaderRow() {
  return (
    <TableRow className="grid md:grid-cols-4  grid-cols-3  py-4">
      <TableHead className="text-black　text-left h-full basis-3/12">
        Title
      </TableHead>
      <TableHead className="text-black　text-left h-full basis-2/12">
        Date
      </TableHead>
      <TableHead className="hidden md:block text-black　text-left h-full basis-3/12">
        Description
      </TableHead>

      <TableHead className="text-black h-full text-center basis-1/12">
        Actions
      </TableHead>
    </TableRow>
  );
}
export default EventHeaderRow;
