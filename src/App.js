import "./App.css";
import { AuthProvider } from "./contexts";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <AuthProvider>
          <ProtectedRoute>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </ProtectedRoute>
        </AuthProvider>
      </UserProvider>
    </>
  );
}

export default App;
