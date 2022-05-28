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
          <h2 className="video__title">{props.title}</h2>
          <h3 className="author__name">Uploaded By: {props.uploadedBy}</h3>
        </div>
      </div>
    </div>
  );
};

export default ShowVideo;
