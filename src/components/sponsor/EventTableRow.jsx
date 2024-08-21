import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateToDDMMYYYYHHMMSS } from "@/utils/day";
import { Button } from "../ui/button";
function EventTableRow({ item, onView }) {
  return (
    <TableRow
      className="items-center grid md:grid-cols-6  grid-cols-6  font-medium rounded-md  bg-[#FAFAFA]  mt-3  border-none py-2"
      key={item?.title}
    >
      <TableCell className=" py-2">{item?.title}</TableCell>
      <TableCell className=" py-2">
        {formatDateToDDMMYYYYHHMMSS(new Date(item?.startDate))} -{" "}
        {formatDateToDDMMYYYYHHMMSS(new Date(item?.endDate))}
      </TableCell>
      <TableCell className=" py-2">
        <span>{item?.description}</span>
      </TableCell>
      <TableCell className=" py-2">
        <span>{item?.organizerName}</span>
      </TableCell>
      <TableCell className=" hidden md:block py-2 text-left">
        {item?.status}
      </TableCell>
      <TableCell className="py-2">
        <Button
          variant="secondary"
          onClick={() => {
            onView();
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default EventTableRow;
