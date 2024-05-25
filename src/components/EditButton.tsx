import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface EditButtonProps {
  onEdit: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit }) => {
  return (
    <button onClick={onEdit}>
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
};

export default EditButton;
