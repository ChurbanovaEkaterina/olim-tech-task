import {
    INPUT_POST,
    ALL_DATA,
    NUMBER_OF_PAGES,
    TRUE_FALSE_OPEN_COMM,
    TRIGGER_NUM,
    OPEN_CLOSE_NEW_POST

} from './actions'

const initState={
   postNewPostInfo:{},
   allData:[],
   page:1,
   changes:1,
   booleanForOpenComments:false,
   trigger:0,
   boolienOpenCloseNewPost: false
}

export const reducer = (state=initState, action={}) => {
    switch (action.type){

        case NUMBER_OF_PAGES:
        return {...state, page: action.payload}

        case INPUT_POST:
        return {...state, postNewPostInfo: action.payload}

        case ALL_DATA:
        return {...state, allData: action.payload}

        case TRUE_FALSE_OPEN_COMM:
            return {...state, booleanForOpenComments: !state.booleanForOpenComments}

        case TRIGGER_NUM:
        return {...state, trigger: state.trigger+1}

        case OPEN_CLOSE_NEW_POST:
        return {...state, boolienOpenCloseNewPost: !state.boolienOpenCloseNewPost}

        default:
        return {...state}
    }
  }
  