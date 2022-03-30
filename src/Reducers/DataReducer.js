

const VideoDataDefaultState =  [
    
    ];


 const videoDataReducer = (state=VideoDataDefaultState, action) => {
    switch(action.type){
        case 'FETCH_DATA':
            //console.log("Video Added successfully")
            if(state.length === 0){
                return [
                    ...state,
                    ...action.data
                ]   
            }else{
                return state;
            }
        case 'ADD_DATA_ERROR':
                return state;  
        case 'ADD_DATA':
            return [
                ...state,
                action.data2
            ]
        default:
            return state
    }
}

export  default videoDataReducer;