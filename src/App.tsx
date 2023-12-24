import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "@constants/AppRoutes";
import MainPage from "@pages/MainPage";
import NotFoundPage from "@pages/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.main} element={<MainPage />} />
        <Route path={"*"} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
