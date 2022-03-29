import { getDatabase, ref as DatabaseRef, push, onValue } from "firebase/database";
import app from '../components/Firebase';

export const addData = (data2) => {
  return (dispatch, getState) => {
    console.log("addData is called")
    const db = getDatabase(app);
          push(DatabaseRef(db, 'Videos/'), {
            title: data2.title,
            type: data2.type,
            video_url: data2.video_url,
            uploadedBy: data2.uploadedBy
          }).then((result) => {
           // setUploadStatus(" Video Uploaded successfully")
            dispatch({type: 'ADD_DATA', data2})
          }).catch((err) => {
            dispatch({type: 'ADD_DATA_ERROR', err})
            //setUploadStatus("Error occurred while uploading Video")
            //console.log(err, "Error occurred while uploading data");
          })
    
  }
}
    
export const fetchData = (data) => {
  return (dispatch, getState) => {
     console.log("Fetch data is called");
      dispatch({type: 'FETCH_DATA', data})     
  }
}