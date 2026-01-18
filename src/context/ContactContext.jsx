import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const ContactContext = createContext();

const initialState = {
  contacts: [],
  loading: true,
  error: null,
  operationLoading: false,
};

function contactReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, contacts: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "OPERATION_START":
      return { ...state, operationLoading: true, error: null };
    case "OPERATION_END":
      return { ...state, operationLoading: false };
    case "ADD_CONTACT":
      return { 
        ...state, 
        contacts: [...state.contacts, action.payload],
        operationLoading: false,
        error: null 
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
        operationLoading: false,
        error: null,
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload),
        operationLoading: false,
        error: null,
      };
    case "ERROR":
      return { ...state, error: action.payload, operationLoading: false };
    default:
      return state;
  }
}

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const API_URL = "https://ic-assignment-5-server.onrender.com/contacts";

  const fetchContacts = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await axios.get(API_URL);
      dispatch({ type: "FETCH_SUCCESS", payload: res.data });
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to fetch contacts";
      dispatch({ type: "FETCH_ERROR", payload: errorMsg });
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (contact) => {
    dispatch({ type: "OPERATION_START" });
    try {
      const res = await axios.post(API_URL, contact);
      dispatch({ type: "ADD_CONTACT", payload: res.data });
      return { success: true, data: res.data };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to add contact";
      dispatch({ type: "ERROR", payload: errorMsg });
      return { success: false, error: errorMsg };
    }
  };

  const updateContact = async (id, updatedData) => {
    dispatch({ type: "OPERATION_START" });
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData);
      dispatch({ type: "UPDATE_CONTACT", payload: res.data });
      return { success: true, data: res.data };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to update contact";
      dispatch({ type: "ERROR", payload: errorMsg });
      return { success: false, error: errorMsg };
    }
  };

  const deleteContact = async (id) => {
    dispatch({ type: "OPERATION_START" });
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
      return { success: true };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to delete contact";
      dispatch({ type: "ERROR", payload: errorMsg });
      return { success: false, error: errorMsg };
    }
  };

  return (
    <ContactContext.Provider
      value={{ state, addContact, updateContact, deleteContact, fetchContacts }}
    >
      {children}
    </ContactContext.Provider>
  );
};
