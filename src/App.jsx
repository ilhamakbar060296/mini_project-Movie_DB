import Axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css';

function App() {  
  const [data, setData] = useState([]);
  // const [id, setId] = useState('');
  // const [title, setTitle] = useState('');
  // const [image, setImage] = useState('');
  // const [popularity, setPopularity] = useState('');
  // const [overview, setOverview] = useState('');
  
  const getData = () => {
    Axios.get(`${process.env.REACT_APP_BASEURL}/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`)
    .then(response => {
      console.log(response);
      setData(response.data.results)
      // setId(response.data.results[0].id)
      // setTitle(response.data.results[0].original_title)
      // setImage(`${process.env.REACT_APP_BASEIMGURL}`+response.data.results[0].backdrop_path)
      // setPopularity(response.data.results[0].popularity)
      // setOverview(response.data.results[0].overview)
      console.log(response.data.results[0].id)
    })
  } 
  
  const getURL = (path) => {
    const url =  `${process.env.REACT_APP_BASEIMGURL}`+path;
    return url;
  }

  useEffect(() => {
    getData()
  }, []);

  return (    
    <>
    <h1>FORM PRODUCT TABLE</h1>      
    <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Title</th>
            <th>Image</th>
            <th>Popularity</th>
            <th>Overview</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.original_title}</td>
              <td>
                <img src={getURL(item.backdrop_path)} alt={item.original_title}></img>  
              </td>
              <td>{item.popularity}</td>
              <td>{item.overview}</td>
            </tr>
          })}
        </tbody>
      </Table>
    </>
  );
}

export default App;
