import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import axios from 'axios'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, signout } from "../auth/helper";

const Instructor = ({history}) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        role: ''
    })

    const { name, email, role } = values;

    const token = getCookie('token');

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
            const { name, email, role } = response.data.user;
            setValues({...values, name, email, role});
            toast.success(response.data.message);
        }).catch((error) => {
            if(error.response.status === 401){
                signout(() => {
                    history.push('/')
                })
            }
            toast.error(error.response.data.error);
        })
    }

    const instructorPageForm = () => {
        return (
            <div className="main_div">
                <div className="box">
                    <h1>Instructor Panel</h1>
                    <form>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='name'
                                value={name}
                                required
                            />
                            <label>Name</label>
                        </div>
                        <div className="inputBox">
                            <input 
                                type='email'
                                name='email'
                                value={email}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="inputBox">
                            <input 
                                type='text'
                                name='role'
                                value={role}
                                required
                            />
                            <label>Role</label>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Layout>
            <div className='mt-3 col-md-6 offset-md-3'>
                <ToastContainer />         
                {instructorPageForm()}
            </div>
        </Layout>
    )
}

export default Instructor;