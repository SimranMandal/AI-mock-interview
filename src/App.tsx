import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "@/routes/HomePage";
import About from "@/routes/About";

import { PublicLayout } from "@/layouts/public-layout";
import AuthenticationLayout from "@/layouts/auth-layout";
import ProtectedRoutes from "@/layouts/protected-routes";
import { MainLayout } from "./layouts/main-layout";

import { SignInPage } from "./routes/Sign-in";
import { SignUpPage } from "./routes/Sign-up";
import { Generate } from "./components/Generate";
import { Dashboard } from "./routes/Dashboard";
import { CreateEditPage } from "./routes/CreateEditPage";
import { MockLoadPage } from "./routes/MockLoadPage";
import { MockInterviewPage } from "./routes/MockInterviewPage";
import { Feedback } from "./routes/Feedback";
import Services from "./routes/Services";
import { Contact } from "./routes/Contact";

// import { NavigationRoutes } from "./components/navigation-container";

const App = () => {
  return (
    <Router>
      <Routes>
        {/*public routes*/}
        <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about/*" element={<About />} />
        <Route path="/services/*" element={<Services />} />
        <Route path="/contact/*" element={<Contact />} />

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
          <Route element={<Generate/>} path="generate">
            <Route index element={<Dashboard/>}/>
            <Route path=":interviewId" element={<CreateEditPage/>}/>
            <Route path="interview/:interviewId" element={<MockLoadPage/>}/>
            <Route path="interview/:interviewId/start" element={<MockInterviewPage/>}/>
            <Route path="feedback/:interviewId" element={<Feedback/>}/>
          </Route>

        </Route>
        
      </Routes>
    </Router>
  )
}

export default App

