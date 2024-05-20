import React, { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import Status from './components/Status';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faTrash);

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

  const handleEdit = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDelete = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="App p-4">
      <h1 className="text-3xl font-bold underline mb-4">Table</h1>
      <Status loading={loading} error={error} />
      {!loading && !error && (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
