import React, { Component } from 'react';
import location from './location.svg';
import mail from './mail.svg';
import link from './link.svg';
import './UsersContainer.css';

class UsersContainer extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();

    this.usersArr = [];
    this.state = {
      totalCount: null,
      users: [],
      inputValue: "Vinnytsia",
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(event) {
    this.state.users.length = 0;
    this.fetchUsers();
    event.preventDefault();
  }

  async fetchUsers() {
    const rawUsers = await fetch(`https://api.github.com/search/users?q=location:${this.state.inputValue}&sort=score&order=desc`);
    const users = await rawUsers.json();
    this.setState({totalCount: users.total_count <= 10 ? users.total_count : 10});
    
    for (let i = 0; i < (this.state.totalCount); i++) {
      const rawUser = await fetch(`https://api.github.com/users/${users.items[i].login}`);
      const user = await rawUser.json();
      this.usersArr.push(user);
    }
     this.setState({users: this.usersArr});
   }

  render() {
    return (
      <div>
      <div className="searchForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            location:
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="usersContainer">{this.state.users.map((el) => 
        <div key={el.id} className="userCard">
          <div className="avatar">
            <img src={el.avatar_url} alt={el.login} />
          </div>
          <div className="userData">
            <a href={el.html_url} className="gitPage" target="_blank">{el.login}</a>
            <p className="name">{el.name}</p>
            <p className="bio">{el.bio}</p>
            <div className="contacts">
            <div>
              
              <div className="locationLogo">
                <img src={location} alt="location logo"/>
              </div>
              <span className="locationText">{el.location}</span>
            </div>
            <div>
              
              <div className="mailLogo">
                <img src={mail} alt="mail logo"/>
              </div>
              <span className="mailText">{el.mail ? <a href={`mailto:${el.email}`}>e-Mail</a> : "not avialable"}</span>
            </div>
            <div>
              
              <div className="blogLogo">
                <img src={link} alt="blog logo"/>
              </div>
              <span className="blogText">{el.blog ? <a href={el.blog} target="_blank">Blog</a> : "not avialable"}</span>
            </div>
            </div>
          </div>
          </div>)}
        </div>
      </div>
    );
  }
}

export default UsersContainer;
