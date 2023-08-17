import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helper';
import '../styles/header.css';

const Header = ({children, history, match}) => {

  const isActive = (path) => {
    if(match.path === path){
      return {color: '#03a9f4'};
    }
    else{
      return {color: '#FFFFFF'};
    }
  }

  return (
    <div className='header_component'>
      <div className='title_component'>
        <h1>IM</h1>
      </div>
      <div className='list_container'>
        <ul>
          <li className='home'>
            <Link to='/' className='nav-link' style={isActive("/")}>
              Home
            </Link>
          </li>
          {
            !isAuth() && (
              <>
                <li>
                  <Link to='/signup' style={isActive("/signup")}>
                    Signup
                  </Link>
                </li>
                <li>
                  <Link to='/signin' style={isActive("/signin")}>
                    Signin
                  </Link>
                </li>
              </>
            )
          }
          {
            isAuth() && isAuth().role === 'admin' && (
              <li>
                <Link style={isActive('/admin')} to="/admin">
                  My Account
                </Link>
              </li>
            )
          }
          {
            isAuth() && isAuth().role === 'admin' && (
              <li>
                <Link style={isActive('/instructors')} to='/instructors'>
                  Instructors
                </Link>
              </li>
            )
          }
          {
            isAuth() && isAuth().role === 'admin' && (
              <li>
                <Link style={isActive('/create-course')} to='/create-course'>
                  Create Course
                </Link>
              </li>
            )
          }
          {
            isAuth() && isAuth().role === 'admin' && (
              <li>
                <Link style={isActive('/assign-instructor')} to='/assign-instructor'>
                  Assign Instructor
                </Link>
              </li>
            )
          }
          {
            isAuth() && isAuth().role === 'instructor' && (
              <li>
                <Link style={isActive('/instructor')} to="/instructor">
                  My Account
                </Link>
              </li>
            )
          }
          {
            isAuth() && isAuth().role === 'instructor' && (
              <li>
                <Link style={isActive('/instructor-lectures')} to="/instructor-lectures">
                  Lectures
                </Link>
              </li>
            )
          }
          {
            isAuth() && (
              <li>
                <span
                  style={{ cursor: 'pointer', color: '#fff' }} 
                  onClick={
                      () => signout(() => {
                      history.push('/')
                      })
                  }
                >
                  Signout
                </span>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header);