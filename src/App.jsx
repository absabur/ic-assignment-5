import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/add" Component={AddContact} />
      </Routes>
    </ContactProvider>
  );
}

export default App;
