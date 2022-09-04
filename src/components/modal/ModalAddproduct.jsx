import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalAddproduct({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} className="modal-add">
      <Modal.Body className="text-success">
        <div style={{ fontSize: "20px", fontWeight: "900" }}>Add Product</div>
        <div style={{ fontSize: "16px", fontWeight: "500" }} className="mt-2">
          Success Add Product
        </div>
      </Modal.Body>
    </Modal>
  );
}
