import React from "react";
import {connect} from 'react-redux'
import { sendEditedComment,
         openCommentsDialog,
         triggerFun,
         deleteComment} from "../redux/actions";
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

class Comments extends React.Component{

    constructor(props){
        super(props)
            this.state={
                comment: props.comments.text,
                id: props.comments.id,
                openEditComment:false,
                formerComment:"",
                likes: props.comments.likes,
                dislikes:props.comments.dislikes,
                username:props.nameUser
            }
            console.log(this.state.username)
        }
        editOpenDialog=()=>{
            this.setState({ openEditComment: true})
            this.setState({ formerComment: this.state.comment})
        }
        saveEditedComment=()=>{
            const editedComm={text:this.state.comment}
            console.log("editedComm", editedComm)
            console.log("props.comments.text", this.props.comments.text)
            sendEditedComment(this.state.id, editedComm)
            this.setState({ openEditComment: false, comment: this.state.comment})
            this.props.triggerFun()
        }
        addLike=(id, obj)=>{
            if(this.state.likes.includes(this.state.username)){
                const likesArray=[...this.state.likes]
                const filterObj =likesArray.filter(item=> item!==obj)
                const likesObj = {likes: filterObj}
                sendEditedComment(id, likesObj)
                this.setState({
                    likes: filterObj
                  })
                this.props.triggerFun()
            }else{
                if(this.state.dislikes.includes(this.state.username)){
                    const likesArray=[...this.state.dislikes]
                    const filterObj =likesArray.filter(item=> item!==obj)
                    const likesObj = {dislikes: filterObj}
                    sendEditedComment(id, likesObj)
                    this.setState({ dislikes: filterObj})
                    this.props.triggerFun()
                }else{
                    const likesArray=[...this.state.likes]
                    likesArray.push(obj)
                    const likesObj = {likes: likesArray}
                    sendEditedComment(id, likesObj)
                    this.setState({likes: likesArray})
                    this.props.triggerFun()
                }
            }
        }
        addDislike=(id, obj)=>{
            if(this.state.dislikes.includes(this.state.username)){
                
                const likesArray=[...this.state.dislikes]
                const filterObj =likesArray.filter(item=> item!==obj)
                const likesObj = {dislikes: filterObj}
                sendEditedComment(id, likesObj)
                this.setState({dislikes: filterObj})
                this.props.triggerFun()
            }else{
                if(this.state.likes.includes(this.state.username)){
                    const likesArray=[...this.state.likes]
                    const filterObj =likesArray.filter(item=> item!==obj)
                    const likesObj = {likes: filterObj}
                    sendEditedComment(id, likesObj)
                    this.setState({likes: filterObj})
                    this.props.triggerFun()
                }else{
                    const likesArray=[...this.state.dislikes]
                    likesArray.push(obj)
                    const likesObj = {dislikes: likesArray}
                    sendEditedComment(id, likesObj)
                    this.setState({dislikes: likesArray})
                    this.props.triggerFun()
                }
            }
        }  

        render(){
            return(
                <>
                    {this.state.openEditComment?
                        <>
                        <input value={this.state.comment} onChange={(e)=>{this.setState({ comment: e.target.value})}}/>
                        <button onClick={() => {this.saveEditedComment()}}>Save</button>
                        <button onClick={()=>{this.setState({ openEditComment: false, comment: this.state.formerComment})}}>Cancel</button>
                        </>
                        :
                        <>
                            <div>
                                <CreateIcon onClick={() => {this.editOpenDialog()}}/>
                                <DeleteForeverIcon onClick={()=>{deleteComment(this.state.id);this.props.triggerFun()}}/>
                            </div>
                            <div>{this.state.comment}</div>
                            <div>
                            {this.state.dislikes.includes(this.state.username)?
                            <ThumbDownAltIcon onClick={()=>{this.addDislike(this.state.id, this.state.username)}} />:
                            <ThumbDownOffAltIcon onClick={()=>{this.addDislike(this.state.id, this.state.username)}} />}
                            {!this.state.likes.includes(this.state.username)?
                            <ThumbUpOffAltIcon onClick={()=>{this.addLike(this.state.id, this.state.username)}}/>:
                            <ThumbUpAltIcon onClick={()=>{this.addLike(this.state.id, this.state.username)}}/>}
                                <div>Likes:{this.state.likes.length-this.state.dislikes.length}</div>
                            </div>
                        </>}   
                </>
            )
        }
    }

    const mapStateToProps=(state)=>{
        return {
            allData:state.allData,
            booleanForOpenComments:state.booleanForOpenComments
    
        }
      }
    const mapDispatchToProp = (dispatch) => {
        return {
          openCommentsDialog: () => dispatch(openCommentsDialog()),
          triggerFun: ()=>dispatch(triggerFun())
        }
      }
    export default connect(mapStateToProps,mapDispatchToProp)(Comments)