import autobind from 'autobind-decorator';

import React from 'react';
import PropTypes from 'prop-types';
import Fetch from './Fetch.jsx';

export default
class Auth extends React.Component {
  static childContextTypes = { auth: PropTypes.object }
  static contextTypes = { router: PropTypes.object }

  constructor(props) {
    super(props);

    const token = localStorage.getItem('access_token');

    this.listeners = [];
    this.state = {
      token: token,
      user: { role: 'none', id: -1 }
    };
  }

  getChildContext() {
    return {
      auth: {
        id: this.state.user.id,
        token: this.state.token,
        role: this.state.role,
        login: this.login,
        logout: this.logout
      }
    };
  }

  @autobind
  register(item) {
    this.listeners.push(item);
  }

  @autobind
  login(token) {
    localStorage.setItem('access_token', token);
    this.setState({ token: token });
  }

  @autobind
  logout() {
    localStorage.removeItem('access_token');
    this.setState({token: null});

    const router = this.context.router;
    router.history.push('/');

    const onLogout = this.props.onLogout;
    if (onLogout != null) {
      onLogout();
    }
  }

  @autobind
  onComplete(data) {
    const user = data.defaulData.user;

    this.setState({
      user: user,
      role: user.type.slug
    });

    this.props.onComplete(data);
  }

  render() {
    const token = this.state.token;

    if (token == null || token.length == 0) {
      return this.props.onLogin;
    }

    return (
      <Fetch url="/user/profile" force="true" onComplete={this.onComplete}>
        {this.state.user != null && this.props.children}
      </Fetch>);
  }
}
