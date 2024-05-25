import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  selectedRows,
  setSelectedRows,
  setUsers,
}) => {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleEdit = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setUserToEdit(null);
  };

  const handleDelete = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  return (
    <div className="w-4/5 mx-auto">
      <table className="min-w-full bg-white">
        <TableHeader
          users={users}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
        <tbody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              isSelected={selectedRows.includes(user.id)}
              onSelect={handleSelectRow}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

{
  /* <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/12 py-2">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.length === users.length}
              />
            </th>
            <th className="w-1/6 py-2">ID</th>
            <th className="w-1/6 py-2 pr-4">Name</th>
            <th className="w-1/6 py-2">Email</th>
            <th className="w-1/6 py-2">Role</th>
            <th className="w-1/6 py-2">Actions</th>
          </tr>
        </thead> */
  // const handleSelectAll = () => {
  //   setSelectedRows(
  //     selectedRows.length === users.length ? [] : users.map((user) => user.id)
  //   );
  // };
  // <React.Fragment key={user.id}>
  //   <tr className="text-center">
  //     <td className="border px-4 py-2">
  //       <input
  //         type="checkbox"
  //         checked={selectedRows.includes(user.id)}
  //         onChange={() => handleSelectRow(user.id)}
  //       />
  //     </td>
  //     <td className="border px-4 py-2 ">{user.id}</td>
  //     <td className="border px-8 py-2 text-left">{user.name}</td>
  //     <td className="border px-10 py-2 text-left">{user.email}</td>
  //     <td className="border px-16 py-2 text-left ">{user.role}</td>
  //     <td className="border px-4 py-2 flex justify-center gap-4">
  //       <EditButton onEdit={() => setUserToEdit(user)} />
  //       <DeleteButton onDelete={() => handleDelete(user.id)} />
  //     </td>
  //   </tr>
  //   {userToEdit?.id === user.id && (
  //     <tr className="w-full">
  //       <td colSpan={6}>
  //         <UserEditForm
  //           user={userToEdit}
  //           isOpen={userToEdit !== null}
  //           onClose={() => setUserToEdit(null)}
  //           onSave={handleEdit}
  //         />
  //       </td>
  //     </tr>
  //   )}
  // </React.Fragment>
}
