import { React} from "react";
import ReactPlayer from "react-player";
import "./ShowVideo.css";

const ShowVideo = (props) => {

  return (
    <div>
      <div className="showVideo">
        <div className="video">
          <ReactPlayer
            url={props.url}
            width="280px"
            height="230px"
            controls="true"
          />
          <h2>{props.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default ShowVideo;
