import { lazy, Suspense } from 'react';
import Sidebar from './components/sidebar'
import { Route, Routes } from 'react-router-dom';

function App() {

  const Home = lazy(() => import('./pages/Home'));
  const Chat = lazy(() => import('./pages/Chat'));
  const Groups = lazy(() => import('./pages/Groups'));
  const Profile = lazy(() => import('./pages/Profile'));
  const NoMatch = lazy(() => import('./components/NoMatch'));

  return (
    <div className='h-screen w-screen flex'>
      <Sidebar />
      <div className='flex-1 bg-sky-50'>
        <Suspense fallback={<div className="container">Loading...</div>}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/chat" element={<Chat />} />
               <Route path="/groups" element={<Groups />} />
               <Route path="/profile/:id" element={<Profile />} />
               <Route path="*" element={<NoMatch />} />
            </Routes>
         </Suspense>
      </div>
    </div>
  )
}

export default App;
