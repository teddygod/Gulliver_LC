import autobind from 'autobind-decorator';
import update from 'react-addons-update';

import React from 'react';
import { Fetch, Commit } from '../db';
import { Link, Validate } from '../utils';

import {
  Input, ItemPicker, DatePicker,
  Paginate, NumRange
} from '../base';

export default
class Documents extends React.Component {
  render() {
    return (
      <section className="documents">
        <div className="container-fluid">
          <div className="row">
            <div className="documents__title">
              <ul role="tablist" className="nav nav-tabs nav-tabs-doc">
                <li className="nav-tabs-doc__title"><span>Документы</span></li>
                <li role="presentation"><a href="#nav-tabs-doc_4" aria-controls="settings" role="tab" data-toggle="tab">Договора</a></li>
                <li role="presentation"><a href="#nav-tabs-doc_3" aria-controls="messages" role="tab" data-toggle="tab">Акты сверки</a></li>
                <li role="presentation"><a href="#nav-tabs-doc_2" aria-controls="profile" role="tab" data-toggle="tab">Акты</a></li>
                <li role="presentation" className="active"><a href="#nav-tabs-doc_1" aria-controls="home" role="tab" data-toggle="tab">Счета</a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="documents__table">
              <div className="tab-content">
                <Bills />
                <Acts />
                <Reconciliation />
                <Contracts />
              </div>
            </div>
          </div>
        </div>
      </section>);
    }
};


class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {contents: [], predicate: {type: 'bill'}};
  }

  @autobind
  onPageChange(e) {
    this.setState({
      predicate: update(this.state.predicate, {
        page: {$set: e.selected + 1}
      })
    });
  }

  @autobind
  onDateChange(start, end) {
    this.setState({
      predicate: update(this.state.predicate, {
        date_from: {$set: moment(start).format('DD-MM-YYYY')},
        date_to: {$set: moment(end).format('DD-MM-YYYY')}
      })
    });
  }

  @autobind
  onStoreChange(id, tag) {
    this.setState({
      predicate: update(this.state.predicate, {
        sec: {$set: id}
      })
    });
  }

  @autobind
  onRangeChange(from, to) {
    this.setState({
      predicate: update(this.state.predicate, {
        amount_from: {$set: from},
        amount_to: {$set: to}
      })
    });
  }

  @autobind
  onComplete(data) {
    this.setState({
      stores: data.directory.sec,
      contents: data.documents.bill.docs,
      pageCount: data.documents.bill.count
    });
  }

  @autobind
  onDocumentRequest(data) {
    this.setState({
      contents: data.documents.bill.docs,
      pageCount: data.documents.bill.count
    });
  }

  render() {
    return (
      <Fetch url="/documents" params={this.state.predicate} onComplete={this.onComplete}>
      <div id="nav-tabs-doc_1" role="tabpanel" className="tab-pane active">
        <table className="t-doc">
          <thead>
            <tr>
              <td>№ Счета</td>
              <td>
                <DatePicker tagValue="item-on-bill" onChange={this.onDateChange} />
              </td>
              <td>Наименование</td>
              <td>
                <ItemPicker prompt="ТРК" items={this.state.stores} style="select-block_simple" onChange={this.onStoreChange} />
              </td>
              <td>
                <NumRange title="Сумма" onChange={this.onRangeChange} />
              </td>
              <td>Статус</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.contents.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{moment(item.date).format('DD.MM.YYYY')}</td>
                    <td>{item.name}</td>
                    <td>{item.sec}</td>
                    <td>{item.amount} грн</td>
                    <td>{item.status}</td>
                    <RequestButton item={item} onComplete={this.onDocumentRequest} />
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <div className="section-pagination-holder">
          <Paginate pageCount={this.state.pageCount} onPageChange={this.onPageChange} />
        </div>
      </div>
    </Fetch>);
  }
};


class Acts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contents: [], predicate: {type: 'acts'} };
  }

  @autobind
  onDateChange(e) {
    this.setState({
      predicate: update(this.state.predicate, {
        date_from: {$set: moment(start).format('DD-MM-YYYY')},
        date_to: {$set: moment(end).format('DD-MM-YYYY')}
      })
    });
  }

  @autobind
  onRangeChange(from, to) {
    this.setState({
      predicate: update(this.state.predicate, {
        amount_from: {$set: from},
        amount_to: {$set: to}
      })
    });
  }

  @autobind
  onComplete(data) {
    this.setState({
      stores: data.directory.sec,
      contents: data.documents.acts.docs,
      pageCount: data.documents.acts.count
    });
  }

  @autobind
  onDocumentRequest(data) {
    this.setState({
      contents: data.documents.acts.docs,
      pageCount: data.documents.acts.count
    });
  }

  render() {
    return (
      <Fetch url="/documents" params={this.state.predicate} onComplete={this.onComplete}>
      <div id="nav-tabs-doc_2" role="tabpanel" className="tab-pane">
        <table className="t-doc">
          <thead>
            <tr>
              <td>№ Счета</td>
              <td>
                <DatePicker onChange={this.onDateChange} />
              </td>
              <td>Наименование</td>
              <td>
                <NumRange title="Сумма" onChange={this.onRangeChange} />
              </td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.contents.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{moment(item.date).format('DD.MM.YYYY')}</td>
                    <td>{item.name}</td>
                    <td>{item.amount} грн</td>
                    <RequestButton item={item} onComplete={this.onDocumentRequest} />
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <div className="section-pagination-holder">
          <Paginate pageCount={this.state.pageCount} onPageChange={this.onPageChange} />
        </div>
      </div>
    </Fetch>);
  }
};


