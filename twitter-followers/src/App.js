import React from 'react';
import Bar from './components/Bar'
import FollowersList from './components/FollowersList'
import './App.css';
import debounce from 'lodash/debounce'
import {getFollowers, getAccount} from './twitterAPI'
import getTime from 'date-fns/getTime'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSort = (key) => {
    console.log('handleSort');
    
    const {followers, searchTerm} = this.props
    const sortedFollowersList = followers[searchTerm].fetchedFollowers.sort((a, b) => a[key].localeCompare(b[key]))
    this.props.sortFollowers(sortedFollowersList)
  }
  
  handleShowAll = async () => {
    console.log('handleShowAll');
    const {followers, searchTerm} = this.props
    const fetchedFollowers = await getFollowers(searchTerm, followers[searchTerm].followers_count)
    const lastUpdatedDate = getTime(new Date())
    this.props.updateFollowersList({lastUpdatedDate, fetchedFollowers})
  }
  
  handleSearch = debounce(async (value) => {
    console.log('handleSearch', value);
    if (value.length > 3) {
      if (this.props.followers[value] 
        && compareTimes(this.props.followers[value].lastUpdatedDate) < (1000 * 15)  ) {
          this.props.searchTermChanged({searchTerm: value}) 
      } else {
        const accountDetails = await getAccount(value)
        const fetchedFollowers = await getFollowers(value)
        const showAllFlag = accountDetails.followers_count > 30
        const lastUpdatedDate = getTime(new Date())
        console.log({searchTerm: value, showAllFlag, lastUpdatedDate, fetchedFollowers, accountDetails});
        
        this.props.addFollowersList({searchTerm: value, showAllFlag, lastUpdatedDate, fetchedFollowers, accountDetails})
      } 
    } else {
      this.props.searchTermChanged(value) 
    }
  }, 1000)
  

  render() {
    console.log("######props", this.props)
    const {searchTerm, followers, showAllFlag} = this.props
    const emptyFollowersList = searchTerm.length <= 3;
    const noResults = followers[searchTerm] && followers[searchTerm].fetchedFollowers === undefined;
    console.log({followers, showAllFlag})
    return (
      <div className="App">
        <Bar handleSearch={this.handleSearch} handleSort={this.handleSort} showAll={showAllFlag} handleShowAll={this.handleShowAll} disableSortButtons={searchTerm.length < 3}/>
        {emptyFollowersList &&
          <h3>Please search for account</h3> 
        }
        {noResults &&
          <h3>No results were found</h3> 
        }
        {searchTerm.length > 3 
        && <FollowersList followers={followers[searchTerm] && followers[searchTerm].fetchedFollowers} />}
      </div>
    );
  }
}


const compareTimes = (lastUpdatedDate) => {
  const currentTime = new Date()
  return (getTime(currentTime) - lastUpdatedDate)
}

export default App;
