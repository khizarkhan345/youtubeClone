import React from "react";
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {app} from './Firebase';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const UploadVideo = () => {
  const [filePath, setFilePath] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  
  // const onDrop = (files) => {
    
  //    let formData = new FormData();
  //    const config = {
  //      header: {'content-type': 'multipart/form-data'}
  //    }
  //   // console.log(files[0]);
    
     

  //    setFilePath(files[0]);

  //    formData.append("file", filePath);
     
  //    console.log(formData.get("file"));


  //    axios.post('/api/uploadVideo', formData, config)
  //    .then((response) => {
  //         if(response.data.success){
  //             console.log(response);
  //         }else{
  //           alert("Failed to save the data in the server")
  //         }
  //    }).catch((err) => {
  //      console.log(err);
  //    })
  // }
  const onFileChange = (e) => {
       e.preventDefault();

       setFilePath(e.target.files[0])
  }
   const onSubmit = async (e) => {
    
    e.preventDefault();

    let bucketName = 'images';
    let file = filePath;
     console.log(file);
    // let storage = getStorage(app);
    // let storageRef = ref(storage, `${bucketName}/${file.name}`)
    // let uploadTask = put(storageRef, file);
    // uploadTask.on("state_changed" , alert("success") , alert)

        const storage = getStorage(app);
       const storageRef = ref(storage, `${bucketName}/${file.name}`);
      //console.log(storageRef);
// // 'file' comes from the Blob or File API
//    const uploadTask = uploadBytes(storageRef, file).then((snapshot) => {
//        console.log('Uploaded a blob or file!');
//        console.log(snapshot);
//      }).catch((err) => {
//         console.log(err)
//       })

//    console.log(uploadTask);
const metadata = {
  contentType: 'video/mp4'
};

const uploadTask = uploadBytesResumable(storageRef, file, metadata);
// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
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
  }
  // }, 
  // () => {
  //   // Upload completed successfully, now we can get the download URL
  //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //     console.log('File available at', downloadURL);
  //   });
  // }
);
    // const formData = new FormData();
    
    // formData.append("file", filePath);

    //   axios.post('http://localhost:3000/api/uploadVideo', formData)
    //  .then((response) => {
    //       if(response.data.success){
    //           console.log(response);
    //       }else{
    //         alert("Failed to save the data in the server")
    //       }
    //  }).catch((err) => {
    //    console.log(err);
    //  })
     
     
 
  }

  const show = () => {
    const storage = getStorage();
getDownloadURL(ref(storage, 'images/2. Thinking in React.mp4'))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest({header: 'Access-Control-Allow-Origin'});
    xhr.responseType = 'blob';
    xhr.onload = (event) => { 
      const blob = xhr.response;
    };
    xhr.open('GET', url); 
    xhr.send();

    // Or inserted into an <img> element
    // const img = document.getElementById('myimg');
    // img.setAttribute('src', url);
    console.log(url);
  })
  .catch((error) => {
    // Handle any errors
  });
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Video</label>
        <input type="file" onChange={onFileChange} />
        <label>Title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <label>Description</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
        <textarea type="text" onChange={(e) => setTags(e.target.value)} value={tags} placeholder="Enter comma separated tags"></textarea>
        <button >Submit</button>
      </form>
      <button onClick={show}>Show</button>
    </div>
  )
}

export default UploadVideo;