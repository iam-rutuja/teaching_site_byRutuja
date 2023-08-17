import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helper";

const Instructors = ({ history }) => {

  const [values, setValues] = useState([])

  const token = getCookie('token');

  useEffect(() => {
    getAllInstructors();
  }, [])

  const getAllInstructors = () => {
    axios({
      method: 'GET',
      url: `http://localhost:3004/api/instructors`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setValues(response.data.instructors)
      toast.success(response.data.message);
    }).catch((error) => {
      toast.error(error.response.data.error);
    })
  }

  const instructorPageTable = () => {
    return (
      <div>
        <h1>All Instructors</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {
              values && 
              values.map((data, i) => (
                <tr>
                  <th scope="row">{i+1}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <Layout>
      <div className='mt-3 col-md-6 offset-md-3'>
        <ToastContainer />
        {instructorPageTable()}
      </div>
    </Layout>
  )
}

export default Instructors;