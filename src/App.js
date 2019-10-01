import React, { Component } from 'react';
import logo from './logo1.svg';
import UsersContainer from './UsersContainer.js'
import './UsersContainer.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
  	return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="logo"/> 
          </div>
          <h1>GitHub Top 10 Users</h1>
        </div>
        <div className="main">
          {this.state.hasError ?
            <div>
              <h2>Вибачте, сталася помилка!</h2> 
              <button onClick={() => console.log('Повідомлення про помилку.')}>Повідомити про помилку</button>
            </div>
            :
            <UsersContainer />
          }
        </div>
        <footer>
          <p>2019 by @OlegSemko <i>betta</i></p>
        </footer>
      </div>
    );
  }
}

export default App;
