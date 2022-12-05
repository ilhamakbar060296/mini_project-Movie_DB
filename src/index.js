import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import './index.css';
import App from './App';
import Login from './login';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const style1 = {color: 'white', padding: '10px'};

const logOut = () => {
  localStorage.clear();
  return window.location.assign('/');    
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <>    
    {localStorage.getItem('username') ? 
    // localStorage.getItem('username') 
    <Navbar bg="dark" variant="dark">
           <img id="logo" src="https://mdbootstrap.com/img/Marketing/general/logo/huge/mdb-react.png" alt="MDB" />
          <Nav className="me-auto">            
            <label style={style1}>Username : {localStorage.getItem('username')}</label>
          </Nav>
          <Nav>            
          <Button variant="danger" onClick={() => logOut()}>Logout</Button>
          </Nav>        
      </Navbar>
    : ''}
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
