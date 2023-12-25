import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import AppRoutes from "@constants/AppRoutes";
import DashboardLayout from "@components/DashboardLayout/DashboardLayout";

const DashboardDeployPage = lazy(() => import("@pages/DashboardDeployPage"));
const DashboardCollectionsPage = lazy(
  () => import("@pages/DashboardCollectionsPage"),
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.dashboard} element={<DashboardLayout />}>
          <Route
            path={AppRoutes.deployCollection}
            element={<DashboardDeployPage />}
          />
          <Route
            path={AppRoutes.collections}
            element={<DashboardCollectionsPage />}
          />
        </Route>
        <Route
          path={"*"}
          element={<Navigate to={AppRoutes.deployCollection} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
