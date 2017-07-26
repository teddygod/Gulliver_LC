import autobind from 'autobind-decorator';

import React from 'react';
import PropTypes from 'prop-types';
import { Fetch, Commit } from '../db';
import { Input, TextArea, ItemPicker, FilePicker } from '../base';
import { Link, Validate } from '../utils';

export default
class Chat extends React.Component {
  static contextTypes = {
    auth: PropTypes.object,
    modal: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.params = {id: this.props.match.params.id};
    this.request = {text: '', bid_id: this.params.id, event: 'send'};
    this.approve = {bid_id: this.params.id, event: 'approve'};
    this.reject = {bid_id: this.params.id, event: 'reject'};
    this.close = {bid_id: this.params.id, event: 'close'};
    this.state = {contents: [], user: {type: {slug: 'none'}}, valid: {}};
  }

  componentDidMount() {
    this.context.modal.mount();
  }

  @autobind
  onComplete(data) {
    this.setState({
      contents: data.bid.tickets || [],
      departments: data.directory.departament,
      identifier: data.bid.id,
      user: data.user,
      department: data.bid.departament_id
    });

    this.context.modal.mount();
  }

  getOrderType() {
    const self = this.context.auth.role;
    const other = this.state.department;

    if (self === 'tenant') {
      if (other === 3) { return 'reject_accept'; }
      else { return 'none'; }
    } else {
      switch (self) {
        case 'lease': return 'forward_close';
        case 'maintenance': return 'accept_reject_forward';
        case 'marketing': return 'payment';
      }
    }

    return 'none';
  }

  getTitle(orderType) {
    const self = this.context.auth.role;
    const other = this.state.department;

    let selfTitle = '';
    let otherTitle = '';

    switch (self) {
      case 'tenant': selfTitle = 'арендатор'; break;
      case 'lease': selfTitle = 'аренда'; break;
      case 'marketing': selfTitle = 'маркетинг'; break;
      case 'maintenance': selfTitle = 'эксплуатация'; break;
    }

    if (self === 'tenant') {
      switch (other) {
        case 1: otherTitle = 'арендатор'; break;
        case 2: otherTitle = 'аренда'; break;
        case 3: otherTitle = 'маркетинг'; break;
        case 4: otherTitle = 'эксплуатация'; break;
      }
    } else {
      otherTitle = 'арендатор';
    }

    if (selfTitle === '' || otherTitle === '') {
      return '';
    }

    return '(' + selfTitle + '-' + otherTitle + ')';
  }

  @autobind
  onCommit(data) {
    this.refs.text.refresh();

    this.setState({
      contents: data.bid.tickets || []
    });
  }

  render() {
    const type = this.getOrderType();
    const title = this.getTitle();

    console.log(type);

    return (
      <Fetch url="bid/item" params={this.params} force="true" onComplete={this.onComplete}>
      <div>
        <section className="dialog">
          <div className="container-fluid">
            <div className="row">
              <div className="dialog__content">
                <h2 className="dialog__content-title">Заявка №{this.state.identifier}{title}</h2>
                <div className="dialog__content-inner">

                  {
                    this.state.contents.map((item, i) => {
                      if (item.creator_id == this.state.user.id) {
                        return (
                          <div key={i} className="dialog__msg dialog__msg_outbox">
                            <span className="dialog__msg-author">{item.name}</span>
                            <span className="dialog__msg-date">{moment(item.create_date).format('DD.MM.YY HH:mm')}</span>
                            <div className="dialog__msg-text">
                              <p>{item.text}</p>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={i} className="dialog__msg dialog__msg_inbox">
                            <span className="dialog__msg-author">{item.name}</span>
                            <span className="dialog__msg-date">{moment(item.create_date).format('DD.MM.YY HH:mm')}</span>
                            <div className="dialog__msg-text">
                              <p>{item.text}</p>
                            </div>
                          </div>
                        );
                      }
                    })
                  }
                </div>
              </div>

              {type === 'forward_close' &&
                <div className="end-dialog">
                  <a href="#id-redirect" className="btn btn-blue modal-show">Перенаправить</a>

                  <Commit url="/bid/item-add-post" params={this.close}
                          className="btn btn-blue"
                          onComplete={this.onCommit}>
                    Закрыть заявку
                  </Commit>
                </div>
              }

              {type === 'accept_reject_forward' &&
                <div className="end-dialog">

                  <Commit url="/bid/item-add-post" params={this.approve}
                          className="btn btn-blue"
                          onComplete={this.onCommit}>
                    Согласовано
                  </Commit>

                  <a href="#id-e-r-deny" className="btn btn-blue modal-show">Отказ</a>
                  <a href="#id-redirect" className="btn btn-blue modal-show">Перенаправить</a>
                </div>
              }

              {type === 'payment' &&
                <form method="post" action="#" className="lkm-end-dialog dialog__form form-dialog">
                  <div>
                    <label htmlFor="lkm-dialog-price">Согласованная сумма оплаты</label>
                    <Input type="text" id="lkm-dialog-price"
                           bind={Link.to(this, 'close.price')}/>
                  </div>
                  <div>
                    <Commit url="/bid/item-add-post" params={this.close}
                            validate={Validate.props(this, {'presence': ['price']})}
                            className="btn-b-blue" onComplete={this.onCommit}>
                      Закрыть заявку
                    </Commit>
                  </div>
                </form>
              }

              {type === 'reject_accept' &&
                <div className="end-dialog">
                  <a href="#id-e-r-deny" className="btn btn-blue modal-show">Отказ</a>
                  <a href="#id-r-m-agree" className="btn btn-blue modal-show">Согласовано</a>
                </div>
              }

              <form method="get" action="#" className="dialog__form form-dialog">
                <div className="form-dialog__group input-group">
                  <TextArea ref="text" name="msg" rows="6" className="form-control"
                            valid={this.state.valid.text}
                            bind={Link.to(this, 'request.text')}>
                  </TextArea>
                </div>
                <div className="form-dialog__btn">
                  <Commit url="/bid/item-add-post" params={this.request}
                          validate={Validate.props(this, {'presence': ['text']})}
                          className="btn btn-default btn-blue"
                          onComplete={this.onCommit}>
                    Отправить
                  </Commit>
                </div>
              </form>
            </div>
          </div>
        </section>

        {(type === 'forward_close' || type === 'accept_reject_forward') &&
          <ForwardModal ref="forward" bid={this.request.bid_id}
                        items={this.state.departments} onComplete={this.onCommit} />
        }

        {(type === 'accept_reject_forward' || type === 'reject_accept') &&
          <DenyModal ref="deny" bid={this.request.bid_id}
                     onComplete={this.onCommit}/>
        }

        {type === 'reject_accept' &&
          <DocumentModal ref="document" bid={this.request.bid_id}
                         onComplete={this.onCommit}/>
        }

      </div>
      </Fetch>);
  }
};

