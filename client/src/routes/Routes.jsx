import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import { lazy  , Suspense} from "react";
import PageNotFound from '../pages/PageNotFound';
import AppLayout from '../components/AppLayout';
import AboutPage from '../pages/AboutPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import ProtectedRoute from '../components/ProtectedRoute';
// import Chat from '../pages/Chat';
import DevelopersInfo from '../pages/DeveloperInfo';
import ContactPage from '../pages/ContactPage';
// import ProfilePage from '../pages/ProfilePage';
import AddResumeData from '../pages/AddResumeData';
// import Resume from '../components/Resume1';
import Resume from '../components/Resume';
import Resume1Page from '../pages/Resume1Page';
import Resume2Page from '../pages/Resume2Page';
const HomePage = lazy(() => import("../pages/HomePage")) ;
function Routes() {
    const routes = createBrowserRouter(
        [
          {
            path : "/",
            element : <AppLayout/>,
            children : [
              {
                path : "",
                element : <HomePage/>
              },
              {
                path : "about",
                element : <AboutPage/>
              },
              {
                path : "resume",
                element : (
                <ProtectedRoute>
                  <Resume/>
                </ProtectedRoute>
                )
              },
              {
                path : "contact",
                element : <ContactPage/>
              },
              {
                path : "profile",
                element : (
                  <ProtectedRoute>
                    <AddResumeData/>
                  </ProtectedRoute>
                )
              },
              {
                path : "signIn",
                element : <SignInPage/>
              },
              {
                path : "signUp",
                element : <SignUpPage/>
              },
              {
                path : "developerInfo",
                element : <DevelopersInfo/>
              },
              {
                path : "resume1",
                element : <Resume1Page/>
              },
              {
                path : "resume2",
                element : <Resume2Page/>
              },

            ]
          },
          {
            path : "*",
            element : <PageNotFound/>,
          }
        ]
      )
    return (
        <Suspense>
            <RouterProvider router={routes}/>
        </Suspense>
    )
}

export default Routes
