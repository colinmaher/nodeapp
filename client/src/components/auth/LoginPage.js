
import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
// import { withAuth } from '@okta/okta-react';
import SignInSide from './SignInSide'
import AuthContext from '../../contexts/AuthContext'

export default function LoginPage(props) {
    const [authenticated, setAuthenticated] = useState(null)
    const auth = useContext(AuthContext)
    async function checkAuthentication() {
        
        const isAuth = await auth.isAuthenticated()
        if (isAuth !== authenticated) {
            setAuthenticated(isAuth)
        }
    }

    useEffect(() => {
        checkAuthentication();
    })

    if (authenticated === null) { return null }
    else if (authenticated) {
        return <Redirect to={{ pathname: '/' }} />
    }
    else {
        return <SignInSide baseUrl={props.baseUrl} />
    }





}