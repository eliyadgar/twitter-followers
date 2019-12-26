import { SORT_LIST, SEARCH_TERM, ADD_FOLLOWERS, UPDATE_FOLLOWERS } from "../action-types";


const initialState = {
    showAllFlag: false,
    searchTerm: '',
    followers: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SORT_LIST:
            console.log('SORT_LIST', action.payload)
            const {followers, searchTerm} = state  
            return {
                ...state,
                followers: {
                    ...followers,
                    [searchTerm]: {
                        ...followers[searchTerm],
                        fetchedFollowers: action.sortFollowers
                    }
                }
                
            }
        case SEARCH_TERM:
            console.log('SEARCH_TERM', action.searchTerm)
            return {...state, searchTerm: action.searchTerm}   
        case ADD_FOLLOWERS:
            console.log('ADD_FOLLOWERS', action.payload)
            return {
                searchTerm: action.payload.searchTerm,
                showAllFlag: action.payload.showAllFlag,
                followers : 
                { ...state.followers, 
                [action.payload.searchTerm]: 
                  { lastUpdatedDate: action.payload.lastUpdatedDate,
                    fetchedFollowers: action.payload.fetchedFollowers,
                    ...action.payload.accountDetails,
                  }
                } 
              }   
        case UPDATE_FOLLOWERS:
            console.log('UPDATE_FOLLOWERS', action.payload)

            return {
                ...state,
                followers : 
                { ...state.followers, 
                [state.searchTerm]: 
                { ...state.followers[state.searchTerm],
                    lastUpdatedDate: action.payload.lastUpdatedDate,
                    fetchedFollowers: action.payload.fetchedFollowers
          }
        } 
            }
        default:
          return state;
    }
}

export default rootReducer
