const defaultState={
    offset:"",
    entries:[],
    banner:[]
}
export default(state=defaultState,action)=>{
    switch(action.type){
        case "FIND_OFFSET_FULFILLED":
            let offsetState = {...state};
            offsetState.offset = action.payload.name;
            return offsetState;
        case "HOME_ENTRIES_FULFILLED":
            let entriesState = {...state};
            entriesState.entries = action.payload;
            return entriesState;
        case "HOME_BANNER_FULFILLED":
            let bannerState = {...state};
            bannerState.banner = action.payload;
            return bannerState;
    }
    return state;     
}