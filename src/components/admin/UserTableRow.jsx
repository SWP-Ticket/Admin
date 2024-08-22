import { TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
function UserTableRow({ item, onEdit, onChangeStatus }) {
  return (
    <TableRow
      className="items-center grid md:grid-cols-5 lg:grid-cols-6 grid-cols-3  font-medium rounded-md  bg-[#FAFAFA]  mt-3  border-none py-2"
      key={item?.id}
    >
      <TableCell className=" py-2">{item?.name}</TableCell>
      <TableCell className=" py-2">{item?.email}</TableCell>
      <TableCell className="hidden md:block py-2">
        <span>{item?.password}</span>
      </TableCell>
      <TableCell className=" hidden lg:block py-2 text-left">
        <Select
          value={item?.status}
          onValueChange={(value) => onChangeStatus(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className=" hidden md:block py-2 text-left">
        {item?.role}
      </TableCell>
      <TableCell className="text-center gap-3 py-2  ">
        {/* <Button
          onClick={() => {
            onDelete(item?.id);
          }}
          className="text-red-600 hover:text-red-700"
          variant="ghost"
        >
          Delete
        </Button> */}
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

export default UserTableRow;
