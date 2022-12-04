import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import './index.css';
import App from './App';
import Login from './login';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <> 
    {localStorage.getItem('username') ? localStorage.getItem('username') : ''}
    <Outlet />
    </>,        
    errorElement: <p>Page Not Found</p>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <>
        {localStorage.getItem('session') ? <App /> : 'forbidden'}
        </>        
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
