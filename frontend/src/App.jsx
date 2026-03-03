import { Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
import InventoryPage from './pages/InventoryPage';
import RecipePage from './pages/RecipePage';

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/recipes" element={<RecipePage />} />
    </Routes>
  );
}

export default App;
