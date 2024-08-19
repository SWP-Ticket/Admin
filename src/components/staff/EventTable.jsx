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
import { useSearchParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

const ITEMS_PER_PAGE = 7;
const fetchEvent = (page, pageSize) =>
  fetch(
    `${
      import.meta.env.VITE_API_KEY
    }/api/Event?page=${page}&pageSize=${pageSize}`
  );
function EventTable() {
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
            {responseEvent?.data?.listData.map((item) => (
              <EventTableRow key={item.id} item={item} />
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
      </div>
    </div>
  );
}

export default EventTable;
