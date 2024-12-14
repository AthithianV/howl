import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignUp from './pages/Auth/SignUp';
import LogIn from './pages/Auth/LogIn';
import MainLayout from './components/Layout/MainLayout';
import AuthLayout from './components/Layout/AuthLayout';
import CreateProfile from './pages/Profile/CreateProfile';
import Howl from './pages/Home/Howl';
import ChatBox from './pages/Chat/ChatBox';
import UserProfile from './pages/Profile/UserProfile';


function App() {

  const Home = lazy(() => import('./pages/Home/Home'));
  const Chat = lazy(() => import('./pages/Chat/Chat'));
  const Groups = lazy(() => import('./pages/Group/Groups'));
  const Profile = lazy(() => import('./pages/Profile/Profile'));
  const NoMatch = lazy(() => import('./components/NoMatch'));

  return (
    <div className='h-screen w-screen flex'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Suspense fallback={<div className="container h-screen w-screen flex-center"><ThreeDots color='#38bdf8'/></div>}>
          <Routes>
              <Route path="/auth" element={<AuthLayout/>}>
                  <Route path={"signup"} element={<SignUp />} />
                  <Route path="login" element={<LogIn />} />
              </Route>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="howl" element={<Howl />} />
                <Route path="chat" element={<Chat />}>
                  <Route path=":userId" element={<ChatBox/>}/>
                </Route>
                <Route path="groups" element={<Groups />} />
                <Route path="/profile" element={<Profile/>}>
                  <Route path="create-profile" element={<CreateProfile />} />
                  <Route path=":uid" element={<UserProfile />} />
                </Route>
              </Route>
              <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
    </div>
  )
}

export default App;
