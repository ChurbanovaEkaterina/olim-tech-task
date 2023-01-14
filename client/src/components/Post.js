import React from "react";
import {connect} from 'react-redux'
import { getValue,
         deletePost,
         getFullData, 
         addUpdateToPost,
         sendNewComment,
         openCommentsDialog,
         triggerFun} from "../redux/actions";
import Comments from "./Comments";
import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

class Post extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            postInfo:{
                id: props.data.id,
                username: props.data.username,
                title: props.data.title,
                imageSrc: props.data.imageSrc,
                comments: props.data.comments,
                likes: props.data.likes,
                dislikes: props.data.dislikes,
                date: props.data.date
            },
            numPage: props.numPage,
            like: true,
            username: props.username,
            openEditWindow:false,
            titleDuble:"",
            oppenCommentWindow:false,
            comment:{
                text: "", 
                postId: props.data.id, 
                username: props.username
            },
            oppenCommentEditWindow:false,
            
        }
      }
      
      deletePostAndRefresh(value){
        deletePost(value)
        this.props.triggerFun()
      }
        addLike=(id, obj)=>{
            if(this.state.postInfo.likes.includes(this.state.username)){
                const likesArray=[...this.state.postInfo.likes]
                const filterObj =likesArray.filter(item=> item!==obj)
                const likesObj = {likes: filterObj}
                addUpdateToPost(id, likesObj)
                this.setState({
                    postInfo: {
                        ...this.state.postInfo, likes: filterObj
                    },
                  })
            }else{
                if(this.state.postInfo.dislikes.includes(this.state.username)){
                    const likesArray=[...this.state.postInfo.dislikes]
                    const filterObj =likesArray.filter(item=> item!==obj)
                    const likesObj = {dislikes: filterObj}
                    addUpdateToPost(id, likesObj)
                    this.setState({
                        postInfo: {
                            ...this.state.postInfo, dislikes: filterObj
                        },
                      })
                }else{
                    const likesArray=[...this.state.postInfo.likes]
                    likesArray.push(obj)
                    const likesObj = {likes: likesArray}
                    addUpdateToPost(id, likesObj)
                    this.setState({
                    postInfo: {
                        ...this.state.postInfo, likes: likesArray
                    },
                  })
                }
            }
        } 
        addDislike=(id, obj)=>{
            if(this.state.postInfo.dislikes.includes(this.state.username)){
                
                const likesArray=[...this.state.postInfo.dislikes]
                const filterObj =likesArray.filter(item=> item!==obj)
                const likesObj = {dislikes: filterObj}
                addUpdateToPost(id, likesObj)
                this.setState({
                    postInfo: {
                        ...this.state.postInfo, dislikes: filterObj
                    },
                  })
            }else{
                if(this.state.postInfo.likes.includes(this.state.username)){
                    const likesArray=[...this.state.postInfo.likes]
                    const filterObj =likesArray.filter(item=> item!==obj)
                    const likesObj = {likes: filterObj}
                    addUpdateToPost(id, likesObj)
                    this.setState({
                        postInfo: {
                            ...this.state.postInfo, likes: filterObj
                        },
                    })
                }else{
                    const likesArray=[...this.state.postInfo.dislikes]
                    likesArray.push(obj)
                    const likesObj = {dislikes: likesArray}
                    addUpdateToPost(id, likesObj)
                    this.setState({
                        postInfo: {
                            ...this.state.postInfo, dislikes: likesArray
                        },
                    })
                }
            }
        } 
        editPost=(e)=>{
            this.setState({
                postInfo: {
                    ...this.state.postInfo, title: e.target.value
                },
            })
        }
        closeWindow=()=>{
            this.setState({
                openEditWindow:false
            })
            this.setState({
                postInfo: {
                    ...this.state.postInfo, title: this.state.titleDuble
                },
            })
        }
        openWindow=()=>{
            this.setState({
                openEditWindow:true
            })
            this.setState({
                titleDuble:this.state.postInfo.title
            })  
        }
        saveTitle=(id)=>{
            const title={title: this.state.postInfo.title}
            addUpdateToPost(id, title)
            this.setState({
                openEditWindow:false
            })
        }
        addNewComment=()=>{
            const newComment=this.state.comment
            const commentArray=[...this.state.postInfo.comments]
            commentArray.push(newComment)
            this.setState({
                postInfo: {
                    ...this.state.postInfo, comments: commentArray
                },
            })
            sendNewComment(newComment)
            this.props.triggerFun()
        }
      render(){
        return(
            <>
            <div className="one__post">
                <div className="delete__edit__btn">
                   <DeleteForeverIcon onClick={()=>{this.deletePostAndRefresh(this.state.postInfo.id)}}/>
                   <CreateIcon onClick={()=>{this.openWindow()}}/>
                </div>
                <img src={this.state.postInfo.imageSrc} alt="img"></img>
                <div className="like__dislike__btns">
                    <div>
                    {this.state.postInfo.dislikes.includes(this.state.username)?<ThumbDownAltIcon onClick={()=>{this.addDislike(this.state.postInfo.id, this.state.username)}} />:
                        <ThumbDownOffAltIcon onClick={()=>{this.addDislike(this.state.postInfo.id, this.state.username)}} />}
                    {!this.state.postInfo.likes.includes(this.state.username)?
                        <ThumbUpOffAltIcon onClick={()=>{this.addLike(this.state.postInfo.id, this.state.username)}}/>:
                        <ThumbUpAltIcon onClick={()=>{this.addLike(this.state.postInfo.id, this.state.username)}}/>}
                        <ChatBubbleOutlineIcon onClick={() => {this.setState({ oppenCommentEditWindow: true});this.props.openCommentsDialog() }}/>
                    </div>
                    <div>Likes: {this.state.postInfo.likes.length-this.state.postInfo.dislikes.length}</div>
                </div>
                <div className="div__with__title">{this.state.postInfo.title}</div>
            </div>
            {this.state.openEditWindow&&
        <div className="fullscreen-container">
                <div className="open__edit__post">
                    <button onClick={this.closeWindow} className="cancel__btn">X</button>
                    <div className="within__edit__post">
                        <textarea type="text" value={this.state.postInfo.title} onChange={(e)=>{this.editPost(e)}}/><br></br>
                        <button onClick={()=>{this.saveTitle(this.state.postInfo.id)}}>Save</button>
                    </div>
                </div>
            </div>}
                           
            {this.state.oppenCommentEditWindow&&
        <div className="fullscreen-container">
                <div className="open__edit__post">
                <button onClick={() => {this.setState({ oppenCommentEditWindow: false})}} className="cancel__btn">X</button>
                    <div className="within__comment__post">
                        <textarea type="text" placeholder="I am typing..." onChange={(e) => {this.setState({ comment: {...this.state.comment, text: e.target.value}})}}/><br></br>
                        <button onClick={this.addNewComment}>Post</button>
                        <div className="list__of__post">
                        {this.props.allData[this.props.idNum].comments.map((item, index)=>{
                            return(
                                <div key={item.id} className="div__comment">
                                    <Comments comments={item} page={this.props.numPage} key={index} nameUser={this.props.username}/>
                                </div>
                            )
                        })}
                        </div>  
                    </div>
                </div>
            </div>}
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
      getValue:(obj) => dispatch(getValue(obj)),
      getFullData:(fullData) => dispatch(getFullData(fullData)),
      openCommentsDialog: () => dispatch(openCommentsDialog()),
      triggerFun: ()=>dispatch(triggerFun())
    }
  }
export default connect(mapStateToProps,mapDispatchToProp)(Post)