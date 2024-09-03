import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
