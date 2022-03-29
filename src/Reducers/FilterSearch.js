import { setTextFilter } from "../Action/FilterSearch";

const filtersReducerDefaultState = {
    text: '',
    category: 'All'
}

export default (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
            case 'SELECT_BY_ALL':
                return {
                    ...state,
                    category: 'All'
                }
                case 'SELECT_BY_COMEDY':
            console.log("selectByComedy is called")
            return {
                ...state,
                category: 'Comedy'
            }
            case 'SELECT_BY_SPORTS':
            return {
                ...state,
                category: 'Sports'
            }
            case 'SELECT_BY_TECHNOLOGY':
            return {
                ...state,
                category: 'Technology'
            }
            case 'SELECT_BY_FITNESS':
            return {
                ...state,
                category: 'Fitness'
            }   
         default:
             return state;   
    }
}

