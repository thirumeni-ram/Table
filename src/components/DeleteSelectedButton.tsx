import React from "react";

interface DeleteSelectedButtonProps {
  onDeleteSelected: () => void;
}

const DeleteSelectedButton: React.FC<DeleteSelectedButtonProps> = ({
  onDeleteSelected,
}) => {
  return (
    <button
      onClick={onDeleteSelected}
      className="bg-red-500 text-white px-4 py-2 rounded ml-[8.5rem]"
    >
      Delete Selected
    </button>
  );
};

export default DeleteSelectedButton;
