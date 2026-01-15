import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddContact from "./components/AddContact";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/add" Component={AddContact} />
    </Routes>
  );
}

export default App;
