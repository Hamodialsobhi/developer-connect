import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      errors: {

      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    
    const payload = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    }

    axios.post('/api/users/register', payload).then(res => {
      console.log('Res', res);
    }).catch(err => {
      console.log('Error', err.response.data.errors);
      this.setState({ errors: err.response.data.errors });
    });
  }

  // async submitApI(url, payload) {
  //   await new Promise((resolve, reject) => {
  //     axios.post(url, payload).then(res => {
  //       console.log('Res', res);
  //       resolve(res);
  //     }).catch(err => {
  //       console.log('Error', err.response.data.errors);
  //       resolve();
  //     });
  //   });
  // }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate  onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text" className={classnames('form-control form-control-lg', { 'is-invalid': errors.name })} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange}/>
                  { errors.name && (<div className="invalid-feedback">{errors.name}</div>) }
                </div>
                <div className="form-group">
                  <input type="email" className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange}/>
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  { errors.email && (<div className="invalid-feedback">{errors.email}</div>) }
                </div>
                <div className="form-group">
                  <input type="text" className={classnames('form-control form-control-lg', { 'is-invalid': errors.phone })} placeholder="Phone number" name="phone" value={this.state.phone} onChange={this.onChange}/>
                  { errors.phone && (<div className="invalid-feedback">{errors.phone}</div>) }
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })} placeholder="Password" value={this.state.password} onChange={this.onChange} name="password"/>
                  { errors.password && (<div className="invalid-feedback">{errors.password}</div>) }
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg', { 'is-invalid': errors.confirm_password })} placeholder="Confirm Password" name="confirm_password" value={this.state.password2} onChange={this.onChange}/>
                  { errors.confirm_password && (<div className="invalid-feedback">{errors.confirm_password}</div>) }
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
