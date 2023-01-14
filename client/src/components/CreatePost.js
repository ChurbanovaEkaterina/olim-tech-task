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
                title: "",
                date:0
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
        console.log(this.formatDate())
        // This date does not work :(

        // this.setState({
        //     postNewPostInfo:{
        //         date:this.formatDate()
        //     }
        // })
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
              const response = await axios.post(`http://localhost:8080/post/`, value);
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
    formatDate=(date = new Date())=> {
        const year = date.toLocaleString('default', {year: 'numeric'});
        const month = date.toLocaleString('default', {month: '2-digit'});
        const day = date.toLocaleString('default', {day: '2-digit'});
        return [year, month, day].join('');
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