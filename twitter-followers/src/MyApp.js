// import { mapStateToProps, mapDispatchToProps } from 'redux'
import { connect } from "react-redux";
import {
  sortFollowers, 
  searchTermChanged, 
  addFollowersList, 
	updateFollowersList} from './actions' 
	
import App from './App'

const mapStateToProps = (state) => {
  return {...state}
}

const mapDispatchToProps = dispatch => {
  return {
		sortFollowers: sortedList => dispatch(sortFollowers(sortedList)), 
		searchTermChanged: searchTerm => dispatch(searchTermChanged(searchTerm)), 
		addFollowersList: payload => dispatch(addFollowersList(payload)),
		updateFollowersList: payload => dispatch(updateFollowersList(payload))}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)