// import React, { useState } from 'react';
// import EditButton from './EditButton';
// import DeleteButton from './DeleteButton';
// import UserEditForm from './UserEditForm';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface UserTableProps {
//   users: User[];
//   onEdit: (updatedUser: User) => void;
//   onDelete: (id: string) => void;
// }

// const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
//   const [userToEdit, setUserToEdit] = useState<User | null>(null);
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);

//   const handleSave = (updatedUser: User) => {
//     onEdit(updatedUser);
//     setUserToEdit(null);
//   };

//   const handleSelectAll = () => {
//     if (areAllRowsSelected()) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(users.map(user => user.id));
//     }
//   };

//   const areAllRowsSelected = () => {
//     return users.every(user => selectedRows.includes(user.id));
//   };

//   const handleSelectRow = (id: string) => {
//     if (selectedRows.includes(id)) {
//       setSelectedRows(selectedRows.filter(rowId => rowId !== id));
//     } else {
//       setSelectedRows([...selectedRows, id]);
//     }
//   };

//   return (
//     <table className="min-w-full bg-white">
//       <thead className="bg-gray-800 text-white">
//         <tr>
//           <th className="w-1/12 py-2">
//             <input
//               type="checkbox"
//               onChange={handleSelectAll}
//               checked={areAllRowsSelected()}
//             />
//           </th>
//           <th className="w-1/6 py-2">ID</th>
//           <th className="w-1/6 py-2">Name</th>
//           <th className="w-1/6 py-2">Email</th>
//           <th className="w-1/6 py-2">Role</th>
//           <th className="w-1/6 py-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <React.Fragment key={user.id}>
//             <tr className="text-center">
//               <td className="border px-4 py-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedRows.includes(user.id)}
//                   onChange={() => handleSelectRow(user.id)}
//                 />
//               </td>
//               <td className="border px-4 py-2">{user.id}</td>
//               <td className="border px-4 py-2">{user.name}</td>
//               <td className="border px-4 py-2">{user.email}</td>
//               <td className="border px-4 py-2">{user.role}</td>
//               <td className="border px-4 py-2 flex justify-center">
//                 <EditButton onEdit={() => setUserToEdit(user)} />
//                 <DeleteButton onDelete={() => onDelete(user.id)} />
//               </td>
//             </tr>
//             {userToEdit?.id === user.id && (
//               <tr className="w-full">
//                 <td colSpan={7}>
//                   <UserEditForm
//                     user={userToEdit}
//                     isOpen={userToEdit !== null}
//                     onClose={() => setUserToEdit(null)}
//                     onSave={handleSave}
//                   />
//                 </td>
//               </tr>
//             )}
//           </React.Fragment>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default UserTable;

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
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSave = (updatedUser: User) => {
    onEdit(updatedUser);
    setUserToEdit(null);
  };

  

  const handleSelectAll = () => {
    if (areAllRowsSelected()) {
      setSelectedRows([]);
    } else {
      setSelectedRows(users.map(user => user.id));
    }
  };

  const areAllRowsSelected = () => {
    return users.every(user => selectedRows.includes(user.id));
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }

    console.log(selectedRows)
  };

  return (
    <div className="w-4/5 mx-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/12 py-2">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={areAllRowsSelected()}
              />
            </th>
            <th className="w-1/6 py-2">ID</th>
            <th className="w-1/6 py-2">Name</th>
            <th className="w-1/6 py-2">Email</th>
            <th className="w-1/6 py-2">Role</th>
            <th className="w-1/6 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <tr className="text-center">
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => handleSelectRow(user.id)}
                  />
                </td>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2 flex justify-center gap-4">
                  <EditButton onEdit={() => setUserToEdit(user)} />
                  <DeleteButton onDelete={() => onDelete(user.id)} />
                </td>
              </tr>
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
