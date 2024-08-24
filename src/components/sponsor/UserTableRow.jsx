import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import GiftForm from "@/pages/Sponsor/Event/GiftForm";
function UserTableRow({ item, onGift }) {
  return (
    <TableRow
      className="items-center grid md:grid-cols-5 lg:grid-cols-5 grid-cols-3  font-medium rounded-md  bg-[#FAFAFA]  mt-3  border-none py-2"
      key={item?.id}
    >
      <TableCell className=" py-2">{item?.name}</TableCell>
      <TableCell className=" py-2">{item?.email}</TableCell>

      <TableCell className=" hidden lg:block py-2 text-left">
        {item?.phone}
      </TableCell>
      <TableCell className=" hidden md:block py-2 text-left">
        {item?.checkInStatus}
      </TableCell>
      <TableCell className="text-center py-2">
        <Button
          variant="secondary"
          onClick={() => {
            onGift(item);
          }}
        >
          Gift
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default UserTableRow;
