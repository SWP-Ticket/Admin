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
import { EventsData } from "@/constants";
import { CreateEventForm } from "@/pages/EventOperator/Events/CreateEventForm";
import EditEventForm from "@/pages/EventOperator/Events/EditEventForm";

const ITEMS_PER_PAGE = 7;

function EventTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState(EventsData);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const handleCreate = (newEvent) => {
    setEvents((prevEvent) => [...prevEvent, newEvent]);
  };
  const handleDelete = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };
  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleSaveEdit = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setEditingEvent(null);
  };
  return (
    <div>
      <div className="flex justify-between  items-center px-3 py-5">
        <h1 className="text-2xl  font-semibold">Events</h1>
        <CreateEventForm onCreate={handleCreate} />
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
                onEdit={() => {
                  handleEdit(item);
                }}
                onDelete={() => handleDelete(item.id)}
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
        {editingEvent && (
          <EditEventForm
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
}

export default EventTable;
