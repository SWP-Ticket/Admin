import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
function EventTableRow({ item, onEdit, onDelete }) {
  return (
    <TableRow
      className="items-center grid md:grid-cols-4  grid-cols-3  font-medium rounded-md  bg-[#FAFAFA]  mt-3  border-none py-2"
      key={item?.id}
    >
      <TableCell className=" py-2">{item?.title}</TableCell>
      <TableCell className=" py-2">
        {item?.startDate} - {item?.endDate}
      </TableCell>
      <TableCell className="hidden md:block py-2">
        <span>{item?.description}</span>
      </TableCell>

      <TableCell className=" flex justify-center items-center gap-3 py-2  ">
        <Button
          onClick={() => {
            onDelete(item?.id);
          }}
          className="text-red-600 hover:text-red-700"
          variant="ghost"
        >
          Delete
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onEdit();
          }}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default EventTableRow;
