import React, {Component} from "react";
import {useState, useEffect} from 'react';
import ShowVideo from "../ShowVideoArea/ShowVideo";
import './Dashboard.css';
import { app } from '../Firebase';
import { getDatabase, ref as DatabaseRef, set, push, onValue } from "firebase/database";
const Dashboard = () => {
   const [videoData, setVideoData] = useState([]); 
    
   const retrieveData = async () => {
    const db = getDatabase(app);
    const starCountRef = DatabaseRef(db, 'Videos/');
    await onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const real_data = Object.values(data);
    console.log(real_data);
    setVideoData(videoData => [...videoData, ...real_data]);
    console.log(videoData);
    // let data_obj = {};
    // real_data.forEach((data) =>  {
    //    data_obj = {
    //     title: data.title,
    //     type: data.type,
    //     video_url: data.video_url
    //   }
    //   //console.log(data_obj)
    //     setVideoData(prevStat => {
    //       return [...prevStat, {...data_obj}]
    //     });
    
    
    //updateStarCount(postElement, data);
    
  })
  console.log("video", videoData);
}


useEffect(() => {
  retrieveData();
}, []);
  return(
    <div>
        <div className="displayVideo">
           {
            videoData.map((data) => (
               <ShowVideo  
                 title = {data.title}
                 type = {data.type}
                 url = {data.video_url}
               />
            ))
          }
        </div>  
       </div> 
    )
  
  
  }

export default Dashboard;