import React from "react";
import { useState } from 'react';
import  app  from '../Firebase';
import './uploadVideo.css';
import { addData } from "../../Action/DataActions";
import { getStorage, ref,  uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as DatabaseRef, onValue } from "firebase/database";
import { connect } from "react-redux";

const UploadVideo = (props) => {
  const [filePath, setFilePath] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Comedy");
  const [uploadStatus, setUploadStatus] = useState("");
  const onFileChange = (e) => {
    e.preventDefault();

    setFilePath(e.target.files[0])
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let bucketName = 'Videos';
    let file = filePath;
    console.log(file);

    const storage = getStorage(app);
    const storageRef = ref(storage, `${bucketName}/${title}.mp4`);

    const metadata = {
      contentType: 'video/mp4'
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log('Upload is ' + progress + '% done');
        setUploadStatus('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          
          const db = getDatabase(app);
          const starCountRef = DatabaseRef(db, 'Users/'+ props.uid);
          onValue(starCountRef, (snapshot) => {
            const user_data = snapshot.val();
      
          setUploadStatus("Video Added Successfully");
          const data = {
            title: title,
            type: type,
            video_url: downloadURL,
            uploadedBy: user_data.FirstName + ' ' + user_data.LastName 
          }
          
          props.addData(data);
          
          setTimeout(() => {
            setUploadStatus("")
          }, 2000)
          })
        });
      
      }

    );


  }

 
  
  return (
    <div className="form-data">
    
      <form onSubmit={onSubmit}>
        <div className="form">
          <input type="file" onChange={onFileChange} />
        </div>

        <div className="form">
          <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>

        <div className="form">
          <label>Category</label>
          <select onChange={(e) => setType(e.target.value)}>
            <option value="comedy">Comedy</option>
            <option value="sports">Sports</option>
            <option value="fitness">Fitness</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        <div className="form">
          <button >Submit</button>
        </div>
         

      </form>
      <div className="Upload_status">
         {
            uploadStatus
         }     
      </div>
 
      
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    uid: state.Auth.uid
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addData: (data) => dispatch(addData(data)) 
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadVideo);