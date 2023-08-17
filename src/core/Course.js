import React, { useState } from "react";
import Layout from "../Layout";
import axios from 'axios';
import { authenticate, isAuth } from '../auth/helper';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from "react-router-dom";
import '../styles/signin.css';
import { getCookie } from '../auth/helper'

const Course = () => {

    const [values, setValues] = useState({
        name: '',
        level: '',
        description: '',
        buttonText: 'Submit'
    })

    const token = getCookie('token');

    const { name, level, description, buttonText } = values;

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `http://localhost:3004/api/course`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { name, level, description }
        }).then((resp) => {
            toast.success(resp.data.message);
        }).catch((error) => {
            setValues({...values, buttonText: 'Submit'});
            toast.error(error.response.data.error)
        })

    }

    const courseForm = () => {
        return(
            <div className="main_div">
                <div className="box">
                    <h1>Add Course</h1>
                    <form>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='name'
                                value={name}
                                onChange={handleChange} 
                                required
                            />
                            <label>Name</label>
                        </div>
                        <div className="selectBox">
                            <select>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <label>Level</label>
                        </div>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='description'
                                value={description}
                                onChange={handleChange} 
                                required
                            />
                            <label>Description</label>
                        </div>
                        <button type='submit' onClick={handleSubmit}>{buttonText}</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Layout>
            <div className='mt-6 col-md-6 offset-md-3'>
                <ToastContainer />
                {/* {isAuth() ? <Redirect to={isAuth().role === 'admin' ? '/admin' : '/instructor'} /> : null} */}
                {courseForm()}
            </div>
        </Layout>
    )
}

export default Course;