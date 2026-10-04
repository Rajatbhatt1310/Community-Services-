import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import './styles/global.css';

const Learn = lazy(() => import('./pages/Learn.jsx'));
const Module = lazy(() => import('./pages/Module.jsx'));
const Quizzes = lazy(() => import('./pages/Quizzes.jsx'));
const Quiz = lazy(() => import('./pages/Quiz.jsx'));
const Tips = lazy(() => import('./pages/Tips.jsx'));
const EthicalHacking = lazy(() => import('./pages/EthicalHacking.jsx'));
const Report = lazy(() => import('./pages/Report.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const Admin = lazy(() => import('./pages/admin/Admin.jsx'));
const Lab = lazy(() => import('./pages/Lab.jsx'));
const Certificate = lazy(() => import('./pages/Certificate.jsx'));
const Progress = lazy(() => import('./pages/Progress.jsx'));
const Glossary = lazy(() => import('./pages/Glossary.jsx'));
const Checkup = lazy(() => import('./pages/Checkup.jsx'));
const Teachers = lazy(() => import('./pages/Teachers.jsx'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/learn', element: <Learn /> },
      { path: '/learn/:id', element: <Module /> },
      { path: '/quizzes', element: <Quizzes /> },
      { path: '/quizzes/:id', element: <Quiz /> },
      { path: '/lab', element: <Lab /> },
      { path: '/certificate', element: <Certificate /> },
      { path: '/progress', element: <Progress /> },
      { path: '/glossary', element: <Glossary /> },
      { path: '/check-up', element: <Checkup /> },
      { path: '/teachers', element: <Teachers /> },
      { path: '/safety-tips', element: <Tips /> },
      { path: '/ethical-hacking', element: <EthicalHacking /> },
      { path: '/report', element: <Report /> },
      { path: '/about', element: <About /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
      { path: '/admin/*', element: <Admin /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
