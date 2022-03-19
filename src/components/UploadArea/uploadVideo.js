import React from "react";
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { app } from '../Firebase';
import './uploadVideo.css';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as DatabaseRef, set, push, onValue } from "firebase/database";
const UploadVideo = (props) => {
  const [filePath, setFilePath] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Comedy");
  const [url, setURL] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [videoURL, setVideoURL] = useState([{}]);
  const onFileChange = (e) => {
    e.preventDefault();

    setFilePath(e.target.files[0])
  }

  const onSubmit = async (e) => {

    e.preventDefault();

    //const database = app.database();

    let bucketName = 'Videos';
    let file = filePath;
    console.log(file);

    const storage = getStorage(app);
    const storageRef = ref(storage, `${bucketName}/${title}.mp4`);

    const metadata = {
      contentType: 'video/mp4'
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
          //console.log('File available at', downloadURL);
          const db = getDatabase(app);
          push(DatabaseRef(db, 'Videos/'), {
            title: title,
            type: type,
            video_url: downloadURL
          }).then((result) => {
            setUploadStatus(" Video Uploaded successfully")
            //console.log(" Video Data added successfully")
          }).catch((err) => {
            setUploadStatus("Error occurred while uploading Video")
            //console.log(err, "Error occurred while uploading data");
          })

          setTimeout(() => {
            setUploadStatus("")
          }, 2000)
         
        });
        
        
        // console.log(title);
        // console.log(type);
        // console.log(url);
        props.history.push('/')
      }

    );


  }

  // const show = async () => {
  //   // const storage = getStorage();
  //   // getDownloadURL(ref(storage, 'images/'))
  //   //   .then((url) => {
  //   //     // `url` is the download URL for 'images/stars.jpg'

  //   //     // This can be downloaded directly:
  //   //     const xhr = new XMLHttpRequest({ header: 'Access-Control-Allow-Origin' });
  //   //     xhr.responseType = 'blob';
  //   //     xhr.onload = (event) => {
  //   //       const blob = xhr.response;
  //   //     };
  //   //     xhr.open('GET', url);
  //   //     xhr.send();

  //   //     // Or inserted into an <img> element
  //   //     // const img = document.getElementById('myimg');
  //   //     // img.setAttribute('src', url);
  //   //     //setURL(url);
  //   //     console.log(url);
  //   //   })
  //   //   .catch((error) => {
  //   //     // Handle any errors
  //   //   });

  //   const db = getDatabase(app);
  //   const starCountRef = DatabaseRef(db, 'Videos/');
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const real_data = Object.values(data);
  //     //console.log(real_data);
  //     let data_obj = {};
  //     real_data.forEach((data) => {
  //       data_obj = {
  //         title: data.title,
  //         type: data.type,
  //         video_url: data.video_url
  //       }
  //       console.log(data_obj)

  //       setVideoURL(prevStat => {
  //         return [...prevStat, { ...data_obj }]
  //       });

  //     })
  //     //updateStarCount(postElement, data);
  //     console.log(videoURL);
  //   });
  // }
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
      <h3>{uploadStatus}</h3>
    </div>
  )
}

export default UploadVideo;