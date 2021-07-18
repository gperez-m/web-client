import React, {useContext} from 'react'
import {MyContext} from '../routes/MyContext'
import Login from './Login'
import Register from './Register'
import Table from './TableEmployees'

function Home(){

    const {rootState} = useContext(MyContext);
    const {isAuth, showLogin} = rootState;

    if(isAuth){
        return <Table/>;
    }
    else if (showLogin) {
        return <Login/>;
    }
    else {
        return <Register/>;
    }
    
}

export default Home;