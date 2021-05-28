import React from 'react';
import axios from 'axios';
import { createHashHistory } from 'history';
import loginImg from '../login.svg';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:8083/login';
    const username = this.state.username;
    const password = this.state.password;
    console.log(this.state);
    const user_object = {
      username: username,
      password: password
    };
    axios.post(endpoint, user_object).then(res => {
          localStorage.setItem("authorization", res.data.token);
          window.location.replace('http://localhost:3000/app/dashboard');
      alert('Authentication success');
    },
    error => {
      alert('Authentication failure' + error);
    });
  };

  handleDashboard() {
    this.axios.get('http://localhost:8080/dashboard').then(res => {
      if (res.data === 'success') {
        const history = createHashHistory();
        history.push('/add');
      } else {
        alert('Authentication failure');
      }
    });
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <form onSubmit={this.handleFormSubmit}>
          <div className="header">Login</div>
          <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
            <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input value={this.state.username} type="text" name="username" placeholder="username" onChange={this.handleChange} />
            </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input value={this.state.password} type="password" name="password" placeholder="password" onChange={this.handleChange} />
              </div>
            </div>
          </div>
          <div className="footer">
            <button type="submit" className="btn">Login </button>
          </div>
        </form>
      </div>
    );
  }
}
