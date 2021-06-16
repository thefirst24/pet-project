import {LoginForm,RegisterForm} from './Forms'
import { useState,useEffect } from 'react'
import axios from 'axios'


const Modal = (props) => {
    return (
        <div className="modal-container" >
            <props.form />
        </div>
    )
}

const isLoggedIn = () => {
    return axios.get('http://localhost:3000/is_logged')
    .then(response => {
        return response.data;
    })
    .catch(err => {
        return false;
    })
}



const Header = () => {
    const [isLoginModalOpen,setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen,setRegisterIsModalOpen] = useState(false);
    const [isLogged,setIsLogged] = useState(false);
    document.body.style.overflow = isLoginModalOpen ||  isRegisterModalOpen ? 'hidden' : 'visible';
    useEffect(() => {
        if (isLoginModalOpen || isRegisterModalOpen) {
            const modal = document.querySelector('.modal-container');
            modal.addEventListener('click',(e) => {
                if (e.target === e.currentTarget) {
                    if (isLoginModalOpen) 
                        setIsLoginModalOpen(false);
                    else 
                        setRegisterIsModalOpen(false);
                }
            });
        }
    },[isLoginModalOpen,isRegisterModalOpen]);
    useEffect(() => {
        async function getLoggedIn() {
            const getLogin = await isLoggedIn();
            setIsLogged(getLogin);
        };
        getLoggedIn();
    },[isLogged]);
    return (
        <>
        <div className="header-wrapper">
            <header>
                {!isLogged && <a className="Login header-btn" onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}>Login</a>}
                {!isLogged && <a className="Register header-btn" onClick={() => setRegisterIsModalOpen(!isRegisterModalOpen)}>Register</a>}
                {isLogged && <a className="logout header-btn" onClick={() => {
                    axios.get("http://localhost:3000/logout").then(response => {
                         window.location.reload();
                    })
                    console.log("clcked");
                }}>Logout</a>}
            </header>
        </div>
        {isLoginModalOpen && <Modal form={LoginForm}/>}
        {isRegisterModalOpen && <Modal form={RegisterForm}/>}
        </>
        
    )
}

export default Header;