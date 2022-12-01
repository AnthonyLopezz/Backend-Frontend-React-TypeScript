import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainBoard } from "../../containers/MainBoard";
import { LogIn } from "../../views/public/LogIn";
import { SignIn } from "../../views/public/SignIn";
import { DontFound } from "../../views/shared/DontFound";

const LazyLogin = lazy(() =>
  import("../../views/public/LogIn").then(() => ({ default: LogIn }))
);

const LazyLogup = lazy(() =>
  import("../../views/public/SignIn").then(() => ({ default: SignIn }))
);

const LazyDontFound = lazy(() =>
  import("../../views/shared/DontFound").then(() => ({ default: DontFound }))
);

const LazyBoard = lazy(() =>
  import("../../containers/MainBoard").then(() => ({ default: MainBoard }))
);



export const RuteoComplete = () => {
  return (
    //To manage all routes or the complete routes
    <Routes>
      <Route path="/" element={<LazyLogin />} />
      <Route path="/register" element={<LazyLogup />} />
      
      <Route path="/home/*" element={<LazyBoard />} />
      
      <Route path="/*" element={<LazyDontFound />} />
    </Routes>
  );
};
