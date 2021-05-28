import React from 'react';
import axios from 'axios';
import loginImg from '../login.svg';

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password: '',
      email:'',
      role : ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleFormSubmit = event => {
    event.preventDefault();

    const endpoint = 'http://localhost:8083/register';

    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;
    const role = this.state.role;
    console.log(this.state)
    const user_object = {
      username: username,
      password: password ,
      email : email
    };

    axios.post(endpoint, user_object).then(res => {
      localStorage.setItem('authorization', res.data.token);
      window.location.replace('http://localhost:3000/');
    }, error => {
      alert('Authentication failure' + error);
    });
  };
  handleDashboard() {
    axios.get('http://localhost:8080/login').then(res => {
      if (res.data ===' success') {
        this.props.history.push('/login');
      } else {
        alert('Authentication failure');
      }
    });
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <form onSubmit={this.handleFormSubmit}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input  value={this.state.username} type="text" name="username" placeholder="username" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="role">role</label>
              <select  name="role" value={this.state.value} onChange={this.handleChange} >
                <option value="Recruiter"> Recruiter</option>
                <option value="job seeker"> Job seeker</option>
              </select>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
        </form>
      </div>
    );
  }
}
