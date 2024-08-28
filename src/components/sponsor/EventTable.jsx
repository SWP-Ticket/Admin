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
import { useNavigate } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { useToast } from "../ui/use-toast";

const ITEMS_PER_PAGE = 10000;
const fetchEvent = (pageSize) =>
  fetch(
    `${import.meta.env.VITE_API_KEY}/api/Event?page=1&pageSize=${pageSize}`
  );
function EventTable() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [responseEvent] = useFetch(fetchEvent, ITEMS_PER_PAGE);
  const listEvents = responseEvent
    ? responseEvent?.data?.listData.filter(
        (f) => f.status === "Active" || f.status === "Ongoing"
      )
    : [];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    (listEvents ? listEvents?.length : 0) / ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = listEvents
    ? listEvents?.slice(startIndex, startIndex + ITEMS_PER_PAGE)
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
            {currentData?.map((item) => (
              <EventTableRow
                key={item.id}
                item={item}
                onView={(data) => {
                  if (data.status === "Ongoing") {
                    navigate(`/sponsor/events/${item.id}`);
                  } else {
                    toast({
                      title: "Error!",
                      description: "Event not onging!!!",
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
