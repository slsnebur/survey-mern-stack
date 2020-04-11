import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import LoginBox from '../../components/login';
import Start from '../../routes/Start';

function LoginRoute(props) {
    return(
        <Start content={LoginBox}/>
    )
}

export default LoginRoute;
