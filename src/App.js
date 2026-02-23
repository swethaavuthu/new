import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import BoardsPage from "./pages/BoardsPage";
import BoardPage from "./pages/BoardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import { BoardProvider } from "./context/BoardContext";

export default function App() {
  return (
    <AuthProvider>
      <BoardProvider>

        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Login />} />

            <Route
              path="/boards"
              element={
                <ProtectedRoute>
                  <BoardsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/board/:id"
              element={
                <ProtectedRoute>
                  <BoardPage />
                </ProtectedRoute>
              }
            />

          </Routes>
        </BrowserRouter>

      </BoardProvider>
    </AuthProvider>
  );
}