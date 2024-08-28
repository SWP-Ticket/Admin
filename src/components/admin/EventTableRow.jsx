import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateToDDMMYYYYHHMMSS } from "@/utils/day";
import { Button } from "../ui/button";
function EventTableRow({ item, onApprove, onCancel }) {
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
      <TableCell className="text-center gap-3 py-2  ">
        {item.status === "Ready" && (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                onApprove(item);
              }}
            >
              Approve
            </Button>
            <Button
              onClick={() => {
                onCancel(item);
              }}
              className="text-red-600 hover:text-red-700"
              variant="ghost"
            >
              Cancel
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}

export default EventTableRow;
