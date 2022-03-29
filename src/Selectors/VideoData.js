import { app } from '../components/Firebase';
import { getDatabase, ref as DatabaseRef, onValue } from "firebase/database";

export default (videoData, text, category) => {
    return videoData.filter((data) => {
  
      const categoryMatch = category !== 'All' ? data.type.toLowerCase() === category.toLowerCase(): true;
      const textMatch = data.title !== undefined ? data.title.toLowerCase().includes(text.toLowerCase()): true;
      
      return categoryMatch && textMatch;
    })
}