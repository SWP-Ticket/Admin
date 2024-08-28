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
import EventHeaderRow from "./EventHeaderRow";
import EventTableRow from "./EventTableRow";
import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { useAuthStore } from "@/stores/auth.store";
import { useToast } from "../ui/use-toast";

const ITEMS_PER_PAGE = 7;
const fetchEvent = (staffId) =>
  fetch(`${import.meta.env.VITE_API_KEY}/api/Event/${staffId}/events`);
function EventTable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const staffId = useAuthStore((state) => state.userId);
  const [responseEvent] = useFetch(fetchEvent, staffId);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    (responseEvent ? responseEvent?.data?.assignedEvents?.length : 0) /
      ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = responseEvent
    ? responseEvent?.data?.assignedEvents?.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
      )
    : [];
  return (
    <div>
      <div className="flex justify-between  items-center px-3 py-5">
        <h1 className="text-2xl  font-semibold">Events</h1>
      </div>
      <div className="flex flex-col h-[73vh] justify-between">
        <Table>
          <TableHeader>
            <EventHeaderRow />
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <EventTableRow
                key={item.id}
                item={item}
                onView={(item) => {
                  console.log(item);
                  if (item.status === "Ongoing") {
                    // navigate(`/staff/events/${item.id}`);
                  } else {
                    toast({
                      title: "Chưa mở!",
                      description: "Sự kiện chưa diễn ra",
                    });
                  }
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

export default EventTable;
