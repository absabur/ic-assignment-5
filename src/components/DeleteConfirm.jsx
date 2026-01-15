import React from "react";

const DeleteConfirm = ({ open, contact, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-custom">
        <div className="modal-header d-flex justify-content-between">
          <h5 className="modal-title">Confirm Delete</h5>
          <button className="btn-close" onClick={onClose} />
        </div>
        <div className="modal-body">
          <p>
            Are you sure you want to delete <strong>{contact?.firstName} {contact?.lastName}</strong>?
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              onConfirm && onConfirm(contact?.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <style>{`
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:1050}
        .modal-custom{background:#fff;border-radius:6px;max-width:440px;width:100%;box-shadow:0 2px 10px rgba(0,0,0,.2)}
        .modal-header{padding:12px 16px;border-bottom:1px solid #eee}
        .modal-body{padding:16px}
        .modal-footer{padding:12px 16px;border-top:1px solid #eee;display:flex;gap:8px;justify-content:flex-end}
        .btn-close{background:transparent;border:0;font-size:20px}
      `}</style>
    </div>
  );
};

export default DeleteConfirm;
