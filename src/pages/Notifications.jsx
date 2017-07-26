import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import React from 'react';
import { Fetch, Commit } from '../db';
import { ItemPicker, Paginate } from '../base';
import { Link } from 'react-router-dom';

export default
class Notifications extends React.Component {
  static contextTypes = {
    auth: PropTypes.object,
    modal: PropTypes.object,
    axios: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      predicate: {},
      pageCount: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    new NotifyList().mount();
  }

  @autobind
  onPageChange(e) {
    this.setState({
      predicate: { page: e.selected + 1 }
    });
  }

  @autobind
  onComplete(data) {
    this.setState({
      contents: data.notifications,
      pageCount: data.notificationsCount
    });
  }

  @autobind
  onDelete(e) {
    this.refs.request.forceUpdate();
    this.forceUpdate();
  }

  render() {
    return (
      <Fetch ref="request" url="/notifications" params={this.state.predicate} onComplete={this.onComplete}>
      <section className="notifications">
        <div className="container-fluid">
          <div className="row">
            <div className="notifications__wrap">
              {this.context.auth.role != 'tenant' &&
                <div className="create-notification-row">
                  <Link to="/send-notification" className="btn btn-blue btn-create-notification">Создать уведомление</Link>
                </div>
              }

              <ul className="notify-list">
                {
                  this.state.contents.map((item, i) => {
                    return (
                      <li className="notify-list__item" key={i}>
                        <span className="notify-list__item-open-btn"><i className="ar-icon ar-icon-arrow-down3"></i></span>

                        <Commit url="notifications/delete" params={{'msg_id': item.id}} onComplete={this.onDelete} custom={true}>
                          <span className="notify-list__item-del-btn"><i className="ar-icon ar-icon-bin"></i></span>
                        </Commit>

                        <span className="notify-list__item-title">{item.header}</span>
                        <div className="notify-list__item-content">
                          <p>{item.text}</p>
                        </div>
                      </li>)
                  })
                }
              </ul>
            </div>
            <div className="section-pagination-holder">
              <Paginate pageCount={this.state.pageCount} onPageChange={this.onPageChange} />
            </div>
          </div>
        </div>
      </section>
    </Fetch>);
  }
};
