import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import React from 'react';
import { Commit } from '../db';

import isValid from '../utils/Validate.js';


export default
class Login extends React.Component {
  static contextTypes = {
    axios: PropTypes.func,
    auth: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.request = {};
    this.state = { isValid: {} };
  }

  @autobind
  onChange(e) {
    const target = e.target;
    const value = target.value;
    const tag = target.getAttribute('data-tag');

    this.request[tag] = value;
  }

  @autobind
  onValidate() {
    return true;
  }

  @autobind
  onCommit(e) {
    e.preventDefault();

    if (!this.onValidate()) {
      return;
    }

    const auth = this.context.auth;
    const axios = this.context.axios;
    const user = this.request.user;
    const password = this.request.password;
    const url = '/user/sign-in?user=' + user +
                    '&password=' + password;

    axios.get(url).then((response) => {
      auth.login(response.data.token);
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <div>
        <section className="sec-logo">
          <div className="container">
            <div className="row">
              <div className="sec-logo__logo"><a href="/" className="logo logo_login"><img src="/img/logo.svg" alt="" className="logo__img"/></a></div>
            </div>
          </div>
        </section>
        <section className="b-login">
          <div className="container">
            <div className="row">
              <div className="b-login__text">
                <p>Добро пожаловать на сайт.<br/>Чтобы продолжить дальше войдите в систему.</p>
              </div>
            </div>
            <div className="row">
              <div className="b-login__form">
                <form action="#" className="form-login">
                  <h2 className="form-login__title">Вход</h2>
                  <div className="form-login__group input-group">
                    <span id="basic-addon1" className="input-group-addon"><i className="ar-icon ar-icon-user"></i></span>
                    <input type="text" placeholder="Username" aria-describedby="basic-addon1"
                           className="form-control" data-tag="user" onChange={this.onChange} />
                  </div>
                  <div className="form-login__group input-group">
                    <span id="basic-addon2" className="input-group-addon"><i className="ar-icon ar-icon-key"></i></span>
                    <input type="password" placeholder="Password" aria-describedby="basic-addon2"
                           className="form-control" data-tag="password" onChange={this.onChange} />
                  </div>
                  <div className="form-login__button">
                    <button type="submit" className="btn btn-default btn-green" onClick={this.onCommit}>Войти</button>
                  </div>
                  <a href="#" className="form-login__reg-link">Зарегистрироваться</a>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>);
  }
}
