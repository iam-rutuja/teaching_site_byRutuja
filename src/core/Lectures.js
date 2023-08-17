import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout, isAuth } from "../auth/helper";

const Lectures = ({ history }) => {

  const [values, setValues] = useState([])
  const [instructorId, setInstructorId] = useState()

  const token = getCookie('token');

  useEffect(() => {
    getAll();
  }, [instructorId])

  useEffect(() => {
    userInfo();
  }, [])

  const userInfo = () => {
    axios({
      method: 'GET',
      url: `http://localhost:3004/api/user`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      const { instructorId } = response.data.user;
      setInstructorId(instructorId)
    }).catch((error) => {
      if (error.response.status === 401) {
        signout(() => {
          history.push('/')
        })
      }
      toast.error(error.response.data.error);
    })
  }

  const getAll = () => {
    console.log(instructorId)
    axios({
      method: 'GET',
      url: `http://localhost:3004/api/instructor-lecture/${instructorId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data)
      setValues(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const instructorLectureTable = () => {
    return (
      <div>
        <h1>List of Lectures</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Last</th>
            </tr>
          </thead>
          <tbody>
            {
              values &&
              values.map((data, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{data.date}</td>
                  <td>{data.courseId.name}</td>
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
        {instructorLectureTable()}
      </div>
    </Layout>
  )
}

export default Lectures;