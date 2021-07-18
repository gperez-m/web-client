import React, { createContext,Component } from "react";
import axios from 'axios'
export const MyContext = createContext();

const loginToken = localStorage.getItem('loginToken');
const Axios = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
});

class MyContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
        Axios.defaults.headers.common['Authorization'] = 'bearer '+ loginToken;
    }
    state = {
        showLogin:true,
        isAuth:false,
        theUser:null,
    }
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
    }

    registerUser = async (user) => {
        const register = await Axios.post('register',{
            name:user.name,
            email:user.email,
            password:user.password 
        });

        return register.data;
    }


    loginUser = async (user) => {
        const login = await Axios.post('login',{
            email:user.email,
            password:user.password
        });
        return login.data;
    }
    isLoggedIn = async () => {    
        if(loginToken){
            const {data} = await Axios.get('get_user');
            if(data.success && data.user){
                this.setState({
                    ...this.state,
                    isAuth:true,
                    theUser:data.user
                });
            }
        }
    }

    getEmployees = async (query) => {
        let url = `employees?per_page=${query.pageSize}&page=${query.page + 1}`
        const products = await Axios.get(url).catch(e => {
            console.log(e)
        });
        return products.data;
    }

    addEmployee = async (query) => {
        const products = await Axios.post('create', query);
        return products
    }

    deleteEmployee = async (query) => {
        let url= `delete/${query.id}`;
        const products = await Axios.delete(url);
        return products;
    }

    updateEmployee = async (newData, oldData) => {
        let url = `update/${newData.id}`
        const products = await Axios.put(url, newData);
        return products.data;
    }

    render(){
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser,
            getEmployees: this.getEmployees,
            addEmployee: this.addEmployee,
            updateEmployee: this.updateEmployee,
            deleteEmployee: this.deleteEmployee
        }
        return(
            <MyContext.Provider value={contextValue}>
                {this.props.children}
            </MyContext.Provider>
        )
    }

}

export default MyContextProvider;