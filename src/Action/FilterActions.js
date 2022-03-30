export const setTextFilter = (text='') => ({
   type: 'SET_TEXT_FILTER',
   text
})

export const selectByAll = () => {
    return (dispatch) => {
      dispatch({type: 'SELECT_BY_ALL'})
    }
  }


export const selectByComedy =() => {
    return (dispatch) => {
      dispatch({type: 'SELECT_BY_COMEDY'})
    }
  }

export const selectBySports = () => {
    return (dispatch) => {
      dispatch({type: 'SELECT_BY_SPORTS'})
    }
  }

export const selectByFitness = () => {
    return (dispatch) => {
      dispatch({type: 'SELECT_BY_FITNESS'})
    }
  }

export const selectByTechnology = () => {
    return (dispatch) => {
      dispatch({type: 'SELECT_BY_TECHNOLOGY'})
    }
}