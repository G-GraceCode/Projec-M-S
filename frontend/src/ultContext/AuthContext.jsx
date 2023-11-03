import {createContext, useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    const contextData = {
       user 
    }

    return(
        <AuthProvider.Provider value = {contextData}> 
            {loading ? <p> page Loading</p> : children}
        </AuthProvider.Provider>
    )
};


export default AuthContext;