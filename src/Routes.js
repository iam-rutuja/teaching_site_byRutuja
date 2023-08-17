import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import Activation from './auth/Activation'
import Course from './core/Course'
import Admin from './core/Admin'
import Instructors from './core/Instructors'
import Instructor from './core/Instructor'
import Lectures from './core/Lectures'
import AssignInstructor from './core/AssignInstructor'

export const Routing = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/signin' component={Signin}/>
                <Route exact path='/admin' component={Admin}/>
                <Route exact path='/instructor' component={Instructor}/>
                <Route exact path='/auth/activate/:token' component={Activation} />
                <Route exact path='/create-course' component={Course} />
                <Route exact path='/instructors' component={Instructors} />
                <Route exact path='/instructor-lectures' component={Lectures} />
                <Route exact path='/assign-instructor' component={AssignInstructor} />
            </Switch>
        </BrowserRouter>
    )
}