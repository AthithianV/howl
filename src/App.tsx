import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/Auth/SignUp';
import LogIn from './pages/Auth/LogIn';
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';
import CreateProfile from './pages/Profile/CreateProfile';
import ProfileLayout from './components/Layout/ProfileLayout';
import Howl from './pages/Home/Howl';

function App() {

  const Home = lazy(() => import('./pages/Home/Home'));
  const Chat = lazy(() => import('./pages/Chat/Chat'));
  const Groups = lazy(() => import('./pages/Group/Groups'));
  const Profile = lazy(() => import('./pages/Profile/Profile'));
  const NoMatch = lazy(() => import('./components/NoMatch'));



  return (
    <div className='h-screen w-screen flex'>
      <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
              <Route path="/auth" element={<AuthLayout/>}>
                  <Route path={"signup"} element={<SignUp />} />
                  <Route path="login" element={<LogIn />} />
              </Route>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="howl" element={<Howl />} />
                <Route path="chat" element={<Chat />} />
                <Route path="groups" element={<Groups />} />
                <Route path="/profile" element={<ProfileLayout/>}>
                  <Route index element={<Profile/>}/>
                  <Route path="create-profile" element={<CreateProfile />} />
                </Route>
              </Route>
              <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
    </div>
  )
}

export default App;
