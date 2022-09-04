import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalDelete({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };
  return (
    <Modal show={show} onHide={handleClose} className="modal-delete">
      <Modal.Body className="text-dark">
        <div style={{ fontSize: "20px", fontWeight: "900" }}>Delete Data</div>
        <div style={{ fontSize: "16px", fontWeight: "500" }} className="mt-2">
          Are you sure you want to delete this Data?
        </div>
        <div className="text-end mt-5">
          <button
            onClick={handleDelete}
            size="sm"
            className="btnModalYes me-2"
            style={{ width: "135px" }}
          >
            Yes
          </button>
          <button
            onClick={handleClose}
            size="sm"
            className="btnModalNo"
            style={{ width: "135px" }}
          >
            No
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
