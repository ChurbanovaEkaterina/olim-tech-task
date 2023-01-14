import axios from 'axios';
export const POST_NEW_POST='POST_NEW_POST'
export const INPUT_POST='INPUT_POST'
export const ALL_DATA='ALL_DATA'
export const NUMBER_OF_PAGES='NUMBER_OF_PAGES'
export const TRUE_FALSE_OPEN_COMM = "TRUE_FALSE_OPEN_COMM"
export const TRIGGER_NUM="TRIGGER_NUM"
export const OPEN_CLOSE_NEW_POST="OPEN_CLOSE_NEW_POST"

export const getFullData =(fullData)=>{
  //console.log("regetFullDatadux-------->>>>>>", fullData);
  return{
    type:ALL_DATA,
    payload:fullData
  }
}
export const getAlldata = (page) =>  async () => {
  try {
     const resultData = await axios.get(`http://localhost:8080/post/page/${page}`);
     getFullData(resultData.data.result)
  } catch(e){
      console.log(e);
  }
}

export const getValue =(value)=>{
    return{
      type:INPUT_POST,
      payload:value
    }
  }
  export const turnRight =(value)=>{
    return{
      type:NUMBER_OF_PAGES,
      payload:value+1
    }
  }
  export const turnLeft =(value)=>{
    return{
      type:NUMBER_OF_PAGES,
      payload:value-1
    }
  }
  export const openCommentsDialog =()=>{
    return{
      type:TRUE_FALSE_OPEN_COMM
    }
  }
  export const triggerFun =()=>{
    return{
      type:TRIGGER_NUM
    }
  }
  export const openCloseCreateNewPostWindow =()=>{
    return{
      type:OPEN_CLOSE_NEW_POST
    }
  }

  export const deletePost = async (id) => { 
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:8080/post/${id}`);
      return response;
    } catch (error) {
       console.log(error);
    }
  }
  export const addUpdateToPost = async(id, obj)=>{
    console.log(id, obj);
    try {
      console.log(id, obj);
      const response = await axios.put(`http://localhost:8080/post/${id}`, obj);
      return response;
    } catch (error) {
      console.log(error)
    }
  }
  export const sendNewComment = async(obj)=>{
    console.log( obj);
    try {
      const response = await axios.post("http://localhost:8080/comment", obj);
      return response;
    } catch (error) {
      console.log(error)
    }
  }
  export const sendEditedComment = async(id, obj)=>{
    console.log( obj);
    try {
      const response = await axios.put(`http://localhost:8080/comment/${id}`, obj);
      return response;
    } catch (error) {
      console.log(error)
    }
  }
  export const deleteComment = async(id)=>{
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:8080/comment/${id}`);
      return response;
    } catch (error) {
      console.log(error)
    }
  }

