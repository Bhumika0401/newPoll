
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyPage from "./pages/SurveyPage";
import PollPage from "./pages/PollPage";
import ProtectRoutes from "./components/ProtectRoutes";
import PollListPage from "./pages/PollListPage";

import SurveyListPage from "./pages/SurveyListPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          }
        />

        <Route
          path="/create-poll"
          element={
            <ProtectRoutes>
              <CreatePoll />
            </ProtectRoutes>
          }
        />

        <Route
          path="/create-survey"
          element={
            <ProtectRoutes>
              <CreateSurvey />
            </ProtectRoutes>
          }
        />
       <Route path="/polls" element={<PollListPage />} />

        <Route
          path="/survey/:id"
          element={
            <ProtectRoutes>
              <SurveyPage />
            </ProtectRoutes>
          }
        />
<Route path="/surveys" element={<SurveyListPage />} />
        <Route
          path="/poll/:id"
          element={
            <ProtectRoutes>
              <PollPage />
            </ProtectRoutes>
          }
        />

        {/* OPTIONAL: fallback */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;