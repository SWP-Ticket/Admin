import { TableCell, TableRow } from "@/components/ui/table";
import { formatDateToDDMMYYYYHHMMSS } from "@/utils/day";
import { Button } from "../ui/button";
function TransactionTableRow({ item }) {
  console.log(item);
  return (
    <TableRow
      className="items-center grid md:grid-cols-6  grid-cols-6  font-medium rounded-md  bg-[#FAFAFA]  mt-3  border-none py-2"
      key={item?.id}
    >
      <TableCell className=" py-2">
        {item?.attendee?.attendeeDetails[0]?.name}
      </TableCell>
      <TableCell className=" py-2">
        <span>{item?.attendee?.checkInCode}</span>
      </TableCell>
      <TableCell className=" py-2">
        {formatDateToDDMMYYYYHHMMSS(new Date(item?.date))}
      </TableCell>
      <TableCell className=" py-2">
        <span>{item?.amount}</span>
      </TableCell>
      <TableCell className=" py-2 text-left">
        {item?.paymentMethod?.name}
      </TableCell>
      <TableCell className=" py-2 text-left">{item?.status}</TableCell>
    </TableRow>
  );
}

export default TransactionTableRow;
