import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import AppRoutes from "@constants/AppRoutes";
import DashboardLayout from "@components/DashboardLayout/DashboardLayout";
import { useAccount } from "wagmi";
import useIsWrongChain from "@services/hooks/useIsWrongChain";

const LoginPage = lazy(() => import("@pages/LoginPage"));
const DashboardDeployPage = lazy(() => import("@pages/DashboardDeployPage"));
const DashboardCollectionsPage = lazy(
  () => import("@pages/DashboardCollectionsPage"),
);
const DashboardCollectionDetailsPage = lazy(
  () => import("@pages/DashboardCollectionDetailsPage"),
);

const App = () => {
  const { status } = useAccount();
  const isWrongChain = useIsWrongChain();

  if (status === "disconnected" || isWrongChain) {
    return (
      <Routes>
        <Route path={AppRoutes.login} element={<LoginPage />} />
        <Route path={"*"} element={<Navigate to={AppRoutes.login} />} />
      </Routes>
    );
  }

  return (
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
        <Route
          path={`${AppRoutes.collection}/:collectionAddress`}
          element={<DashboardCollectionDetailsPage />}
        />
      </Route>
      <Route path={"*"} element={<Navigate to={AppRoutes.collections} />} />
    </Routes>
  );
};

export default App;
