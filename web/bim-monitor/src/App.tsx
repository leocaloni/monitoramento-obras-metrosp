import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import BimPage from "./pages/BimPage";
import UploadFotosPage from "./pages/UploadFotosPage";
import AnalysisDetailPage from "./pages/AnalysisDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/historico" element={<HistoryPage />} />
        <Route path="/analises/:id" element={<AnalysisDetailPage />} />
        <Route path="/bim" element={<BimPage />} />
        <Route path="/upload-fotos" element={<UploadFotosPage />} />
      </Routes>
    </BrowserRouter>
  );
}
