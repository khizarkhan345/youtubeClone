export const setTextFilter = (text='') => ({
   type: 'SET_TEXT_FILTER',
   text
})

export const selectByAll = () => {
    return (dispatch) => {
      //console.log("addData is called")
      dispatch({type: 'SELECT_BY_ALL'})
    }
  }


export const selectByComedy =() => {
    return (dispatch) => {
      //console.log("selectByComedy is called")
      dispatch({type: 'SELECT_BY_COMEDY'})
    }
  }

export const selectBySports = () => {
    return (dispatch) => {
      //console.log("selectBySports is called")
      dispatch({type: 'SELECT_BY_SPORTS'})
    }
  }

export const selectByFitness = () => {
    return (dispatch) => {
      //console.log("selectByFitness is called")
      dispatch({type: 'SELECT_BY_FITNESS'})
    }
  }

export const selectByTechnology = () => {
    return (dispatch) => {
      //console.log("selectByTech is called")
      dispatch({type: 'SELECT_BY_TECHNOLOGY'})
    }
}