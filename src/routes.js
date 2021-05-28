import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import NotFound from 'src/pages/NotFound';
import AddJob from "./pages/AddJob";
import LogReg from "./pages/LogReg";

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'add', element: <AddJob /> },
      { path: '*', element: <Navigate to="/404" /> }

    ]
  },
  {
    path: '/',
    children: [
      { path: '404', element: <NotFound /> },
      { path: '', element: <LogReg /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
