import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Spacecrafts from '../pages/Spacecrafts/Spacecrafts';
import SpacecraftDetail from '../pages/SpacecraftDetail/SpacecraftDetail';
import ConstructSpacecraft from '../pages/ConstructSpacecraft/ConstructSpacecraft';
import Planets from '../pages/Planets/Planets';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path ="/" element={<Home />} />
            <Route path="/spacecrafts" element={<Spacecrafts />} />
            <Route path="/spacecrafts/:id" element={<SpacecraftDetail />} />
            <Route path="/spacecrafts/new" element={<ConstructSpacecraft />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}