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
import VenueTableRow from "./VenueTableRow";
import VenueHeaderRow from "./VenueHeaderRow";
import { useSearchParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { useAppStore } from "@/stores/app.store";
import { useToast } from "../ui/use-toast";
import { CreateVenueForm } from "@/pages/Admin/Venues/CreateVenueForm";
import EditVenueForm from "@/pages/Admin/Venues/EditVenueForm";

const ITEMS_PER_PAGE = 7;
const fetchEvent = (page, pageSize) =>
  fetch(
    `${
      import.meta.env.VITE_API_KEY
    }/api/Venue?page=${page}&pageSize=${pageSize}`
  );
function VenueTable() {
  const { toast } = useToast();
  const [editingVenue, setEditingVenue] = useState(null);
  const refetch = useAppStore((state) => state.refetch);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  const [responseEvent] = useFetch(
    fetchEvent,
    searchParams.get("page"),
    ITEMS_PER_PAGE
  );
  const handlePageChange = (page) => {
    if (page === 0) return;

    if (page > 0 && page <= responseEvent.data.totalPage) {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: ITEMS_PER_PAGE.toString(),
      });

      setSearchParams(queryParams.toString());
    }
  };

  const handleCreate = async (newVenue) => {
    try {
      await fetch(`${import.meta.env.VITE_API_KEY}/api/Venue`, {
        method: "POST", // HTTP method
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVenue),
      });
      toast({
        title: "Success!",
        description: "Create Success",
      });
      refetch();
    } catch (err) {
      toast({
        title: "Error!",
        description: "Create Error",
      });
      console.log(err);
    }
    // setUsers((prevUsers) => [...prevUsers, newUser]);
  };
  const handleDelete = async (item) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/Venue/${item.id}`,
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

      toast({
        title: "Success!",
        description: "Delete Success",
      });
      refetch();
    } catch (err) {
      toast({
        title: "Error!",
        description: "Delete Error",
      });
      console.log("Error:", err);
    }
  };
  const handleEdit = (venue) => {
    setEditingVenue(venue);
  };
  const handleSaveEdit = async (id, updatedGift) => {
    try {
      console.log(updatedGift);
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/Venue/${id}`,
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

      toast({
        title: "Success!",
        description: "Update Success",
      });
      refetch();
    } catch (err) {
      toast({
        title: "Error!",
        description: err.message,
      });
      console.log(err);
    }
    setEditingVenue(null);
  };
  return (
    <div>
      <div className="flex justify-between  items-center px-3 py-5">
        <h1 className="text-2xl  font-semibold">Venues</h1>
        <CreateVenueForm onCreate={handleCreate} />
      </div>
      <div className="flex flex-col h-[73vh] justify-between">
        <Table>
          <TableHeader>
            <VenueHeaderRow />
          </TableHeader>
          <TableBody>
            {responseEvent?.data?.listData.map((item) => (
              <VenueTableRow
                key={item.id}
                item={item}
                onEdit={(value) => {
                  handleEdit(value);
                }}
                onDelete={(data) => handleDelete(data)}
              />
            ))}
          </TableBody>
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(responseEvent?.data?.page - 1)}
              />
            </PaginationItem>
            {[...Array(responseEvent?.data?.totalPage)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === responseEvent?.data?.page}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(responseEvent?.data?.page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {editingVenue && (
          <EditVenueForm
            venue={editingVenue}
            onClose={() => setEditingVenue(null)}
            onSave={(value) => handleSaveEdit(value.id, value)}
          />
        )}
      </div>
    </div>
  );
}

export default VenueTable;
