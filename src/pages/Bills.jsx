import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';

import React from 'react';
import PropTypes from 'prop-types';
import { Fetch, Commit } from '../db';
import { ItemPicker, DatePicker, Paginate } from '../base';

export default
class Bills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {predicate: {type: 'bill'}, contents: []};
  }

  @autobind
  onDateChange(start, end) {

  }

  @autobind
  onItemChange(id, tag) {

  }

  @autobind
  onComplete(data) {
    console.log(data);

    this.setState({
      stores: data.directory.sec,
      partners: data.directory.tenants,
      contents: data.documents.acts.docs
    });
  }


  render() {
    return (
      <Fetch url='/documents' params={this.state.predicate} onComplete={this.onComplete}>
      <section className="materials">
        <div className="container-fluid">
          <div className="row">
            <div className="materials__title">
              <h1 className="title title_grey">Счета арендатора</h1>
            </div>
          </div>
          <div className="row">
            <div className="materials__table">
              <div className="b-table-info b-table-info_materials">
                <div className="b-table-info__descr">
                  <table className="t-doc t-doc_scores-rent">
                    <thead>
                      <tr>
                        <td>№ Счета</td>
                        <td>
                          <DatePicker onChange={this.onDateChange} />
                        </td>
                        <td>Наименование</td>
                        <td>
                          <ItemPicker prompt="Арендатор" tag="partner" displayKey="fio" items={this.state.partners} style="select-block_simple" onChange={this.onItemChange} />
                        </td>
                        <td>
                          <ItemPicker prompt="ТРК" tag="store" items={this.state.stores} style="select-block_simple" onChange={this.onItemChange} />
                        </td>
                        <td>
                          <div className="tip">Сумма</div>
                          <div className="sum-wrap">
                            <input type="text" id="scores-sum-from" className="doc-sum-from" placeholder="от" />
                            <span>-</span>
                            <input type="text" id="scores-sum-to" className="doc-sum-to" placeholder="до" />
                          </div>
                        </td>
                        <td>Статус</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.contents.map((item, i) => {
                          const isNegative = item.status != 'Оплачен';

                          return (
                            <tr key={i} className={classNames({'t-doc__tr_warning': isNegative})}>
                              <td>{item.id}</td>
                              <td>{moment(item.date).format('DD.MM.YYYY')}</td>
                              <td>{item.name}</td>
                              <td>{item.user}</td>
                              <td>{item.departament}</td>
                              <td>{item.amount} грн</td>
                              <td>{item.status}</td>
                            </tr>
                          )
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
};
