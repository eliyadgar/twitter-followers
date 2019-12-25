import React from 'react';
import logo from './logo.svg';
import Bar from './components/Bar'
import './App.css';
import debounce from 'lodash/debounce'
import {getFollowers} from './twitterAPI'


class App extends React.Component {

  handleSearch = debounce(async (value) => {
    if (value.length > 3) {
        const followers = await getFollowers(value)
        console.log('@@@@@', followers);
        
    }
  }, 1000)
  

  render() {
    return (
      <div className="App">
        <Bar handleSearch={this.handleSearch}/>
      </div>
    );
  }
}

export default App;
