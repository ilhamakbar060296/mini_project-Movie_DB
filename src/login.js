
  import Axios from 'axios';
  import './App.css';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  import { useNavigate } from "react-router-dom";
  
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
    <form onSubmit={formik.handleSubmit}>
      <label
        style={{ color: 'red', fontSize: 20 }}
        className='label-username'
        htmlFor="username"
      >
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div style={{ color: 'red' }}>{formik.errors.username}</div>
      ) : null}
      <br />
      <label htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <br />
      <button type="submit">Submit</button>
    </form >
  );
}

  export default Login;