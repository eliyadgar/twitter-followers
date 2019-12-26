import React from 'react';
import logo from './logo.svg';
import Bar from './components/Bar'
import FollowersList from './components/FollowersList'
import './App.css';
import debounce from 'lodash/debounce'
import {getFollowers} from './twitterAPI'
import getTime from 'date-fns/getTime'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSearch = debounce(async (value) => {
    if (value.length > 3) {
      if (this.state.followers[value] 
        && compareTimes(this.state.followers[value].lastUpdatedDate) < (1000 * 15)  ) {
          this.setState({searchTerm: value}) 
      } else {
        const fetchedFollowers = await getFollowers(value)
        this.setState(
          {searchTerm: value,
            followers : 
            { ...this.state.followers, 
            [value]: 
              { lastUpdatedDate: getTime(new Date()),
                fetchedFollowers
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
    const {searchTerm, followers} = this.state
    const emptyFollowersList = searchTerm.length <= 3;
    const noResults = followers[searchTerm] && followers[searchTerm].fetchedFollowers === undefined;
    console.log({followers})
    return (
      <div className="App">
        <Bar handleSearch={this.handleSearch} handleSort={this.handleSort}/>
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
