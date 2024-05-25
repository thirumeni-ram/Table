import React, { useState } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import UserEditForm from "./UserEditForm";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TableRowProps {
  user: User;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  user,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);


  const handleSave = (updatedUser: User) => {
    onEdit(updatedUser);
    setUserToEdit(null); // Close form on save
  };

  const handleEditClick = () => {
    setUserToEdit(user);
  };

  return (
    <>
      <tr className="text-center">
        <td className="border px-4 py-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(user.id)}
          />
        </td>
        <td className="border px-4 py-2">{user.id}</td>
        <td className="border px-8 py-2 text-left">{user.name}</td>
        <td className="border px-10 py-2 text-left">{user.email}</td>
        <td className="border px-16 py-2 text-left">{user.role}</td>
        <td className="border px-4 py-2 flex justify-center gap-4">
          <EditButton onEdit={handleEditClick} />
          <DeleteButton onDelete={() => onDelete(user.id)} />
        </td>
      </tr>
      {userToEdit && userToEdit.id === user.id && (
        <tr className="w-full">
          <td colSpan={6}>
            <UserEditForm
              user={userToEdit}
              isOpen={userToEdit !== null}
              onClose={() => setUserToEdit(null)}
              onSave={handleSave}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default TableRow;
