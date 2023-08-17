import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helper";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AssignInstructor = ({ history }) => {

    const [instructors, setInstructors] = useState([])
    const [courses, setCourses] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [values, setValues] = useState({
        courseId: '',
        instructorId: ''
    })

    const { courseId, instructorId } = values

    const token = getCookie('token');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        getCourses()
        getInstructors()
    }, [])

    const getCourses = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3004/api/courses`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data.courses)
            setCourses(response.data.courses)
        }).catch(error => {
            toast.error(error.response.data.error);
        })
    }

    const getInstructors = () => {
        axios({
            method: 'GET',
            url: `http://localhost:3004/api/instructors`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data.instructors)
            setInstructors(response.data.instructors)
        }).catch((error) => {
            console.log(error)
        })
    }

    console.log(values)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: "POST",
            url: `http://localhost:3004/api/course-lecture/${courseId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { instructorId, date: selectedDate }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const addLectureToCourse = (e) => {

        setValues({...values, [e.target.name]: e.target.value})
    }

    const assignInstructorForm = () => {
        return (
            <div className="main_div">
                <div className="box">
                    <h1>Assign Lecture to Instructor</h1>
                    <form>
                        <div className="selectBox">
                            <select onChange={addLectureToCourse} name="instructorId">
                                <option selected disabled>Select Instructor</option>
                                {
                                    instructors.length > 0 &&
                                    instructors.map((instructor) => (
                                        <option value={instructor._id}>{instructor.name}</option>
                                    ))
                                }
                            </select>
                            <label>Select Course</label>
                        </div>
                        <div className="selectBox">
                            <select onChange={addLectureToCourse} name="courseId">
                                <option selected disabled>Select Course</option>
                                {
                                    courses.length > 0 &&
                                    courses.map((course) => (
                                        <option value={course._id} >{course.name}</option>
                                    ))
                                }
                            </select>
                            <label>Select Course</label>
                        </div>
                        <div className="inputBox">
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                                minDate={new Date()}
                            />
                            <label>Date</label>
                        </div>
                        <button type='submit' onClick={handleSubmit}>Add Lecture</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />
                {assignInstructorForm()}
            </div>
        </Layout>
    )
}

export default AssignInstructor;