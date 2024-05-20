import React from 'react';

interface StatusProps {
  loading: boolean;
  error: string | null;
}

const Status: React.FC<StatusProps> = ({ loading, error }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

export default Status;
