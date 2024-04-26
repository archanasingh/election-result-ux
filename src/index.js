import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedState: '',
        winners: {},
      };
  
      this.states = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
        "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
        "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
        "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
        "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
        "Wisconsin", "Wyoming", "District of Columbia", "American Samoa", "Guam", 
        "Northern Mariana Islands", "Puerto Rico", "United States Minor Outlying Islands", 
        "Virgin Islands, U.S."
      ];
    }
  
    handleChange = (event) => {
      this.setState({ selectedState: event.target.value });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
  
      // Fetch the winners for each state
      axios.get(`http://localhost:8000/winners`)
        .then(response => {
          const allWinners = response.data;
          const filteredStateWinners = allWinners[this.state.selectedState] || {};
          console.log("****************", allWinners['Overall'])
          const filteredOverallWinners = allWinners['Overall'] || {};
            
          this.setState({ winners: allWinners, filteredStateWinners, filteredOverallWinners });
        })
        .catch(error => {
          console.error('Error fetching winners:', error);
        });
    };

    renderWinners = (winners) => {
        return (
          <div>
            {Object.keys(winners).map((party, index) => (
              <div key={index}>
                <h3>{party}</h3>
                <ul>
                  {winners[party].map((candidate, index) => (
                    <li key={index}>
                      {candidate}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      };
  
    render() {
      const { selectedState, filteredStateWinners, filteredOverallWinners } = this.state;
  
      return (
        <div className="App">
          <h1>Select a US State</h1>
          
          <form onSubmit={this.handleSubmit}>
            <select value={selectedState} onChange={this.handleChange}>
              <option value="">Select a state</option>
              {this.states.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            
            <button type="submit">Show Winners</button>
          </form>
  
          <h2>Winners for {selectedState}</h2>
          {filteredStateWinners != null && filteredOverallWinners != null
            ? this.renderWinners(filteredStateWinners, filteredOverallWinners)
            : ""
          }

         <h2>Overall Winners</h2>
          {filteredOverallWinners != null
            ? this.renderWinners(filteredOverallWinners)
            : ""
          }
        </div>
      );
    }
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
