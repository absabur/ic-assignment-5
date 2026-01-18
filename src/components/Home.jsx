import React, { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import { Link } from "react-router-dom";
import ContactModal from "./ContactModal";
import DeleteConfirm from "./DeleteConfirm";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const { state, deleteContact, updateContact } = useContext(ContactContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Default");

  const [showContact, setShowContact] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // Search Logic
  const filteredContacts = state.contacts
    .filter(
      (c) =>
        c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    )
    .reverse();

  // Filter Logic (Corrected string sorting)
  let sortedContacts = [...filteredContacts];
  if (filterType === "1") {
    sortedContacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (filterType === "2") {
    sortedContacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
  } else if (filterType === "3") {
    // Oldest To First (Smallest ID at the top)
    sortedContacts = state.contacts;
  }

  const handleUpdate = async (id, updatedData) => {
    const result = await updateContact(id, updatedData);
    if (result.success) {
      setEditContact(null);
    } else {
      showError(result.error || "Failed to update contact");
    }
  };

  if (state.loading) {
    return <LoadingSpinner fullPage={true} />;
  }

  return (
    <main className="py-5">
      <div className="container">
        <div className="card">
          <div className="card-header card-title">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="mb-0">All Contacts</h2>
              <div className="input-group w-50">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Link to="/add" className="btn btn-success">
                <i className="fa fa-plus-circle"></i> Add New
              </Link>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between p-3">
            <div className="fs-2">
              <i className="fa fa-filter text-success"></i> Filter
            </div>
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Default">Default</option>
              <option value="1">First Name (A → Z)</option>
              <option value="2">Last Name (A → Z)</option>
              <option value="3">Oldest To First</option>
            </select>
          </div>

          <div className="card-body">
            {sortedContacts.length > 0 ? (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.firstName}</td>
                      <td>{contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td className="d-flex border-0">
                        <button
                          onClick={() => setShowContact(contact)}
                          className="btn btn-sm btn-circle btn-outline-info mr-2"
                          title="Show"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fa fa-eye"></i>
                        </button>
                        <button
                          onClick={() => setEditContact(contact)}
                          className="btn btn-sm btn-circle btn-outline-secondary mr-2"
                          title="Edit"
                          style={{ marginRight: "3px" }}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          onClick={() => setDeleteCandidate(contact)}
                          className="btn btn-sm btn-circle btn-outline-danger"
                          title="Delete"
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-5">
                <h3>No Contact Information</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Show Modal */}
      {showContact && (
        <ContactModal
          open={true}
          onClose={() => setShowContact(null)}
          contact={showContact}
          mode="show"
          setShowContact={setShowContact}
          setEditContact={setEditContact}
        />
      )}

      {/* Edit Modal */}
      {editContact && (
        <ContactModal
          open={true}
          onClose={() => setEditContact(null)}
          contact={editContact}
          mode="edit"
          onUpdate={handleUpdate}
          setEditContact={setEditContact}
          setShowContact={setShowContact}
        />
      )}

      {/* Delete Modal */}
      {deleteCandidate && (
        <DeleteConfirm
          open={true}
          contact={deleteCandidate}
          onClose={() => setDeleteCandidate(null)}
          onConfirm={async (id) => {
            await deleteContact(id);
            setDeleteCandidate(null);
          }}
        />
      )}
    </main>
  );
};

export default Home;
