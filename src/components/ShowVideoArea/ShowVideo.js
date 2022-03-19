import { React, useState } from "react";
import ReactPlayer from 'react-player';
import './ShowVideo.css';
import VideoThumbnail from 'react-video-thumbnail';
const ShowVideo = (props) => {
    const [thumbnail, setThumbnail] = useState("")
    return (
        <div className="showVideo">
           <div className="video">
           <ReactPlayer url={props.url} width="280px" height="230px" controls="true" />
             <h3>{props.title}</h3>
           </div> 
        </div>
    ) 
}

export default ShowVideo;