class ForwardModal extends React.Component {
  static contextTypes = { modal: PropTypes.object }

  constructor(props) {
    super(props);

    this.state = { valid: {} };
    this.request = {bid_id: this.props.bid, event: 'redirect' }
  }

  refresh() {
    this.refs.department.refresh();
  }

  @autobind
  onCommit() {
    this.refresh();
  }

  render() {
    return (
    <div id="id-redirect" className="modal-box dialog-popup">
      <div className="modal-area">
        <div className="modal-box__close-btn"></div>
        <div className="popup-content">
          <form action="#" method="post" id="r-m-deny" name="r-m-deny">
            <div className="form-heading">Выберите отдел</div>
            <div className="redirect-picker-holder">
              <ItemPicker ref="department" prompt="Отдел"
                          allowsMultiple="false" className={Validate.className(this, 'departament_id')}
                          items={this.props.items} bind={Link.to(this, 'request.departament_id')} />
            </div>
            <div className="form-btn-row">
              <Commit url="/bid/item-add-post" params={this.request}
                      validate={Validate.props(this, {'presence': ['departament_id']})}
                      className="btn btn-default btn-blue"
                      onComplete={this.props.onComplete}>
                Перенаправить
              </Commit>
            </div>
          </form>
        </div>
      </div>
    </div>);
  }
};

class DenyModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { valid: {} };
    this.request = {bid_id: this.props.bid, event: 'reject' }
  }

  render() {
    return (
      <div id="id-e-r-deny" className="modal-box dialog-popup">
        <div className="modal-area">
          <div className="modal-box__close-btn"></div>
          <div className="popup-content">
            <form action="#" method="post" id="e-r-deny" name="e-r-deny">
              <div className="form-heading">Отказ</div>
              <TextArea name="e-r-deny-text" id="e-r-deny-text"
                        className="dialog-popup-textarea textarea-big"
                        placeholder="Введите причину отказа"
                        bind={Link.to(this, 'request.text')} />

              <div className="form-btn-row">
                <Commit url="/bid/item-add-post" params={this.request}
                        validate={Validate.props(this, {'presence': ['text']})}
                        className="form-btn-send" onComplete={this.props.onComplete}>
                  Отправить
                </Commit>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

class DocumentModal extends React.Component {
  static contextTypes = {
    axios: PropTypes.func,
    auth: PropTypes.object,
    modal: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { valid: {} };
    this.request = {bid_id: this.props.bid, event: 'approve' }
  }

  @autobind
  onFileChange(file, upload) {
    const axios = this.context.axios;
    const token = this.context.auth.token;
    const url = '/bid/item-add-post?token=' + token;

    let data = new FormData();
    data.append('bid_id', this.request.bid_id);
    data.append('event', this.request.event);
    data.append('file', file);

    axios.post(url, data)
      .then(this.onSuccess)
      .catch(this.onError);
  }

  @autobind
  onSuccess(response) {
    const modal = this.context.modal;
    const data = response.data || {};
    const status = data.status;
    const onComplete = this.props.onComplete;

    if (status === 'failure') {
      this.onError();
      return;
    }

    modal.show('thank-you');

    if (onComplete != null) {
      onComplete(data);
    }
  }

  @autobind
  onError(e) {
    console.log(e);

    const modal = this.context.modal;
    modal.show('error');
  }

  render() {
    return (
      <div id="id-r-m-agree" className="modal-box dialog-popup">
        <div className="modal-area">
          <div className="modal-box__close-btn"></div>
          <div className="popup-content">
            <form action="#" method="post" id="r-m-agree" name="r-m-agree">
              <div className="form-heading">Согласование</div>
              <label htmlFor="input-file" className="label-upload">
                <span className="label-upload__btn"><span><i className="ar-icon ar-icon-download2"></i></span>Загрузите гарантийное письмо</span>

                <FilePicker id="input-file"
                            className="label-upload__input-file"
                            placeholder="Загрузите гарантийное письмо"
                            onChange={this.onFileChange} />
              </label>
            </form>
          </div>
        </div>
      </div>);
  }
};
