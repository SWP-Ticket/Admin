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
import { useSearchParams } from "react-router-dom";
import { useAppStore } from "@/stores/app.store";

const ITEMS_PER_PAGE = 7;

const fetchUser = (page, pageSize) =>
  fetch(
    `${import.meta.env.VITE_API_KEY}/api/User?page=${page}&pageSize=${pageSize}`
  );

function UserTable() {
  const refetch = useAppStore((state) => state.refetch);
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const [editingUser, setEditingUser] = useState(null);

  const [responseUser] = useFetch(
    fetchUser,
    searchParams.get("page"),
    ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page === 0) return;

    if (page > 0 && page <= responseUser.data.totalPage) {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: ITEMS_PER_PAGE.toString(),
      });

      setSearchParams(queryParams.toString());
    }
  };

  const handleCreate = async (newUser) => {
    try {
      await fetch(`${import.meta.env.VITE_API_KEY}/api/User`, {
        method: "POST", // HTTP method
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
    } catch (err) {
      console.log(err);
    }
    // setUsers((prevUsers) => [...prevUsers, newUser]);
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY}/api/User/${id}/status`,
        {
          method: "PATCH",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Inactive",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update user status");
      }

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
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = async (updatedUser) => {
    // setUsers((prevUsers) =>
    //   prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    // );
    try {
      const res = await fetch(`${import.meta.env.VITE_API_KEY}/api/User`, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        throw new Error("Failed to update user status");
      }

      const data = await res.json();
      console.log(data);
      refetch();
    } catch (err) {
      console.log(err);
    }
    setEditingUser(null);
  };

  return (
    <div>
      <div className="flex justify-between  items-center px-3 py-5">
        <h1 className="text-2xl  font-semibold">User Management</h1>
        <CreateUserForm onCreate={handleCreate} />
      </div>
      <div className="flex flex-col h-[73vh] justify-between">
        <Table>
          <TableHeader>
            <UserHeaderRow />
          </TableHeader>
          <TableBody>
            {responseUser?.data?.listData.map((item) => (
              <UserTableRow
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
                onClick={() => handlePageChange(responseUser?.data?.page - 1)}
              />
            </PaginationItem>
            {[...Array(responseUser?.data?.totalPage)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === responseUser?.data?.page}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(responseUser?.data?.page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        {editingUser && (
          <EditUserForm
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
}

export default UserTable;
