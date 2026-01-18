import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

const AddContact = () => {
  const { addContact } = useContext(ContactContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError("All fields except address are required.");
      return false;
    }
    // simple email regex
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await addContact(form);
      navigate("/")
    } catch (err) {
      const errorMsg = err.message || "Failed to add contact";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="card">
          <div className="card-header card-title">
            <strong>Add New Contact</strong>
          </div>

          <div className="card-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-md-3 col-form-label">First Name</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Last Name</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Email</label>
                <div className="col-md-9">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Phone</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-3 col-form-label">Address</label>
                <div className="col-md-9">
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="form-control"
                    rows={3}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-9 offset-md-3">
                  <button 
                    className="btn btn-primary me-2" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => navigate("/")}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddContact;
