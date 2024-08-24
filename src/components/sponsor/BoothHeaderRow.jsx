import { TableHead, TableRow } from "@/components/ui/table";
function BoothHeaderRow() {
  return (
    <TableRow className="grid md:grid-cols-5 grid-cols-5 py-4">
      <TableHead className="text-black h-full ">Name</TableHead>
      <TableHead className="text-black h-full ">Request Date</TableHead>
      <TableHead className="text-black h-full ">Sponsor</TableHead>
      <TableHead className="text-black h-full ">Status</TableHead>

      <TableHead className="text-black h-full ">Actions</TableHead>
    </TableRow>
  );
}
export default BoothHeaderRow;
