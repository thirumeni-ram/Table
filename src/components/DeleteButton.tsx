import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <button onClick={onDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteButton;
