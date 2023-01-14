import React, { useState } from "react";
import axios from 'axios'
import { useEffect, useContext } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import {connect} from 'react-redux'
import { AppContext } from "../App";
import { getAlldata, 
         getFullData, 
         turnRight,
         turnLeft,
         triggerFun,
         openCloseCreateNewPostWindow
         } from "../redux/actions";


const Main=(props)=> {
    const {userName, setUserName, setLogin} = useContext(AppContext);
    const [totalLength, setTotalLength]=useState(1)
    const page = props.page
    const user = userName

    const handleKeyDown = (event) => {

        if (event.key === 'Enter'&&event.target.value.length>0) {
            getSrearchData(event.target.value)
        }else{
            getResult()
        }
      }

    useEffect(()=>{
        getResult()
        console.log(props.allData)
    },[page, props.booleanForOpenComments, props.trigger])
    
    const getResult=async()=>{
        try {
            const resultData = await axios.get(`http://localhost:8080/post/page/${page}`);
            props.getFullData(resultData.data.result)
            console.log(resultData.data.result)
            setTotalLength(resultData.data.total)
        } catch (error) {
            console.log(error)
        }
    }
    const getSrearchData = async (keyWorld) => {
        try {
           const resultData = await axios.get(`http://localhost:8080/post/search/${keyWorld}`);
           props.getFullData(resultData.data.result)
           setTotalLength(resultData.data.total)
        } catch(e){
            console.log(e);
        }
      }
    const logOut=()=>{
        setUserName("")
        setLogin(false)
    }
    return (
        <>
        <nav>
            <div>
                Hi, {user}!
            </div>
            <div className="nav__btns">
                <button onClick={()=>{props.openCloseCreateNewPostWindow()}}>Create new post</button>
                <button onClick={logOut}>Sign out</button>
            </div>
        </nav>
        <div className="input__search">
            <input placeholder="Search the post" onKeyDown={handleKeyDown}/>
        </div>
          {props.allData.length>0?<section className="section__for__all__posts">
            {
                props.allData.map((item, index)=>{
                    return(
                        <div key={item.id}>
                          <Post data={item} numPage={page} username={user} idNum={index}/>
                        </div>
                    )
                })
            }
          </section>:<div className="no__posts">Ooops, there is no posts!</div>}
          <div className="btns__turn__pages">
            {
              props.allData.length<9&&page!==1&&<button onClick={()=>{props.turnLeft(props.page)}}>Previous page</button>
            }
            <div className="number__page">Page №{props.page}</div> 
            {
              props.allData.length===9&&totalLength>9&&<button onClick={()=>{props.turnRight(props.page)}}>Next page</button>
            }
          </div>
            {
              props.boolienOpenCloseNewPost&&<div className="fullscreen-container"><div className="dialog__create__post"><button onClick={()=>{props.openCloseCreateNewPostWindow()}} className="cancel__btn">X</button><CreatePost username={user} /></div></div>
            }       
        </>
    )
}
const mapStateToProps=(state)=>{
    return {
        allData:state.allData,
        page:state.page,
        booleanForOpenComments:state.booleanForOpenComments,
        trigger: state.trigger,
        boolienOpenCloseNewPost:state.boolienOpenCloseNewPost
        
    }
  }
const mapDispatchToProp = (dispatch) => {
    return {
       getAlldata:(val) => dispatch(getAlldata(val)),
       getFullData:(fullData) => dispatch(getFullData(fullData)),
       turnRight:(val)=>dispatch(turnRight(val)),
       turnLeft:(val)=>dispatch(turnLeft(val)),
       triggerFun:()=>dispatch(triggerFun()),
       openCloseCreateNewPostWindow:()=>dispatch(openCloseCreateNewPostWindow())
    }
  }
export default connect(mapStateToProps,mapDispatchToProp) (Main)