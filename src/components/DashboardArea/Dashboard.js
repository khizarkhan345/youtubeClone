import React, { Component } from "react";
import { useState, useEffect } from 'react';
import ShowVideo from "../ShowVideoArea/ShowVideo";
import ShowCategory from '../ShowCategoryArea/ShowCategoryArea';
import { connect } from 'react-redux';
import './Dashboard.css';
import app  from '../Firebase';
import { getDatabase, ref as DatabaseRef, onValue } from "firebase/database";
import {selectByAll, selectByComedy, selectBySports, selectByFitness, selectByTechnology} from '../../Action/FilterSearch';
import {fetchData} from '../../Action/videoData';
import selectData from '../../Selectors/VideoData';


const Dashboard = (props) => {
  var [videoData, setVideoData] = useState([]);
   
  //const [textFilter, setFilter] = useState(text);
  const type = ["All", "Comedy", "Sports", "Fitness", "Technology"];
   var real_data = [];
  // useFirebaseConnect('Videos')
  // // Connect to redux state using selector hook
  // const todos = useSelector(state => state.VideoData);
  // console.log(todos);
  //  setVideoData(videoData.filter((data) => {
  //   return data.title.toLowerCase().includes(text.toLowerCase()); 
  //    }))

  const retrieveData = async () => {
    const db = getDatabase(app);
    const starCountRef = DatabaseRef(db, 'Videos/');
    await onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
       real_data = Object.values(data);
      setVideoData(videoData => [...videoData, ...real_data]);
      console.log("Real Data", real_data);
      console.log(videoData)
      // if(props.videoData.length !== 0){
      //   props.videoData.forEach((data) => {
         // real_data.forEach((data1) => {
              props.fetchData(real_data);
           // })
      //     }) 
      //   })

      // }else{
        
      // }
      
      
      // real_data.forEach((data) => {
      //   props.fetchData(data);
      // })
      
    })
   
  }
  

  const onUserClick = (type) => {
    const btn = document.getElementById('category_button');
    
    if(type === 'All'){
      props.selectByAll();
      // btn.style.backgroundColor = 'black';
      // btn.style.color = 'white';
    }
    else if (type === 'Comedy'){
      props.selectByComedy();
      btn.style.backgroundColor = 'black';
      btn.style.color = 'white';
    
    }else if(type === 'Sports'){
      props.selectBySports();
      btn.style.backgroundColor = 'black';
      btn.style.color = 'white';
  
    }else if(type === 'Fitness'){ 
      props.selectByFitness();
      btn.style.backgroundColor = 'black';
      btn.style.color = 'white';
    
    }else if(type === 'Technology'){
      props.selectByTechnology();
      btn.style.backgroundColor = 'black';
      btn.style.color = 'white';
    
    }
     
    
  }

  
  useEffect(() => {
    retrieveData();
  }, []);

 
  return (
    <div>
    
      <div className="displayCategory">
        {
          type.map((data) => (

            <ShowCategory
              type={data}
              onUserClick={onUserClick}
            />
          ))
        }
      </div>
      <div className="displayVideo">
         {
           props.data.map((d) => (
            <ShowVideo
              title={d.title}
              type={d.type}
              url={d.video_url}
            />
          ))
        }
        {
          console.log(props.data)
        }
      </div>
    </div>
  )


}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    //videoData: state.VideoData,
    data: selectData(state.VideoData, state.FilterSearch.text, state.FilterSearch.category)
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data) => {dispatch(fetchData(data))},
    selectByAll: () => {dispatch(selectByAll())},
    selectByComedy: () => {dispatch(selectByComedy())},
    selectByFitness: () => {dispatch(selectByFitness())},
    selectBySports: () => {dispatch(selectBySports())},
    selectByTechnology: () => {dispatch(selectByTechnology())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

