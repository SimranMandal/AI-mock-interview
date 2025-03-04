import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@/routes/HomePage";

import { PublicLayout } from "@/layouts/public-layout";
import AuthenticationLayout from "@/layouts/auth-layout";
import ProtectedRoutes from "@/layouts/protected-routes";
import { MainLayout } from "./layouts/main-layout";

import { SignInPage } from "./routes/Sign-in";
import { SignUpPage } from "./routes/Sign-up";
// import { NavigationRoutes } from "./components/navigation-container";

const App = () => {
  return (
    <Router>
      <Routes>
        {/*public routes*/}
        <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        </Route>

        {/*authentication layout*/}
        <Route element={<AuthenticationLayout />}>
        <Route path="/signin/*" element={<SignInPage />} />
        <Route path="/signup/*" element={<SignUpPage />} />
        </Route>

        {/*protected routes*/}
        <Route
        element={
          <ProtectedRoutes> 
           <MainLayout/>
          </ProtectedRoutes>
          }
        >
          {/* add all the protected routes */}
          {/* <NavigationRoutes/> */}
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App

