import React, { useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import BoothHeaderRow from "./BoothHeaderRow";
import BoothTableRow from "./BoothTableRow";
import useFetch from "@/hooks/useFetch";
import { CreateBoothForm } from "@/pages/Sponsor/Booths/CreateBoothForm";
import { useAuthStore } from "@/stores/auth.store";
import { useAppStore } from "@/stores/app.store";
import { useToast } from "../ui/use-toast";

const ITEMS_PER_PAGE = 7;
const fetchBooth = (sponsorId) =>
  fetch(
    `${import.meta.env.VITE_API_KEY}/api/BoothRequest/sponsor/${sponsorId}`
  );
function BoothTable() {
  const { toast } = useToast();
  const sponsorId = useAuthStore((state) => state.userId);
  const refetch = useAppStore((state) => state.refetch);
  const [responseBooth] = useFetch(fetchBooth, sponsorId);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    (responseBooth ? responseBooth?.data?.length : 0) / ITEMS_PER_PAGE
  );
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = responseBooth
    ? responseBooth?.data?.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : [];
  const handleCreate = async (newBooth) => {
    console.log(newBooth);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_KEY}/api/Booth`, {
        method: "POST", // HTTP method
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBooth),
      });
      if (!res.ok) {
        // Handle non-200 responses
        const err = await res.json();
        console.log(err);
        throw new Error(err.message);
      }
      const jsonData = await res.json();
      console.log(jsonData);
      const newId = jsonData.data.id;
      await fetch(
        `https://ticketswp-cvb4bhguf9fmbte2.eastus-01.azurewebsites.net/api/BoothRequest/ChangeRequestStatus/${newId}`,
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Approved",
          }),
        }
      );

      await fetch(
        `https://ticketswp-cvb4bhguf9fmbte2.eastus-01.azurewebsites.net/api/Booth/ChangeBoothStatus/${newId}`,
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Opened",
          }),
        }
      );

      refetch();
    } catch (err) {
      toast({
        title: "Error!",
        description: err.message,
      });
      console.log(err);
    }
  };
  const handleDelete = async (item) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/BoothRequest/${item.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete");
      }
      await fetch(`${import.meta.env.VITE_API_KEY}/api/Booth/${item.id}`, {
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      refetch();
      // Cập nhật danh sách người dùng sau khi xóa
      // const updatedUsers = users.filter((user) => user.id !== id);
      // setUsers(updatedUsers);
    } catch (err) {
      console.log("Error:", err);
    }
  };
  return (
    <div>
      <div className="flex justify-between  items-center px-3 py-5">
        <h1 className="text-2xl  font-semibold">Booths</h1>
        <CreateBoothForm onCreate={handleCreate} />
      </div>
      <div className="flex flex-col h-[73vh] justify-between">
        <Table>
          <TableHeader>
            <BoothHeaderRow />
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <BoothTableRow
                key={item.id}
                item={item}
                onDelete={(booth) => handleDelete(booth)}
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

export default BoothTable;
