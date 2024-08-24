import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateToDDMMYYYYHHMMSS } from "@/utils/day";
import { Button } from "../ui/button";
function BoothTableRow({ item, onDelete }) {
  return (
    <TableRow
      className="items-center grid md:grid-cols-5  grid-cols-5  font-medium rounded-md  bg-[#FAFAFA]  mt-3  border-none py-2"
      key={item?.id}
    >
      <TableCell className="py-2">{item?.boothName}</TableCell>
      <TableCell className="py-2">
        {formatDateToDDMMYYYYHHMMSS(new Date(item?.requestDate))}
      </TableCell>

      <TableCell className="py-2">
        <span>{item?.sponsorName}</span>
      </TableCell>
      <TableCell className="py-2 text-left">{item?.status}</TableCell>

      <TableCell className="py-2">
        <Button
          onClick={() => {
            onDelete(item);
          }}
          className="text-red-600 hover:text-red-700"
          variant="ghost"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default BoothTableRow;
