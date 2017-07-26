import autobind from 'autobind-decorator'
import update from 'react-addons-update';

import React from 'react';
import PropTypes from 'prop-types';
import { ItemPicker, DatePicker, Paginate } from '../base';
import { browserHistory } from 'react-router';
import { Fetch } from '../db';


export default
class Orders extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    auth: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      stores: [],
      departments: [],
      subjects: [],
      predicate: { date_from: null, date_to: null, page: null },
    };
  }

  @autobind
  onComplete(data) {
    this.setState({
      stores: data.directory.sec,
      departments: data.directory.departament,
      subjects: data.directory.bid_subject,
      contents: data.bid || [],
      pageCount: data.bidCount
    });
  }

  @autobind
  onSearchChange(e) {
    this.onPredicateChange(e.target.value, 'search');
  }

  @autobind
  onPageChange(e) {
    this.onPredicateChange(e.selected + 1, 'page');
  }

  @autobind
  onDateChange(start, end) {
    var predicate = this.state.predicate;
    predicate.date_from = moment(start).format('DD-MM-YYYY');
    predicate.date_to = moment(end).format('DD-MM-YYYY');

    this.setState({ predicate: predicate });
  }

  @autobind
  onPredicateChange(value, tag) {
    var predicate = this.state.predicate;
    predicate[tag] = value;

    this.setState({ predicate: predicate });
  }

  @autobind
  onItemClick(e) {
    const router = this.context.router.history;
    const id = e.target.parentNode.getAttribute('data-id');

    router.push('/order-details/' + id);
  }

  render() {
    const { auth } = this.context;

    return (
      <Fetch url="/bid" params={this.state.predicate} onComplete={this.onComplete}>
      <section className="orders">
        <div className="container-fluid">
          <div className="row">
            <div className="orders__table pagination-adjustment">
              <div className="b-table-info b-table-info_full b-table-info_request">
                <div className="b-table-info__title"><span>Заявки</span>
                <div className="b-table-info__form form-search">
                  <div className="form-search__group input-group">
                    <input type="text" placeholder="" onChange={this.onSearchChange} className="form-control"/>
                    <span className="input-group-btn">
                      <button className="btn btn-default btn-form-search"><i className="ar-icon ar-icon-search"></i></button></span>
                    </div>
                  </div>
                </div>
                <form className="b-table-info__filters">
                  <div className="b-table-info__filters-select input-group">
                    <DatePicker onChange={this.onDateChange} />
                  </div>
                  <div className="b-table-info__filters-select input-group">
                    <ItemPicker prompt="ТРК" tag="sec" items={this.state.stores} onChange={this.onPredicateChange} />
                  </div>

                  {auth.role == 'tenant' &&
                    <div className="b-table-info__filters-select input-group">
                      <ItemPicker prompt="Отдел" tag="department" items={this.state.departments} onChange={this.onPredicateChange} />
                    </div>
                  }

                  <div className="b-table-info__filters-select input-group">
                    <ItemPicker prompt="Тема" tag="subject" items={this.state.subjects} onChange={this.onPredicateChange} />
                  </div>
                </form>
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
                            <tr key={i} data-id={item.id} onClick={this.onItemClick} className="link-row">
                              <td>{item.id}</td>
                              <td>{moment(item.create_date).format('DD.MM.YY HH:mm')}</td>
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

            <div className="section-pagination-holder">
                <Paginate pageCount={this.state.pageCount} onPageChange={this.onPageChange} />
            </div>
          </div>
        </div>
      </section>
    </Fetch>)
  }
};
