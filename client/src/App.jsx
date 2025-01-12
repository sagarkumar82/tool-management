import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import MechanicPage from "./pages/MechanicPage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import GetIssuedTool from './components/GetIssuedTool';
import ToolCategoryPage from './pages/ToolCategoryPage';
import IssuedTools from './components/IssuedTools';
import AllUser from './components/AllUser';
import PrivateRoute from './components/PrivateRoute';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const rec = useContext(AuthContext)
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute/>}>
          <Route path="/" element={rec?.auth?.user?.role==='admin' ? <AdminPage /> : rec?.auth?.user?.role==='mechanic' ? <MechanicPage /> : <Home/> } />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/mechanic" element={<MechanicPage />} />
          
          <Route path="/get-issued-tool" element={<GetIssuedTool />} />
          <Route path="/create-category" element={<ToolCategoryPage />} />
          <Route path="/issued-tools" element={<IssuedTools />} />
          <Route path="/all-user" element={<AllUser />} />
          </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
      </Routes>
      

      </Router>
      </>
  );
};

export default App;
