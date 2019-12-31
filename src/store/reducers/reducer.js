import actionType from "../action/actionType"
const defaultState = {
    columns:[],
    data:[]
}
export default(state=defaultState,action)=>{
    switch (action.type){
        case `${actionType.getFamilyList}_FULFILLED`:
            let data = {...state};
            data = action.payload;
            return data;
    }
    return state
}