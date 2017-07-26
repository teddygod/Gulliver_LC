import autobind from 'autobind-decorator';

import React from 'react';
import PropTypes from 'prop-types';
import { Fetch, Commit } from '../db';
import { ItemPicker } from '../base';
import { Link } from 'react-router-dom';


export default
class Dashboard extends React.Component {
  static contextTypes = {
    auth: PropTypes.object
  }

  render() {
    return (
      <div>
        {this.context.auth.role === 'tenant' && <ClientDashboard /> }
        {this.context.auth.role === 'accountant' && <MiniDashboard /> }
        {(this.context.auth.role === 'lease' || this.context.auth.role === 'maintenance'
              || this.context.auth.role === 'marketing') && <EmployeeDashboard /> }
      </div>);
  }
}

class ClientDashboard extends React.Component {
  static contextTypes = { router: PropTypes.object }

  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      orders: [], documents: {},
      introduction: {title: '', text: '', photo: ''},
      selection: {material: {}, events: {}}
    };
  }

  getMaterials() { return this.state.selection.material.materials || []; }
  getEvent() { return this.state.selection.events.file || []; }

  componentDidUpdate(prevProps, prevState) {
    if (this.notifier != null) {
      this.notifier.unmount();
    }

    this.notifier = new NotifyList();
    this.notifier.mount();
  }

  @autobind
  onStoreChange(index, tag, store) {
    var source = this.state.selection;
    source[tag] = store;

    this.setState({ selection: source });
  }

  @autobind
  onComplete(data) {
    this.setState({
      stores: data.directory.sec,
      notifications: data.notifications,
      orders: data.bid,
      documents: {__html: data.documents_text[0].value},
      materials: data.material,
      introduction: {
        title: data.introduction[0].value,
        text: {__html: data.introduction[1].value},
        photo: 'http://portal-api.sproduccion.com/' + data.introduction[2].value
      },
      selection: { material: data.material[0] }
    });
  }

  @autobind
  onItemClick(e) {
    const router = this.context.router.history;
    const id = e.target.parentNode.getAttribute('data-id');

    router.push('/order-details/' + id);
  }

  @autobind
  onDeleteNotification() {
    this.refs.request.forceUpdate();
    this.forceUpdate();
  }

  render() {
    return (
      <Fetch ref="request" url="/dashboard" onComplete={this.onComplete}>
      <div>
        <section className="notifications">
          <div className="container-fluid">
            <div className="row">
              <div className="notifications__wrap">
                <ul className="notify-list">
                  {
                    this.state.notifications.map((item, i) => {
                      return (
                        <li key={i} className="notify-list__item">
                          <span className="notify-list__item-open-btn"><i className="ar-icon ar-icon-arrow-down3"></i></span>

                          <Commit url="notifications/delete" params={{'msg_id': item.id}} onComplete={this.onDeleteNotification} custom={true}>
                            <span className="notify-list__item-del-btn"><i className="ar-icon ar-icon-bin"></i></span>
                          </Commit>

                          <span className="notify-list__item-title">{item.header}</span>

                          {item.text != null &&
                            <div className="notify-list__item-content">
                              <p>{item.text}</p>
                            </div>
                          }
                        </li>)
                      })
                    }
                  </ul>
                </div>
                <div className="notifications__more-btn"><Link to="/notifications" className="btn btn-default btn-blue">Все уведомления</Link></div>
              </div>
            </div>
          </section>
          <section className="s-person">
            <div className="container-fluid">
              <div className="row">
                <div className="s-person__photo-wrap"><img src={this.state.introduction.photo} alt="kolka"/></div>
                <div className="s-person__decription">
                  <h2 className="s-person__name">{this.state.introduction.title}</h2>
                  <div className="s-person__text" dangerouslySetInnerHTML={this.state.introduction.text}>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="b-tables-preview">
            <div className="container-fluid">
              <div className="row">
                <div className="b-tables-preview__request">
                  <div className="b-table-info b-table-info_request">
                    <div className="b-table-info__title"><span>Заявки</span><Link to="/orders">Все заявки</Link></div>
                    <div className="b-table-info__descr">
                      <table className="t-requests">
                        <thead>
                          <tr>
                            <td>№</td>
                            <td>Дата подачи заявки</td>
                            <td>ТРЦ</td>
                            <td>Раздел</td>
                            <td>Тема</td>
                            <td>Статус</td>
                            <td>К-во постов</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.orders.map((item, i) => {
                              return (
                                <tr key={i} className="link-row" data-href="dialog.html" data-id={item.id} onClick={this.onItemClick}>
                                  <td>{item.id}</td>
                                  <td>{item.create_date}</td>
                                  <td>{item.sec_name}</td>
                                  <td>{item.departament}</td>
                                  <td>{item.subject}</td>
                                  <td>{item.status}</td>
                                  <td>{item.post_count}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="b-tables-preview__doc">
                  <div className="b-table-info b-table-info_doc">
                    <div className="b-table-info__title"><span>Документы</span><Link to="/documents">Все документы</Link></div>
                    <div className="b-table-info__descr">
                      <div className="doc-text" dangerouslySetInnerHTML={this.state.documents}>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="b-tables-preview__materials">
                  <div className="b-table-info b-table-info_materials">
                    <div className="b-table-info__title"><span>Материалы</span><Link to="/materials">Все материалы</Link></div>
                    <div className="b-table-info__descr">
                      <div className="b-table-info__select">
                        <ItemPicker tag="material" items={this.state.stores} objects={this.state.materials} onChange={this.onStoreChange} />
                      </div>
                      <table className="t-materials">
                        <tbody>
                          {
                            this.getMaterials().map((item, i) => {
                              return (
                                <tr key={i}>
                                  <td>{item.name}</td>
                                  <td><a href={item.file} className="btn btn-default btn-blue">Скачать</a></td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="b-tables-preview__events">
                  <div className="b-table-info b-table-info_events">
                    <div className="b-table-info__title"><span>Маркетинговые мероприятия</span>
                  </div>
                  <div className="b-table-info__descr">
                    <div className="b-table-info__select">
                      <ItemPicker tag="events" items={this.state.stores} onChange={this.onStoreChange} />
                    </div>

                    <img src="/img/table-img.jpg" alt="tb"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fetch>);
  }
};


class EmployeeDashboard extends React.Component {
  static contextTypes = { router: PropTypes.object }

  constructor(props) {
    super(props);

    this.state = { contents: [] };
  }

  @autobind
  onComplete(data) {
    this.setState({ contents: data.bid });
  }

  @autobind
  onItemClick(e) {
    const router = this.context.router.history;
    const id = e.target.parentNode.getAttribute('data-id');

    router.push('/order-details/' + id);
  }

  render() {
    return (
      <Fetch url="/bid" onComplete={this.onComplete}>
        <section className="orders orders_lk">
          <div className="container-fluid">
            <div className="row">
              <div className="orders__table">
                <div className="b-table-info b-table-info_request">
                  <div className="b-table-info__title"><span>Заявки</span><Link to="/orders">Все заявки</Link></div>
                  <div className="b-table-info__descr">
                    <table className="t-requests">
                      <thead>
                        <tr>
                          <td>№</td>
                          <td>Дата подачи заявки</td>
                          <td>ТРЦ</td>
                          <td>Раздел</td>
                          <td>Тема</td>
                          <td>Статус</td>
                          <td>К-во постов</td>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.contents.map((item, i) => {
                            return (
                              <tr key={i} className="link-row" data-href="dialog-lk-renter.html" data-id={item.id} onClick={this.onItemClick}>
                                <td>{item.id}</td>
                                <td>{moment(item.create_date).format('DD.MM.YY HH:mm')}</td>
                                <td>{item.sec_name}</td>
                                <td>{item.departament}</td>
                                <td>{item.subject}</td>
                                <td>{item.status}</td>
                                <td>{item.post_count}</td>
                              </tr>)
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fetch>);
  }
}

class MiniDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Загрузка...',
      body: ''
    };
  }

  @autobind
  onComplete(data) {
    this.setState({
      title: data.introduction[0].value,
      body: { __html: data.introduction[1].value }
    });
  }

  render() {
    return (
      <Fetch url="/dashboard" onComplete={this.onComplete}>
        <section className="bh-about">
          <div className="container-fluid">
            <div className="row">
              <div className="bh-name">
                <span>{this.state.title}</span>
              </div>
              <div className="bh-about-text">
                <p dangerouslySetInnerHTML={this.state.body}></p>
              </div>
            </div>
          </div>
        </section>
      </Fetch>);
  }
};
