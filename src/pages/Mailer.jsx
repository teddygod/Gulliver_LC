import autobind from 'autobind-decorator';
import update from 'react-addons-update';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import React from 'react';
import { Fetch, Commit } from '../db';
import { OnDialog } from '../modals';
import { TextArea } from '../base';
import { Link, Validate } from '../utils';


export default
class Mailer extends React.Component {
  static contextTypes = { modal: PropTypes.object }

  constructor(props) {
    super(props);

    this.state = {
      stores: [], tenants: [],
      request: {}, valid: {}
    };

    this.request = { message: '', header: 'Заголовок' };

    this.request['sec[]'] =
        this.state.request['sec[]'] = [];

    this.request['to_user[]'] =
        this.state.request['to_user[]'] = [];
  }

  componentDidMount() {
    this.context.modal.mount();
  }

  @autobind
  onComplete(data) {
    this.setState({
      stores: data.defaulData.directory.sec,
      tenants: data.defaulData.directory.tenants
    });
  }

  @autobind
  onItemsChange(items, tag) {
    this.request[tag] = items.map((i) => i.id);

    let request = this.state.request;
    request[tag] = items;

    this.setState({request: request});
    this.context.modal.close();
  }

  @autobind
  onDelete(e) {
    const target = e.target;
    const tag = target.getAttribute('data-tag');
    const key = target.getAttribute('data-key');

    let items = this.state.request[tag];
    const index = items.indexOf(key);
    items.splice(index);
  }

  @autobind
  onCommit(e) {
    this.refs.message.refresh();
  }


  render() {
    return (
      <Fetch url="/user/profile" force="true" onComplete={this.onComplete}>
      <div id="create-notification-wrapper">
        <section className="notifications">
          <div className="container-fluid">
            <div className="row">
              <div className="notifications__wrap">
                <form action="#" method="post" id="ntf-c-form">
                  <div className="ntf-c-heading ntf-c-row">Создать уведомление</div>
                  <div className={classNames("ntf-c-trk ntf-c-row", {'invalid': (this.state.valid['to_user[]'] == 0)})}>
                    <div className="row-heading">
                      <span>ТРЦ</span>
                      <a href="#id-ntf-c-add-center" className="modal-show">
                        <img src="./img/grey-plus.svg" />
                      </a>
                    </div>
                    <div className="row-content">
                      <ul className="ntf-c-recipient-list">
                        {
                          this.state.request['sec[]'].map((item, i) => {
                            return (
                              <li key={i}>
                                <span>{item.name}</span>
                                <a data-tag="stores" data-key={item.id} className="recipient-delete" onClick={this.onDelete}></a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                  <div className={classNames("ntf-c-brands ntf-c-row", {'invalid': (this.state.valid['sec[]'] == 0)})}>
                    <div className="row-heading">
                      <span>Бренды</span>
                      <a href="#id-ntf-c-add-brand" className="modal-show">
                        <img src="./img/grey-plus.svg" />
                      </a>
                    </div>
                    <div className="row-content">
                      <ul className="ntf-c-recipient-list">
                        {
                          this.state.request['to_user[]'].map((item, i) => {
                            return (
                              <li key={i}>
                                <span>{item.fio}</span>
                                <a data-tag="tenants" data-key={item.id} className="recipient-delete" onClick={this.onDelete}></a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                  <TextArea ref="message" name="ntf-c-text" id="ntf-c-text"
                            className="ntf-c-textarea"
                            bind={Link.to(this, 'request.message')}
                            valid={this.state.valid.message}>

                  </TextArea>
                  <div className="form-dialog__btn ntf-submit">
                    <Commit url="notifications/create"
                            params={this.request}
                            onComplete={this.onCommit}
                            validate={Validate.props(this, {'presence': ['message'], 'length': ['sec[]', 'to_user[]']})}
                            className="btn btn-default btn-blue">
                        Создать уведомление
                    </Commit>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <OnDialog name="id-ntf-c-add-center" tag="sec[]" items={this.state.stores} onChange={this.onItemsChange} />
        <OnDialog name="id-ntf-c-add-brand" tag="to_user[]" items={this.state.tenants} path="fio" onChange={this.onItemsChange} />
      </div>
    </Fetch>);
  }
}
