import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import update from 'react-addons-update';

import React from 'react';
import { Input, TextArea, ItemPicker, DatePicker, FilePicker } from '../base';
import { Link, Validate } from '../utils';
import { Commit } from '../db';

export default
class EditOrder extends React.Component {
  static contextTypes = {
    modal: PropTypes.object,
    auth: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.request = {};
    this.form = [];


    this.state = {
      fields: [], valid: {}, params: {},
      subjects: this.findSubjects(null),
      validations: this.findValidations()
    };
  }

  componentDidMount() {
    this.context.modal.onShow(this.onShowModal);
  }

  @autobind
  onShowModal() {
    this.request.user = this.context.auth.id;

    this.refs.department.refresh();
    this.refs.subject.refresh();
    this.refs.sec.refresh();
    this.refs.message.refresh();

    this.setState({
      subjects: this.findSubjects(null),
      fields: [], valid: {}
    });
  }

  @autobind
  onPredicateChange(id, tag) {
    this.request[tag] = id;

    const department = this.request.departament_id;
    const subject = this.request.subject_id;

    const subjects = this.findSubjects(department);
    const form = this.findForm(department, subject) || {};
    const fields = JSON.parse(form.fields || "{}");
    const result = [];

    for (let i in fields) {
      result.push({
        name: i, title: fields[i].name,
        type: fields[i].type
      });
    }

    this.form = result;
    this.request.form_id = form.id;

    this.setState({
      subjects: subjects, fields: result,
      validations: this.findValidations()
    });

    if (department != this.department) {
      this.refs.subject.reset();
      this.department = department;
    }
  }

  findSubjects(department) {
    const subjects = this.props.directory.subjects;

    if (department == null) {
      return [{name: 'Нет тем', id: -1}];
    }

    const result = subjects.filter(i => i.department_id == department);

    if (result.length === 0) {
      return [{name: 'Нет тем', id: -1}];
    } else {
      return result;
    }
  }

  findForm(department, subject) {
    if (department == null && subject == null) {
      return null;
    }

    for (let i of this.props.directory.forms) {
      const hasDepartment = i.departament_id == department;
      const hasSubject = i.subject_id == subject;

      if (hasDepartment == true && hasSubject == true) {
        return i;
      }
    }

    return null;
  }

  findValidations() {
    let validations = {
      'presence': [ 'departament_id', 'subject_id', 'sec_id', 'form_id', 'ticket_msg' ]
    };

    for (let f of this.form) {
      switch (f.type) {
        case 'text':
        case 'email':
        case 'phone':
          validations.presence.push('form_date[' + f.name + ']');
          break;
      }
    }

    return validations;
  }

  @autobind
  onRangeChange(start, end) {
    this.request['form_date[date-from]'] = moment(start).format('DD.MM.YYYY');
    this.request['form_date[date-to]'] = moment(end).format('DD.MM.YYYY');
  }

  @autobind
  onDateChange(date) {
    this.request['form_date[date]'] = date;
  }

  @autobind
  onListExpand(e) {
    const item = e.target.getAttribute('data-tag');
    let params = this.state.params;
    params[item] = (params[item] || 1) + 1;

    this.setState({ params: params })
  }

  @autobind
  onCommit() {
    this.context.modal.close();
  }

