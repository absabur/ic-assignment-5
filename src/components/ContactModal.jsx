import React, { useState, useContext } from "react";

const Modal = ({
  open,
  onClose,
  contact,
  mode = "show",
  onUpdate,
  setEditContact,
  setShowContact,
}) => {
  const [form, setForm] = useState(contact || {});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setForm(contact || {});
  }, [contact]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (onUpdate) {
        const result = await onUpdate(contact.id, form);
        if (result?.success === false) {
          setLoading(false);
          return;
        }
      }
      onClose();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-custom">
        <div className="modal-header d-flex justify-content-between">
          <h5 className="modal-title">
            {mode === "show" ? "Contact Details" : "Edit Contact"}
          </h5>
          {mode === "show" && (
            <button
              onClick={() => {
                setEditContact(contact);
                setShowContact(null);
              }}
              className="btn btn-sm btn-circle btn-outline-secondary mr-2"
              title="Edit"
              style={{ marginRight: "3px" }}
            >
              <i className="fa fa-edit"></i>
            </button>
          )}
        </div>
        <div className="modal-body">
          {mode === "show" ? (
            <div>
              <p>
                <strong>First Name: </strong> {contact?.firstName}
              </p>
              <p>
                <strong>Last Name: </strong> {contact?.lastName}
              </p>
              <p>
                <strong>Email: </strong> {contact?.email}
              </p>
              <p>
                <strong>Phone: </strong> {contact?.phone}
              </p>
              <p>
                <strong>Address: </strong> {contact?.address}
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  className="form-control"
                  name="firstName"
                  value={form.firstName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  className="form-control"
                  name="lastName"
                  value={form.lastName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={form.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={form.phone || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  value={form.address || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          {mode === "show" ? (
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          ) : (
            <>
              <button 
                className="btn btn-secondary" 
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:1050}
        .modal-custom{background:#fff;border-radius:6px;max-width:640px;width:100%;box-shadow:0 2px 10px rgba(0,0,0,.2)}
        .modal-header{padding:12px 16px;border-bottom:1px solid #eee}
        .modal-body{padding:16px}
        .modal-footer{padding:12px 16px;border-top:1px solid #eee;display:flex;gap:8px;justify-content:flex-end}
        .btn-close{background:transparent;border:0;font-size:20px}
      `}</style>
    </div>
  );
};

export default Modal;
