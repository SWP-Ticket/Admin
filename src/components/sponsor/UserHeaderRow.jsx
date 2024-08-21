import { TableHead, TableRow } from "@/components/ui/table";
function UserHeaderRow() {
  return (
    <TableRow className="grid md:grid-cols-5 lg:grid-cols-5 grid-cols-3  py-4">
      <TableHead className="text-black　text-left h-full basis-3/12">
        Name
      </TableHead>
      <TableHead className="text-black　text-left h-full basis-2/12">
        Email
      </TableHead>

      <TableHead className="hidden lg:block text-black text-left h-full basis-3/12">
        Phone
      </TableHead>
      <TableHead className="hidden md:block text-black text-left h-full basis-3/12">
        Status
      </TableHead>
      <TableHead className="text-black h-full text-center basis-1/12">
        Actions
      </TableHead>
    </TableRow>
  );
}
export default UserHeaderRow;
