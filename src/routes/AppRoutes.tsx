import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginScreen from "../pages/LoginScreen"; 
import Dashboard from "../pages/Dashboard";
import GameAdminView from "../pages/GameAdminView";
import UserProfile from "../pages/UserProfile";
import ParticipantView from "../pages/ParticipantView";
import CreateGameScreen from "../pages/CreateGameScreen";
import TeamDrawScreen from "../pages/TeamDrawScreen";

export const AppRoutes = () => {

  const navigate = useNavigate();

  const handleSelectGame = (game: any) => {
    const route = game.role === 'admin' ? '/GameAdminView' : '/ParticipantView';
    
    navigate(route, { state: { game } });
  };

  const handleCreateGame = () => {
    navigate("/CreateGame");
  };

  /*const handleLoginSuccess = () => {
    navigate("/dashboard");
  };*/

  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginScreen />} />

        <Route path="/dashboard" element={<Dashboard onSelectGame={handleSelectGame} 
              onCreateGame={handleCreateGame} />} />

        <Route path="/gameadminview" element={<GameAdminView />} />

        <Route path="/userprofile" element={<UserProfile />} />

        <Route path="/teamdraw" element={<TeamDrawScreen />} />

        <Route path="/creategame" element={<CreateGameScreen onCancel={() => navigate(-1)} />} />

        <Route path="/participantview" element={<ParticipantView />} />
      </Routes>
  );
};