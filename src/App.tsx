import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';

function App() {

  const Home = lazy(() => import('./pages/Home'));
  const Chat = lazy(() => import('./pages/Chat'));
  const Groups = lazy(() => import('./pages/Groups'));
  const Profile = lazy(() => import('./pages/Profile'));
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
                <Route path="chat" element={<Chat />} />
                <Route path="groups" element={<Groups />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
    </div>
  )
}

export default App;