class Reconciliation extends React.Component {
  constructor(props) {
    super(props);

    this.request = {};
    this.state = {valid:{}};
  }

  @autobind
  onDateChange(start, end) {
    this.request.date_from = moment(start).format('DD.MM.YYYY');
    this.request.date_to = moment(end).format('DD.MM.YYYY');
  }

  render() {
    return (
      <div id="nav-tabs-doc_3" role="tabpanel" className="tab-pane">
        <form action="#" method="get" className="form-reccall">
          <div className="form-reccall__from input-group">
            <DatePicker valid={this.state.valid.date_from}
                        onChange={this.onDateChange} />
          </div>
          <div className="form-reccall__mail input-group">
            <Input type="text" name="mail" placeholder="Email"
                   valid={this.state.valid.email} bind={Link.to(this, 'request.email')}
                   className="form-control" />
          </div>
          <div className="form-reccall__submit input-group">
            <Commit url="/documents/request-act"
                    params={this.request}
                    validate={Validate.props(this, {'presence': ['email', 'date_from', 'date_to']})}
                    className="btn btn-default btn-blue">
              Отправить запрос
            </Commit>
          </div>
        </form>
      </div>);
  }
};


class Contracts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {contents: [], predicate: {type: 'contracts'}, valid: {}};
    this.request = {sec: 0, departament: 0};
  }

  @autobind
  onDateChange(start, end) {
    this.request.date_from = moment(start).format('DD.MM.YYYY');
    this.request.date_to = moment(end).format('DD.MM.YYYY');
  }

  @autobind
  onComplete(data) {
    this.setState({
      stores: data.directory.sec,
      departments: data.directory.departament,
      contents: data.documents.contracts.docs
    });
  }

  render() {
    return (
      <Fetch url="/documents" onComplete={this.onComplete}>
      <div id="nav-tabs-doc_4" role="tabpanel" className="tab-pane">
        <table className="t-doc">
          <thead>
            <tr>
              <td>№ Договора</td>
              <td>
                <DatePicker onChange={this.onDateChange} />
              </td>
              <td> </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.contents.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{moment(item.date).format('DD.MM.YYYY')}</td>
                    <td>{item.sec}</td>
                    <td>{item.department}</td>
                    <td><a href={item.file} className="btn btn-default btn-blue">Скачать договор</a></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <form action="#" method="get" className="form-reccall">
          <h3 className="form-reccall__title">Форма «запроса актуальной информаци на email»</h3>
          <div className="form-reccall__select input-group">
            <ItemPicker items={this.state.stores} bind={Link.to(this, 'request.sec')} />
          </div>
          <div className="form-reccall__select input-group">
            <ItemPicker items={this.state.departments} bind={Link.to(this, 'request.departament')} />
          </div>
          <div className="form-reccall__mail input-group">
            <Input type="text" name="mail" placeholder="Email"
                   bind={Link.to(this, 'request.email')} valid={this.state.valid.email}
                   className="form-control" />
          </div>
          <div className="form-reccall__submit input-group">
            <Commit url="/documents/request-contact"
                    params={this.request}
                    validate={Validate.props(this, {'presence': ['email', 'sec', 'departament'], 'email': ['email']})}
                    className="btn btn-default btn-blue">
              Отправить запрос
            </Commit>
          </div>
        </form>
      </div>
    </Fetch>);
  }
};


class RequestButton extends React.Component {
  render() {
    const item = this.props.item;
    const onComplete = this.props.onComplete;

    return (
      <td>
        {!item.requestFl &&
          <Commit url="/documents/request-documents"
                  silent={true}
                  params={{doc: item.id}}
                  onComplete={onComplete}
                  className="btn btn-default btn-grey">
            Запросить счет
          </Commit>
        }

        {item.requestFl &&
          <a href={item.file}className="btn btn-default btn-blue">Скачать счет</a>
        }
      </td>);
  }
}
