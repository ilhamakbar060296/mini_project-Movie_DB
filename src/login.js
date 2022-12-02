
  import Axios from 'axios';
  import './App.css';
  import './login.css';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  import { useNavigate } from "react-router-dom";
  import Form from 'react-bootstrap/Form';
  import Button from 'react-bootstrap/Button';
  
  function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('Required'),
    }),
    onSubmit: values => {
      console.log(values)
      // Movie DB auth step 1
       Axios.get(`${process.env.REACT_APP_BASEURL}authentication/token/new?api_key=${process.env.REACT_APP_APIKEY}`)
         .then(response => {
           const requestToken = response.data.request_token
           console.log("Request Token : "+requestToken);
           Axios.post(`${process.env.REACT_APP_BASEURL}authentication/token/validate_with_login?api_key=${process.env.REACT_APP_APIKEY}`,
             {
               username: values.username, // priambudi.lintang
               password: values.password, // Fah63FaWT5e$4di
               request_token: requestToken
             }).then(res => {
               const validatedRequestToken = res.data.request_token
               console.log("Validated Token : "+validatedRequestToken);
               Axios.post(`${process.env.REACT_APP_BASEURL}authentication/session/new?api_key=${process.env.REACT_APP_APIKEY}`,
                 {
                   request_token: validatedRequestToken
                 }).then(res => {
                   const sessionID = res.data.session_id
                   console.log("Session ID : " + sessionID);
                   localStorage.setItem('session', sessionID)
                   navigate('/home');
                 })
             })
         })
    },
  });

  return (
    <>
      <div className='login-container'>
        <div>
          <img className='login-image' src='https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg' alt='theMovieDB'></img>
        </div>
        <div className='rectangle'>
          <div className='login-page'>
          <h1>Login Page</h1><br />
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              id="username"
              name="username" 
              type="text" 
              placeholder="Enter Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              />
            </Form.Group>
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: 'red' }}>{formik.errors.username}</div>
            ) : null}
            {/* <br /> */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              id="password"
              name="password"
              type="password" 
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              />
            </Form.Group>
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}                     
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </div>                  
        </div>      
      </div>      
    </>
  );
}

  export default Login;