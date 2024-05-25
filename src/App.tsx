import React, { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import { CircularPagination } from "./components/Pagination";
import Status from "./components/Status";
import SearchBar from "./components/SearchBar";
import DeleteSelectedButton from "./components/DeleteSelectedButton";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://excelerate-profile-dev.s3.ap-south-1.amazonaws.com/1681980949109_users.json"
        );
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const data: User[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteSelected = () => {
    const newUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(newUsers);
    setSelectedRows([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="App p-4">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <Status loading={loading} error={error} />
      {!loading && !error && (
        <>
          <UserTable
            users={currentUsers}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            setUsers={setUsers}
          />
          <div className="flex items-center gap-4 mt-4">
            <DeleteSelectedButton onDeleteSelected={handleDeleteSelected} />
            <CircularPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