  render() {
    return (
      <div id="id-order-popup" className="modal-box">
        <div className="modal-area">
          <div className="modal-box__close-btn"></div>
          <div className="popup-content">
            <form id="order-form" name="order-form">
              <div className="o-f-static-part">
                <div className="o-f-row">
                  <ItemPicker ref="department" tag="departament_id" prompt="Отдел"
                              items={this.props.directory.departments}
                              allowsMultiple="false" className={Validate.className(this, 'departament_id')}
                              onChange={this.onPredicateChange} />
                </div>
                <div className="o-f-row">
                  <ItemPicker ref="subject" tag="subject_id" prompt="Тема"
                              items={this.state.subjects}
                              allowsMultiple="false" className={Validate.className(this,'subject_id')}
                              onChange={this.onPredicateChange} />
                </div>
                <div className="o-f-row">
                  <ItemPicker ref="sec" tag="sec_id" prompt="ТРЦ" items={this.props.directory.stores}
                              allowsMultiple="false" className={Validate.className(this, 'sec_id')}
                              onChange={this.onPredicateChange} />
                </div>
              </div>

              <div className="o-f-row">
                <TextArea ref="message" name="order-description" id="order-description"
                          placeholder="Описание" valid={this.state.valid['ticker_msg']}
                          bind={Link.to(this, 'request.ticket_msg')}>

                 </TextArea>
              </div>


              <div className="o-f-variable-part">
                {
                  this.state.fields.map((item, i) => {
                    switch (item.type) {
                      case 'date-range':
                        return (
                          <div key={i} className="o-f-row">
                            <div className="order-period-picker">
                              <span>{item.title}</span>
                              <DatePicker onChange={this.onRangeChange} className={Validate.className(this, i.name)} />
                            </div>
                          </div>);

                      case 'date':
                        return (
                          <div key={i} className="o-f-row">
                            <div className="event-date-time-picker">
                              <span>Дата и Время</span>
                              <DatePicker mode='time' onChange={this.onDateChange} className={Validate.className(this, i.name)} />
                              <span className="o-f-tip">Планируемая дата и время проведения работ</span>
                            </div>
                          </div>);

                      case 'text-list':
                        const count = this.state.params[item.name] || 1;
                        let elems = [];
                        for (let i = 0; i < count; i++) { elems.push(i); }

                        return (
                          <div key={i} className="o-f-row">
                            <div className="expandable-list-wrap">
                              <span className="o-f-list-heading">Список сотрудников арендатора /фирмы подрядчика</span>
                              <ul className="o-f-list">
                                {
                                  elems.map((i) => {
                                    return (
                                      <li key={i}>
                                        <Input type="text" id="worker-name-1" name="worker-name-1" placeholder="Введите имя"
                                               bind={Link.to(this, 'request.form_date[' + item.name + '_' + i + ']')}/>
                                      </li>)
                                  })
                                }
                              </ul>
                              <div className="list-expander" data-tag={item.name} onClick={this.onListExpand}></div>
                            </div>
                          </div>);

                      case 'img':
                        return (
                          <div key={i} className="o-f-row">
                            <div className="o-f-visualization-upload">
                              <FilePicker name="visualization-image" id="visualization-image"
                                          bind={Link.to(this, 'request.form_date[file-img]')} />
                              <div>
                                <label htmlFor="visualization-image" className="inline-holder">
                                  <img src="./img/o-f-plus.svg" />
                                </label>
                                <div className="inline-holder">
                                  <div>
                                    <label htmlFor="visualization-image">{item.title}</label>
                                  </div>
                                  <div>
                                    <label htmlFor="visualization-image" className="o-f-tip">загрузка изображения в формате JPEG, PNG, PDF</label>
                                  </div>
                                </div>
                              </div>
                              <div className="o-f-v-u-separator">
                                <span>Материалы (макет, фото, видео, аудио)</span>
                              </div>
                              <Input type="text" name="dropbox-link" id="dropbox-link"
                                     placeholder="http://dropbox.com"
                                     bind={Link.to(this, 'request.form_date[dropbox-link]')} />
                            </div>
                          </div>);

                      case 'text':
                      case 'email':
                      case 'phone':
                        return (
                          <div key={i} className="o-f-row">
                            <Input type="text" name={"sender-"+item.name}
                                   id={"sender-"+item.name} placeholder={item.title}
                                   valid={this.state.valid['form_date[' + item.name + ']']}
                                   bind={Link.to(this, 'request.form_date[' + item.name + ']')} />
                          </div>);
                    }
                  })
                }
              </div>

              <div className="o-f-static-part">
                <div className="form-btn-row">
                  <Commit url="bid/create" params={this.request}
                          validate={Validate.props(this, this.state.validations)}
                          className="form-btn-send">
                    Отправить
                  </Commit>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>);
  }
}
