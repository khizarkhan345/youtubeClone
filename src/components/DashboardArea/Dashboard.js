import React from "react";
import { useState, useEffect } from "react";
import ShowVideo from "../ShowVideoArea/ShowVideo";
import ShowCategory from "../ShowCategoryArea/ShowCategoryArea";
import { connect } from "react-redux";
import "./Dashboard.css";
import app from "../Firebase";
import { getDatabase, ref as DatabaseRef, onValue } from "firebase/database";
import {
  selectByAll,
  selectByComedy,
  selectBySports,
  selectByFitness,
  selectByTechnology,
} from "../../Action/FilterActions";
import { fetchData } from "../../Action/DataActions";
import selectData from "../../Selectors/DataSelector";

const Dashboard = (props) => {
  var [videoData, setVideoData] = useState([]);
  const type = ["All", "Comedy", "Sports", "Fitness", "Technology"];
  var real_data = [];
 
  const retrieveData = async () => {
    const db = getDatabase(app);
    const starCountRef = DatabaseRef(db, "Videos/");
    await onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      real_data = Object.values(data);
      setVideoData((videoData) => [...videoData, ...real_data]);
      console.log("Real Data", real_data);
      console.log(videoData);

      props.fetchData(real_data);
    });
  };

  const onUserClick = (type) => {
    if (type === "All") {
      props.selectByAll();
    } else if (type === "Comedy") {
      props.selectByComedy();
    } else if (type === "Sports") {
      props.selectBySports();
    } else if (type === "Fitness") {
      props.selectByFitness();
    } else if (type === "Technology") {
      props.selectByTechnology();
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div>
      <div className="displayCategory">
        {type.map((data) => (
          <ShowCategory type={data} onUserClick={onUserClick} />
        ))}
      </div>
      <div className="displayVideo">
        {props.data.length === 0 ? <div className="disconnect"><h3 className="disconnect__heading">Connect to the internet</h3><p className="disconnect__msg">You are offline. Check your internet connection.</p></div>:props.data.map((d) => (
          <ShowVideo title={d.title} type={d.type} url={d.video_url} uploadedBy = {d.uploadedBy} />
        ))}
        {console.log(props.data)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    data: selectData(
      state.VideoData,
      state.FilterSearch.text,
      state.FilterSearch.category
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => {
      dispatch(fetchData(data));
    },
    selectByAll: () => {
      dispatch(selectByAll());
    },
    selectByComedy: () => {
      dispatch(selectByComedy());
    },
    selectByFitness: () => {
      dispatch(selectByFitness());
    },
    selectBySports: () => {
      dispatch(selectBySports());
    },
    selectByTechnology: () => {
      dispatch(selectByTechnology());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
