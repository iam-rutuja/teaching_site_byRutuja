import React, {Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import Header from './components/Header';

const Layout = ({children}) => {

    return(
        <Fragment>
            <Header/>
            <div className='container'>
                {children}
            </div>
        </Fragment>
    )
}

export default withRouter(Layout);