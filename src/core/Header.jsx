import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default
class Header extends React.Component {
  static contextTypes = {
    auth: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { role: '' };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ role: nextProps.profile.type.slug, });
  }

  @autobind
  onLogout() {
    this.context.auth.logout();
  }

  render() {
    return (
      <header className="header">
        <div className="container-fluid header__inner">
          <div className="row">
            <div className={classNames("header__call-btn", {'hidden': this.state.role != 'tenant'})}>
              <a href="#id-ask-question" className="btn btn-default btn-red btn-call modal-show"><span><i className="ar-cion ar-icon-phone"></i></span>Задать вопрос</a>
            </div>

            <div className="header__login-panel">
              <div className="header__login-panel-notify"><Link to="/notifications" className="btn-notify"><span className="btn-notify__icon"><i className="ar-icon ar-icon-bell"></i></span><span className="btn-notify__counter">{this.props.profile.notificationsCount}</span></Link></div>
              <div className="header__login-panel-user"><Link to="/profile" className="btn-user"><span className="btn-user__photo-wrap"><img src="img/user-login-unknow.png" alt="Petya"/></span><span className="btn-user__name">{trim(this.props.profile.profile.fio || '', 11)}</span></Link></div>
              <div className="header__login-panel-settings"><Link to="/profile" className="btn-settings"><span className="btn-settings__icon"><i className="ar-icon ar-icon-cog"></i></span></Link></div>
              <div className="header__login-panel-out"><a href="#" className="btn-out" onClick={this.onLogout}><span className="btn-out__icon"><i className="ar-icon ar-icon-switch"></i></span><span className="btn-out__text">Выйти</span></a></div>
            </div>
          </div>
        </div>
      </header>);
  }
};
