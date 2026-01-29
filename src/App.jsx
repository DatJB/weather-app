import { Routes, Route } from "react-router-dom";
import Weather from "./Weather";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Weather />} />
    </Routes>
  );
}

export default App;