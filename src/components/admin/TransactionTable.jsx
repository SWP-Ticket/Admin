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
import TransactionHeaderRow from "./TransactionHeaderRow";
import TransactionTableRow from "./TransactionTableRow";
import { useSearchParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { useAppStore } from "@/stores/app.store";

const ITEMS_PER_PAGE = 7;
const fetchTransaction = (page, pageSize) =>
  fetch(
    `${
      import.meta.env.VITE_API_KEY
    }/api/Transaction?page=${page}&pageSize=${pageSize}`
  );
function TransactionTable() {
  const refetch = useAppStore((state) => state.refetch);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  const [responseEvent] = useFetch(
    fetchTransaction,
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
        <h1 className="text-2xl  font-semibold">Transactions</h1>
      </div>
      <div className="flex flex-col h-[73vh] justify-between">
        <Table>
          <TableHeader>
            <TransactionHeaderRow />
          </TableHeader>
          <TableBody>
            {responseEvent?.data?.listData.map((item) => (
              <TransactionTableRow key={item.id} item={item} />
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

export default TransactionTable;
