import React from 'react';
import { Fetch } from '../db';

export default
class OnError extends React.Component {
  render() {
    return (
      <div id="id-error" className="modal-box small-modal-box">
        <div className="modal-area">
          <div className="modal-box__close-btn"></div>
          <div className="popup-content">
            <div className="error-msg">
              <p>Ошибка при выполнение запроса.</p>
            </div>
            <div className="btn-center">
              <button className="btn btn-green modal-close">ОК</button>
            </div>
          </div>
        </div>
      </div>);
  }
}
