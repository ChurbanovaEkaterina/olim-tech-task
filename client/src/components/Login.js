import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";


const Login=()=>{
    const {userName, setUserName, setLogin} = useContext(AppContext);
    const logIn=()=>{
        if(userName.length!==0&&userName.trim().length!==0){
            setLogin(true)
        }
    }
    return(
        <div className="sign__in__main">
            <div className="within__sign__in__main">
                <h3>Hello, there! Let's meet. What's your name?</h3>
                <div>
                    <input type="text" className="input__sign__in"onChange={(e)=>setUserName(e.target.value)}></input>
                    <button className="button__sign__in" onClick={logIn}>Login</button>
                </div> 
            </div>
        </div>
    )
}

export default Login