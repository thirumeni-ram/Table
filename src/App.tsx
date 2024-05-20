// import React, { useEffect, useState } from 'react';
// import UserTable from './components/UserTable';
// import { CircularPagination } from './components/Pagination';
// import Status from './components/Status';
// // import { library } from '@fortawesome/fontawesome-svg-core';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// // library.add(faEdit, faTrash);

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// const App: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('https://excelerate-profile-dev.s3.ap-south-1.amazonaws.com/1681980949109_users.json');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data: User[] = await response.json();
//         setUsers(data);
//         setLoading(false);
//       } catch (error) {
//         setError((error as Error).message);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleEdit = (updatedUser: User) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//     );
//   };

//   const handleDelete = (id: string) => {
//     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
//   };

//   const handleDeleteSelected = () => {
//     const filteredUsers = users.filter(user => !selectedRows.includes(user.id));
//     setUsers(filteredUsers);
//     setSelectedRows([]);
//   };

 

//   const totalPages = Math.ceil(users.length / itemsPerPage);
//   const currentUsers = users.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="App p-4">
//       <h1 className="text-3xl font-bold underline mb-4">Table</h1>
//       <Status loading={loading} error={error} />
//       {!loading && !error && (
//         <>
//           <UserTable
//             users={currentUsers}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//           <div className="flex items-center gap-4 mt-4 ml-[8.5rem]">
//             <button
//               onClick={handleDeleteSelected}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Delete Selected
//             </button>
//             <CircularPagination 
//               currentPage={currentPage} 
//               totalPages={totalPages} 
//               onPageChange={handlePageChange} 
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import { CircularPagination } from './components/Pagination';
import Status from './components/Status';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
 const [selectedRows, setSelectedRows] = useState<string[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://excelerate-profile-dev.s3.ap-south-1.amazonaws.com/1681980949109_users.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
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
    const filteredUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(filteredUsers);
    setSelectedRows([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="App p-4">
      {/* <h1 className="text-3xl font-bold underline mb-4">User Management Table</h1> */}
      <div className="search-bar mb-4 ml-[8.7rem] flex w-full">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-[69.4rem] "
        />
      </div>
      <Status loading={loading} error={error} />
      {!loading && !error && (
        <>
          <UserTable
            users={currentUsers}
            onEdit={(updatedUser: User) => {
              setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
              );
            }}
            onDelete={(id: string) => {
              setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            }}
          />
                     <div className="flex items-center gap-4 mt-4 ml-[8.5rem]">
             <button
              onClick={handleDeleteSelected}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Selected
            </button>
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

