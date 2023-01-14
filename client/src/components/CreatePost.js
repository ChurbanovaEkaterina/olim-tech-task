import React from "react";
import {connect} from 'react-redux'
import { getValue } from "../redux/actions";
import { postNewPost,
         openCommentsDialog,
         triggerFun,
         openCloseCreateNewPostWindow } from "../redux/actions";
import axios from 'axios';

class CreatePost extends React.Component{
    constructor(props){
        super(props)
        this.state={
            postNewPostInfo:{
                username: this.props.username,
                title: ""
            },
            formData:null,
            responseId:0,
        }
      }
      handleChange=(e)=>{
        this.state.postNewPostInfo[e.target.name]=e.target.value;
        this.setState({
            formData:e.target.files[0]
        })
        this.setState({
            postNewPostInfo:{...this.state.postNewPostInfo}
        })
      }
      sendImg = async(idNumber) => {
        let formData1 = new FormData();        
        formData1.append("picture", this.state.formData)
        try {
          const response = await axios({
            method: "post",
            url: `http://localhost:8080/post/${idNumber}/picture`,
            data: formData1,
            headers: { "Content-Type": "multipart/form-data" },
          });
        } catch(error) {
          console.log(error)
        }
      }
      
      handleSubmit=(e)=>{
        e.preventDefault();
        const postNewPost = async (value) => { 
            try {
              console.log(value);
              const response = await axios.post(`http://localhost:8080/post/`, value);
              console.log(response.data.result.id)
              this.setState({
                responseId:response.data.result.id
              })
              this.sendImg(response.data.result.id)
              return response;
            } catch (error) {
               console.log(error);
            }
          }
          postNewPost(this.state.postNewPostInfo)
          this.props.openCloseCreateNewPostWindow()
          setTimeout(() => {
            this.props.triggerFun()
            console.log(this.state.responseId)
          }, 5000);
      }
      getResult=async()=>{
        try {
            const resultData = await axios.get("http://localhost:8080/post/page/1");
            console.log("resultData", resultData.data.total)
        } catch (error) {
            console.log(error)
        }
    }
    
      render(){
        return(
        <div>
          <form id="formElem" onSubmit={this.handleSubmit}>
            <textarea placeholder="Your title" onChange={(e)=>this.handleChange(e)} name='title' type='text'/><br/>
            <input type="file" name="imageSrc" multiple accept="image/*" onChange={(e)=>this.handleChange(e)} />
            <button type="submit">Create Post</button>
        </form>       
        </div>
      )
    }
}
const mapDispatchToProp = (dispatch) => {
    return {
      getValue:(obj) => dispatch(getValue(obj)),
      openCommentsDialog: () => dispatch(openCommentsDialog()),
      triggerFun: () => dispatch(triggerFun()),
      openCloseCreateNewPostWindow: () =>dispatch(openCloseCreateNewPostWindow())
    }
  }
export default connect(null,mapDispatchToProp)(CreatePost)