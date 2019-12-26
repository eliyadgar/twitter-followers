import React from 'react';
import logo from './logo.svg';
import Bar from './components/Bar'
import FollowersList from './components/FollowersList'
import './App.css';
import debounce from 'lodash/debounce'
import {getFollowers, getAccount} from './twitterAPI'
import getTime from 'date-fns/getTime'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllFlag: false,
      searchTerm: '',
      followers: {}
    };
  }

  handleSort = (key) => {
    const {followers, searchTerm} = this.state
    console.log("handling sort...")
    this.setState({followers: {
      ...followers,
      [searchTerm]: {
        ...followers[searchTerm],
        fetchedFollowers: followers[searchTerm].fetchedFollowers.sort((a, b) => a[key].localeCompare(b[key]))
      }
    }})
  }

  handleShowAll = async () => {
    const {followers, searchTerm} = this.state
    const fetchedFollowers = await getFollowers(searchTerm, followers[searchTerm].followers_count)
    this.setState(
      {
        followers : 
        { ...this.state.followers, 
        [searchTerm]: 
          { ...followers[searchTerm],
            lastUpdatedDate: getTime(new Date()),
            fetchedFollowers,
          }
        } 
      }
    )
  }

  handleSearch = debounce(async (value) => {
    if (value.length > 3) {
      if (this.state.followers[value] 
        && compareTimes(this.state.followers[value].lastUpdatedDate) < (1000 * 15)  ) {
          this.setState({searchTerm: value}) 
      } else {
        const accountDetails = await getAccount(value)
        console.log(accountDetails);
        
        const fetchedFollowers = await getFollowers(value)
        this.setState(
          {searchTerm: value,
            showAllFlag: accountDetails.followers_count > 30,
            followers : 
            { ...this.state.followers, 
            [value]: 
              { lastUpdatedDate: getTime(new Date()),
                fetchedFollowers,
                ...accountDetails,
              }
            } 
          }
        )
      } 
    } else {
      this.setState({searchTerm: value}) 
    }
  }, 1000)
  

  render() {
    const {searchTerm, followers, showAllFlag} = this.state
    const emptyFollowersList = searchTerm.length <= 3;
    const noResults = followers[searchTerm] && followers[searchTerm].fetchedFollowers === undefined;
    console.log({followers, showAllFlag})
    return (
      <div className="App">
        <Bar handleSearch={this.handleSearch} handleSort={this.handleSort} showAll={showAllFlag} handleShowAll={this.handleShowAll}/>
        {emptyFollowersList &&
          <div>Please search for account</div> 
        }
        {noResults &&
          <div>No results were found</div> 
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
