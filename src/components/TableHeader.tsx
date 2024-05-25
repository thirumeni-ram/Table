import React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TableHeaderProps {
  users: User[];
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  users,
  selectedRows,
  setSelectedRows,
}) => {
 
  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === users.length ? [] : users.map((user) => user.id)
    );
  };

  const allSelected =
    users.length > 0 && users.every((user) => selectedRows.includes(user.id));

  return (
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="w-1/12 py-2">
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={allSelected}
          />
        </th>
        <th className="w-1/6 py-2">ID</th>
        <th className="w-1/6 py-2">Name</th>
        <th className="w-1/6 py-2">Email</th>
        <th className="w-1/6 py-2">Role</th>
        <th className="w-1/6 py-2">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
