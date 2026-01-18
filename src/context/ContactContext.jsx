import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const ContactContext = createContext();

const initialState = {
  contacts: [],
  loading: true,
  error: null,
};

function contactReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, contacts: action.payload, loading: false };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload),
      };
    default:
      return state;
  }
}

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const API_URL = "https://ic-assignment-5-server.onrender.com/contacts";

  const fetchContacts = async () => {
    const res = await axios.get(API_URL);
    dispatch({ type: "FETCH_SUCCESS", payload: res.data });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (contact) => {
    const res = await axios.post(API_URL, contact);
    dispatch({ type: "ADD_CONTACT", payload: res.data });
  };

  const updateContact = async (id, updatedData) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedData);
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });
  };

  const deleteContact = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  return (
    <ContactContext.Provider
      value={{ state, addContact, updateContact, deleteContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
