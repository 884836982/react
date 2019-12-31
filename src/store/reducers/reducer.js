const defaultState = {
    columns:[],
    data:[]
}
export default(state=defaultState,action)=>{
    switch (action.type){
        case "FAMILY_LIST_FULFILLED":
            let data = {...state};
            debugger;
            data = action.payload;
            return data;
    }
    return state
}