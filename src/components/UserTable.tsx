import React, { useState } from 'react';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import UserEditForm from './UserEditForm';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onEdit: (updatedUser: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleSave = (updatedUser: User) => {
    onEdit(updatedUser);
    setUserToEdit(null);
  };

  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/4 py-2">ID</th>
          <th className="w-1/4 py-2">Name</th>
          <th className="w-1/4 py-2">Email</th>
          <th className="w-1/4 py-2">Role</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="text-center">
            <td className="border px-4 py-2">{user.id}</td>
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.role}</td>
            <td className="border px-4 py-2 flex justify-center">
              <EditButton onEdit={() => setUserToEdit(user)} />
              <DeleteButton onDelete={() => onDelete(user.id)} />
            </td>
            {userToEdit?.id === user.id && (
              <tr className="w-full">
                <td colSpan={7}>
                  <UserEditForm
                    user={userToEdit}
                    isOpen={userToEdit !== null}
                    onClose={() => setUserToEdit(null)}
                    onSave={handleSave}
                  />
                </td>
              </tr>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
