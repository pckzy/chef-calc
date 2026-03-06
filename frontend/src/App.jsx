import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InventoryPage from "./pages/InventoryPage";
import RecipePage from "./pages/RecipePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/recipes" element={<RecipePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
