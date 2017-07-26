import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';
import PropTypes from "prop-types";

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Store, Fetch, Auth } from '../db';
import { OnSuccess, OnError } from '../modals';
import NavBar from './NavBar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Layout from './Layout.jsx';

import {
  Dashboard, Orders, EditOrder, Documents,
  Sales, Materials, Contacts, EditContact,
  Promotion, Profile, Notifications, Chat,
  Question, Login, Marketing, Bills, Mailer
} from '../pages';

export default
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: { pending: true },
      profile: {
        notificationsCount: 0,
        profile: {fio: 'Loading...'},
        type: {slug: ''}
      }, directory: {
        stores: [],
        departments: [], subjects: [],
        forms: [], currencies: [],
        tenants: []
      }
    };
  }

  @autobind
  onComplete(data) {
    this.setState({
      mode: { pending: false },
      profile: data.defaulData.user,
      directory: {
        stores: data.defaulData.directory.sec,
        subjects: data.defaulData.directory.bid_subject,
        departments:  data.defaulData.directory.departament,
        forms: data.defaulData.directory.bid_forms,
        currencies: data.defaulData.directory.currency,
        tenants: data.defaulData.directory.tenants
      }
    });

    if (this.toggle == null) {
      this.toggle = new TogglePanel();
      this.toggle.mount();
    }
  }

  @autobind
  onLogout() {
    this.setState({
      mode: { pending: true },
      profile: {
        notificationsCount: 0,
        profile: {fio: 'Loading...'},
        type: {slug: ''}
      }, directory: {
        stores: [],
        departments: [], subjects: [],
        forms: [], currencies: [],
        tenants: []
      }
    });

    if (this.toggle != null) {
      this.toggle.unmount();
      this.toggle = null;
    }
  }

  render() {
    return (
      <div className={classNames({wrapper: true, wrapper_login: this.state.mode.pending })}>
        <Router>
          <Store>
            <Auth onComplete={this.onComplete} onLogin={<Login />} onLogout={this.onLogout}>
              <Layout>
                <div>
                  <NavBar profile={this.state.profile} directory={this.state.directory} />
                  <Header profile={this.state.profile} />

                  <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/index" component={Dashboard} />
                    <Route path="/contacts" component={Contacts} />
                    <Route path="/contact-add" component={EditContact} />
                    <Route path="/contact-details/:id" component={EditContact} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/notifications" component={Notifications} />

                    {this.state.profile.type.slug != 'accountant' &&
                      [<Route path="/orders" component={Orders} key={0} />,
                        <Route path="/order-details/:id" component={Chat} key={1} />,
                        <Route path="/sales" component={Sales} key={2} />,
                        <Route path="/materials" component={Materials} key={3} />]
                    }

                    {this.state.profile.type.slug === 'marketing' &&
                      <Route path="/marketing" component={Marketing} />
                    }

                    {this.state.profile.type.slug != 'tenant' &&
                      this.state.profile.type.slug != 'accountant' &&

                        [<Route path="/bills" component={Bills} key={0} />,
                        <Route path="/send-notification" component={Mailer} key={1} />]
                    }

                    {this.state.profile.type.slug === 'tenant' &&
                      [<Route path="/documents" component={Documents} key={0} />,
                        <Route path="/promotion" component={Promotion} key={1} />]
                    }

                  </Switch>

                  <EditOrder directory={this.state.directory} />
                  <Question />

                  <OnSuccess />
                  <OnError />

                  <div className="background-mask"></div>
                  <div id="loader"></div>
                  <Footer />
                </div>
              </Layout>
            </Auth>
          </Store>
        </Router>
      </div>);
  }
};
