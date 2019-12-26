import { SORT_LIST, SEARCH_TERM, ADD_FOLLOWERS, UPDATE_FOLLOWERS } from "../action-types";

export const sortFollowers = (sortFollowers) => {
  return {type: SORT_LIST, sortFollowers}
}

export const searchTermChanged = (searchTerm) => {
  return {type: SEARCH_TERM, searchTerm}
}

export const addFollowersList = (payload) => {
  return {type: ADD_FOLLOWERS, payload }
}

export const updateFollowersList = (payload) => {
  return {type: UPDATE_FOLLOWERS, payload }
}