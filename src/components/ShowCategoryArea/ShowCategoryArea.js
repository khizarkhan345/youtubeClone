import { React} from "react";
import "./ShowCategoryArea.css";

const ShowVideo = (props) => {
  return (
    <div>
      <div className="type">
        <button
          id="category_button"
          onClick={() => props.onUserClick(props.type)}
          autofocus
        >
          {props.type}
        </button>
      </div>
    </div>
  );
};

export default ShowVideo;
