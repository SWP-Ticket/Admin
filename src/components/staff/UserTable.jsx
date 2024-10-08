import { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import UserHeaderRow from "./UserHeaderRow";
import UserTableRow from "./UserTableRow";
import EditUserForm from "@/pages/Admin/UserManagement/EditUserForm";
import { CreateUserForm } from "@/pages/Admin/UserManagement/CreateUserForm";
import useFetch from "@/hooks/useFetch";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppStore } from "@/stores/app.store";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

const ITEMS_PER_PAGE = 7;

const fetchUser = (eventId) =>
  fetch(
    `${import.meta.env.VITE_API_KEY}/api/Attendee/event/${eventId}/attendees`
  );

function UserTable() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const refetch = useAppStore((state) => state.refetch);

  const [responseUser] = useFetch(fetchUser, eventId);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    (responseUser ? responseUser?.data?.length : 0) / ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = responseUser
    ? responseUser?.data?.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : [];

  const handleCheckin = async (item) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/Attendee/${item.id}/checkin`,
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify("CheckedIn"),
        }
      );

      if (!res.ok) {
        console.log("chạy here 1");
        const err = await res.json();
        console.log(err);
        console.log("chạy here 2");
        throw new Error(err.message);
      }
      refetch();
    } catch (err) {
      toast({
        title: "Error!",
        description: err.message,
      });
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex gap-5  items-center px-3 py-5">
        <Button
          onClick={() => navigate("/staff/events")}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Back
        </Button>
        <h1 className="text-2xl  font-semibold">List User</h1>
      </div>
      <div className="flex flex-col h-[73vh] justify-between">
        <Table>
          <TableHeader>
            <UserHeaderRow />
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <UserTableRow
                key={item.id}
                item={item}
                onCheckin={(data) => {
                  handleCheckin(data);
                }}
              />
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default UserTable;
