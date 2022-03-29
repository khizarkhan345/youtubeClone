

const VideoDataDefaultState =  [
    
    ];


 const videoDataReducer = (state=VideoDataDefaultState, action) => {
    switch(action.type){
        case 'FETCH_DATA':
            //console.log("Video Added successfully")
            if(state.length === 0){
                // state.forEach((data) => {
                //     console.log("state Data", data)
                //     // action.data.forEach((actionData) => {
                //         console.log("Action Data", action.data);
                //         console.log(action.data[action.data.length-1])
                //         if(data.video_url !== action.data[action.data.length-1].video_url){
                //             return [
                //                 ...state,
                //                 action.data[action.data.length-1]
                //             ]
                //            }else{
                //                return state;
                //            }
                //     // })   
                // })
                return [
                    ...state,
                    ...action.data
                ]   
            }else{
                return state;
            }
          break;
        case 'ADD_DATA_ERROR':
                console.log("Error occurred while uploading data", action.err)
                return state;    
        case 'ADD_DATA':
            console.log("Video Added successfully")
            return [
                ...state,
                action.data2
            ]
    
          
        //console.log("created project", action.data);
        default:
            return state
    }
}

export  default videoDataReducer;