import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <h1>Spice Planet</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
