import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const isLoggedIn = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (!isLoggedIn) navigate('/login', { replace: true });
    }, [isLoggedIn, navigate])
    
    return (
        <>
            {children}
        </>
    )
}

export default AuthGuard;