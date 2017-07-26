import classNames from 'classnames/bind';

import React from 'react';
import { Link } from 'react-router-dom';

export default
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {role: 'none', currencies: []};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      role: nextProps.profile.type.slug,
      currencies: nextProps.directory.currencies
    });
  }

  render() {
    return (
      <aside id="aside-block_1" className="aside-panel aside-panel_small_bar">
        <div className="aside-panel__menu-button"><span className="aside-panel__menu-btn-text">Меню</span><span className="aside-panel__menu-btn-icon"><i className="ar-icon ar-icon-list2"></i></span></div>
        <div className="aside-panel__inner">
          <div className="aside-panel__inner-scrolled">
            <div className="aside-panel__logo"><Link to="/index" className="logo"><img src="img/logo.svg" alt="" className="logo__img"/></Link></div>
            <div className="aside-panel__menu">
              <nav id="main-menu_1" className="main-menu">
                {
                  this.state.role === 'tenant' &&
                  <ul className="main-menu__list">
                    <li className="main-menu__item"><Link to="/orders" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-images"></i></span><span className="main-menu__link-text">Заявки</span></Link></li>
                    <li className="main-menu__item"><Link to="/documents" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-copy"></i></span><span className="main-menu__link-text">Документы</span></Link></li>
                    <li className="main-menu__item"><Link to="/sales" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-stats-dots"></i></span><span className="main-menu__link-text">Отчет по товарообороту</span></Link></li>
                    <li className="main-menu__item"><Link to="/materials" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-images"></i></span><span className="main-menu__link-text">Материалы</span></Link></li>
                    <li className="main-menu__item"><Link to="/contacts" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-address-book"></i></span><span className="main-menu__link-text">Контакты</span></Link></li>
                  </ul>
                }

                {
                  (this.state.role === 'lease' || this.state.role === 'maintenance') &&
                  <ul className="main-menu__list">
                    <li className="main-menu__item"><Link to="/orders" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-images"></i></span><span className="main-menu__link-text">Заявки</span></Link></li>
                    <li className="main-menu__item"><Link to="/materials" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-images"></i></span><span className="main-menu__link-text">Материалы</span></Link></li>
                    <li className="main-menu__item"><Link to="/bills" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-credit-card"></i></span><span className="main-menu__link-text">Счета арендатора</span></Link></li>
                    <li className="main-menu__item"><Link to="/sales" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-stats-dots"></i></span><span className="main-menu__link-text">Отчет по товарообороту</span></Link></li>
                    <li className="main-menu__item"><Link to="/contacts" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-address-book"></i></span><span className="main-menu__link-text">Контакты</span></Link></li>
                  </ul>
                }

                {
                  this.state.role === 'marketing' &&
                  <ul className="main-menu__list">
                    <li className="main-menu__item"><Link to="/orders" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-images"></i></span><span className="main-menu__link-text">Заявки</span></Link></li>
                    <li className="main-menu__item"><Link to="/marketing" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-clipboard"></i></span><span className="main-menu__link-text">Маркетинговые активности</span></Link></li>
                    <li className="main-menu__item"><Link to="/materials" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-images"></i></span><span className="main-menu__link-text">Материалы</span></Link></li>
                    <li className="main-menu__item"><Link to="/bills" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-credit-card"></i></span><span className="main-menu__link-text">Счета арендатора</span></Link></li>
                    <li className="main-menu__item"><Link to="/contacts" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-address-book"></i></span><span className="main-menu__link-text">Контакты</span></Link></li>
                  </ul>
                }

                {
                  this.state.role === 'accountant' &&
                  <ul className="main-menu__list">
                    <li className="main-menu__item"><Link to="/contacts" className="main-menu__link"><span className="main-menu__link-icon"><i className="ar-icon ar-icon-address-book"></i></span><span className="main-menu__link-text">Контакты</span></Link></li>
                  </ul>
                }
              </nav>
            </div>
            <div className="aside-panel__footer">
              <div className="aside-panel__table-currency">
                <div className="b-table-info b-table-info_currency">
                  <div className="b-table-info__title"><span>Курс валют</span>
                </div>
                <div className="b-table-info__descr">
                  <table className="t-currency">
                    <tbody>
                      {
                        this.state.currencies.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>USD/{item.code}</td>
                              <td>{item.rate}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className={classNames("aside-panel__btn-add", {'hidden': this.state.role != 'tenant'})}>
              <a href="#id-order-popup" className="btn btn-default btn-green modal-show">Подать заявку</a>
            </div>
          </div>
        </div>
      </div>
    </aside>);
  }
};
