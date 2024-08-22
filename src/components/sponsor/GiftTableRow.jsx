import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateToDDMMYYYYHHMMSS } from "@/utils/day";
import { Button } from "../ui/button";
function GiftTableRow({ item, onDelete, onEdit }) {
  return (
    <TableRow
      className="items-center grid md:grid-cols-6  grid-cols-6  font-medium rounded-md  bg-[#FAFAFA]  mt-3  border-none py-2"
      key={item?.id}
    >
      <TableCell className=" py-2">{item?.name}</TableCell>

      <TableCell className=" py-2">
        <span>{item?.description}</span>
      </TableCell>
      <TableCell className=" py-2">
        <span>{item?.eventName}</span>
      </TableCell>
      <TableCell className=" py-2">
        <span>{item?.boothName}</span>
      </TableCell>
      <TableCell className=" hidden md:block py-2 text-left">
        {item?.quantity}
      </TableCell>
      <TableCell className="text-center flex gap-3 py-2  ">
        <Button
          onClick={() => {
            onDelete(item);
          }}
          className="text-red-600 hover:text-red-700"
          variant="ghost"
        >
          Delete
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onEdit(item);
          }}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default GiftTableRow;
