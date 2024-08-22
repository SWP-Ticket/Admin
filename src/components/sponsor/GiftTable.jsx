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
import GiftHeaderRow from "./GiftHeaderRow";
import GiftTableRow from "./GiftTableRow";
import useFetch from "@/hooks/useFetch";
import { useAuthStore } from "@/stores/auth.store";
import { CreateGiftForm } from "@/pages/Sponsor/Gifts/CreateGiftForm";
import { useAppStore } from "@/stores/app.store";
import EditGiftForm from "@/pages/Sponsor/Gifts/EditGiftForm";
import { useToast } from "../ui/use-toast";

const ITEMS_PER_PAGE = 7;
const fetchGifts = (sponsorId) =>
  fetch(`${import.meta.env.VITE_API_KEY}/api/Gift/Sponsor/${sponsorId}`);
function GiftTable() {
  const [editingGift, setEditingGift] = useState(null);
  const sponsorId = useAuthStore((state) => state.userId);
  const refetch = useAppStore((state) => state.refetch);
  const [responseGifts] = useFetch(fetchGifts, sponsorId);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    (responseGifts ? responseGifts?.data?.length : 0) / ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = responseGifts
    ? responseGifts?.data?.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : [];
  const handleEdit = (user) => {
    setEditingGift(user);
  };
  const handleCreate = async (newGift) => {
    console.log(newGift);
    try {
      await fetch(`${import.meta.env.VITE_API_KEY}/api/Gift`, {
        method: "POST", // HTTP method
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGift),
      });
      refetch();
    } catch (err) {
      console.log(err);
    }
    // setUsers((prevUsers) => [...prevUsers, newUser]);
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/Gift/${id}`,
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

      const data = await res.json();
      console.log(data);
      refetch();
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const handleSaveEdit = async (id, updatedGift) => {
    try {
      console.log(updatedGift);
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/Gift/${id}`,
        {
          method: "PUT",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedGift),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const data = await res.json();
      console.log(data);
      refetch();
    } catch (err) {
      toast({
        title: "Error!",
        description: err.message,
      });
      console.log(err);
    }
    setEditingGift(null);
  };
  return (
    <div>
      <div className="flex justify-between  items-center px-3 py-5">
        <h1 className="text-2xl  font-semibold">Gifts</h1>
        <CreateGiftForm onCreate={handleCreate} />
      </div>
      <div className="flex flex-col h-[73vh] justify-between">
        <Table>
          <TableHeader>
            <GiftHeaderRow />
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <GiftTableRow
                key={item.id}
                item={item}
                onEdit={(value) => {
                  handleEdit(value);
                }}
                onDelete={(value) => handleDelete(value.id)}
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
        {editingGift && (
          <EditGiftForm
            gift={editingGift}
            onClose={() => setEditingGift(null)}
            onSave={(value) => handleSaveEdit(editingGift.id, value)}
          />
        )}
      </div>
    </div>
  );
}

export default GiftTable;
