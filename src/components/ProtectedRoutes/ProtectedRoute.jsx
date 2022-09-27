import { Route, Routes } from "react-router-dom";
import Auth from "../../pages/Auth";
import {useAuthContext} from "../../contexts/AuthContext";
import Reg from "../../pages/Reg";
// import NotFound from "../../pages/NotFound/NotFound";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext();
  if (token) {
    return children;
  } else {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Reg />} />
        {/*<Route path="*" element={<NotFound />} />*/}
      </Routes>
    );
  }
};

export default ProtectedRoute;
