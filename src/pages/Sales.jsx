import autobind from 'autobind-decorator';
import update from 'react-addons-update';
import classNames from 'classnames/bind';

import React from 'react';
import PropTypes from 'prop-types';
import { Fetch, Commit } from '../db';
import { Input, Picker, ItemPicker, FilePicker } from '../base';
import { Link, Validate } from '../utils';

export default
class Sales extends React.Component {
  static contextTypes = {
    auth: PropTypes.object
  }

  constructor(props) {
    super(props);

    const date = moment()
            .subtract(1, 'months');

    this.request = {
      turnover: null, img_file: null,
      date: date.format('DD.MM.YYYY'),
    };

    this.state = {
      predicate: {year: 2017, month: 1},
      date: {year: date.format('YYYY'), month: capitalize(date.format('MMMM'))},
      contents: null, valid: {}
    };
  }

  getContents() {
    const predicate = this.state.predicate;
    const contents = this.state.contents || [];

    if (predicate.month === 1) {
      return contents;
    }

    return contents.filter(function(item) {
      var month = moment(item.date, "YYYY-MM-DD HH:mm:ss").locale("ru").format("M");
      return (parseInt(month) + 1) === predicate.month;
    });
  }

  @autobind
  onMonthChange(value) {
    this.setState({
      predicate: update(this.state.predicate, {
          month: {$set: value}
      })
    });
  }

  @autobind
  onYearChange(value) {
    this.setState({
      predicate: update(this.state.predicate, {
        year: {$set: 2017 - value + 1}
      })
    });
  }

  @autobind
  onTenantChange(id) {
    this.setState({
      predicate: update(this.state.predicate, {
        tenant_id: {$set: id}
      })
    });
  }

  @autobind
  onStoreChange(id) {
    this.setState({
      predicate: update(this.state.predicate, {
        sec_id: {$set: id}
      })
    });
  }

  @autobind
  onComplete(data) {
    const year = this.state.predicate.year;
    this.setState({
      stores: data.directory.departament,
      partners: data.directory.tenants,
      contents: data.turnover[year]
    });
  }

  @autobind
  onCommit() {
    this.request.turnover = null;
    this.request.img_file = null;
    this.forceUpdate();
  }

  render() {
    return (
      <Fetch url="/goods-circle" params={this.state.predicate} onComplete={this.onComplete}>
      <section className="goods-crc">
        <div className="container-fluid">
          <div className="row">
            <div className="goods-crc__title">
              <h1 className="title title_gry">Отчет по товарообороту</h1>
            </div>
          </div>
          <div className="row">
            <div className="goods-crc__table">
              <table className="t-doc t-doc_goods">
                <thead>
                  <tr>
                    <td>
                      <Picker tag="month" onChange={this.onMonthChange}>
                        <div className="select-block select-block_simple">
                          <select className="select">
                            <option value="hide">Месяц</option>
                              <option value="0">Все</option>
                              <option value="1">Январь</option>
                              <option value="2">Февраль</option>
                              <option value="3">Март</option>
                              <option value="4">Апрель</option>
                              <option value="5">Май</option>
                              <option value="6">Июнь</option>
                              <option value="7">Июль</option>
                              <option value="8">Август</option>
                              <option value="9">Сентябрь</option>
                              <option value="10">Октябрь</option>
                              <option value="11">Ноябрь</option>
                              <option value="12">Декабрь</option>
                          </select>
                        </div>
                      </Picker>
                    </td>
                    <td>
                      <Picker tag="year" onChange={this.onYearChange}>
                        <div className="select-block select-block_simple">
                          <select className="select">
                            <option value="hide">Год</option>
                            <option value="1">2017</option>
                            <option value="2">2016</option>
                            <option value="3">2015</option>
                            <option value="4">2014</option>
                          </select>
                        </div>
                      </Picker>
                    </td>

                    {this.context.auth.role != 'tenant' &&
                      <td>
                        <ItemPicker prompt="ТРК" items={this.state.stores} style="select-block_simple" onChange={this.onTenantChange} />
                      </td>
                    }

                    {this.context.auth.role != 'tenant' &&
                      <td>
                        <ItemPicker prompt="Арендатор" tag="partner" displayKey="fio" items={this.state.partners} style="select-block_simple" onChange={this.onStoreChange} />
                      </td>
                    }

                    <td>Товарооборот</td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.getContents().map((item, i) => {
                      return (
                        <tr key={i}>
                        <td>{capitalize(moment(item.date, "YYYY-MM-DD HH:mm:ss").locale("ru").format("MMMM"))}</td>
                        <td>{moment(item.date, "YYYY-MM-DD HH:mm:ss").locale("ru").format("YYYY")}</td>
                        {this.context.auth.role != 'tenant' &&
                          <td>{item.departament}</td>
                        }
                        {this.context.auth.role != 'tenant' &&
                          <td>{item.user}</td>
                        }
                        <td>{item.turnover}</td>
                        <td><a href={item.file} className="btn btn-default btn-grey">Скан. копия</a></td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>
            </div>
            {this.context.auth.role === 'tenant' &&
              <div className="goods-crc__table">
                <form>
                  <table className="t-doc t-doc_upload">
                    <tbody>
                      <tr>
                        <td>{this.state.date.month}</td>
                        <td>{this.state.date.year}</td>
                        <td>
                          <div className="input-group">
                            <Input type="text" name="mail" placeholder="Товарооборот" className="form-control"
                                   bind={Link.to(this, 'request.turnover')}
                                   valid={this.state.valid.turnover}/>
                          </div>
                        </td>
                        <td>
                          <span>
                            <label htmlFor="input-file" className="label-upload">
                              <span className={classNames('label-upload__btn', {'invalid': this.state.valid.img_file})}>Загрузить скан. Копии отчета</span>
                            </label>

                            <FilePicker placeholder="Выберите файл"
                                        className="label-upload__input-file"
                                        bind={Link.to(this, 'request.img_file')} />
                          </span>
                        </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          }
          {this.context.auth.role === 'tenant' &&
            <div className="btn-r-holder">
              <Commit url="/goods-circle/add" params={this.request} onComplete={this.onCommit}
                      validate={Validate.props(this, {'presence': ['turnover', 'img_file']})}
                      multipart="true" className="btn btn-default btn-blue">
                Отправить
              </Commit>
            </div>
          }
        </div>
      </div>
    </section>
    </Fetch>);
  }
};
