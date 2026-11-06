import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Subjects from "./pages/Subjects";
import Questions from "./pages/Questions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/questions/:id" element={<Questions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
