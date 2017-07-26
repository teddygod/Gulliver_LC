import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';

import React from 'react';
import PropTypes from 'prop-types';
import { Fetch } from '../db';
import { Input, ItemPicker, FilePicker } from '../base';
import { Link } from '../utils';

import { Link as RouterLink } from 'react-router-dom';

export default
class Contacts extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    auth: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      contents: [],
      stores: [],
      departaments: [],
      predicate: { sec: null, departament: null }
    };
  }

  @autobind
  onPredicateChange(value, tag) {
    var predicate = this.state.predicate;
    predicate[tag] = value;

    this.setState({ predicate: predicate });
  }

  @autobind
  onComplete(data) {
    this.setState({
      contents: data.contactsList,
      stores: data.directory.sec,
      departaments: data.directory.departament
    });
  }

  @autobind
  onSelectRow(e) {
    e.preventDefault();

    if (this.context.auth.role != 'tenant') {
      return;
    }

    const id = e.currentTarget.getAttribute('data-tag');
    const router = this.context.router;

    router.history.push('/contact-details/' + id);
  }

  render() {
    return (
      <Fetch url="/contacts" params={this.state.predicate} onComplete={this.onComplete}>
      <section className="contact">
        <div className="container-fluid">
          <div className="row">
            <div className="contact__title">
              <h1 className="title title_grey">Контакты</h1>
            </div>
          </div>
          <div className="row">
            <div className="contact__filters-wrap">
              <div className="contact__filter">
                <ItemPicker tag="sec" items={this.state.stores} onChange={this.onPredicateChange} />
              </div>
              <div className="contact__filter">
                <ItemPicker tag="departament" items={this.state.departaments} onChange={this.onPredicateChange} />
              </div>
            </div>
          </div>
          <div className="row">
            {
              this.state.contents.map((item, i) => {
                return (
                  <div className="contact__mng-item" key={i} >
                    <div className={classNames("thumbnail", {"clickable": this.context.auth.role != "tenant"})} data-tag={i} onClick={this.onSelectRow}>
                      <img src={item.photo} alt="Manager"/>
                      <div className="caption">
                        <h3>{item.fio}</h3>
                        <p>({item.position})</p>
                        <ul className="contact-list">
                          <li className="contact-list__item"><span className="contact-list__item-icon"><i className="ar-icon ar-icon-envelop"></i></span><span className="contact-list__item-text">{item.mail}</span></li>
                          <li className="contact-list__item"><span className="contact-list__item-icon"><i className="ar-icon ar-icon-phone"></i></span><span className="contact-list__item-text">{item.phone}</span></li>
                        </ul>
                      </div>
                    </div>
                </div>)
              })
            }
          </div>

          {this.context.auth.role != 'tenant' &&
            <div className="row button-offset">
              <RouterLink to="/contact-add" className="btn btn-blue btn-create-notification">Создать контакт</RouterLink>
            </div>
          }
        </div>
      </section>
    </Fetch>);
  }
};
