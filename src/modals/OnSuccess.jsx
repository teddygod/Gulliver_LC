import React from 'react';
import { Fetch } from '../db';

export default
class OnSuccess extends React.Component {   
  render() {
    return (
      <div id="id-thank-you" className="modal-box small-modal-box">
        <div className="modal-area">
          <div className="modal-box__close-btn"></div>
          <div className="popup-content">
            <div className="thank-you-msg">
              <p>Ваш запрос успешно выполнен.</p>
            </div>
            <div className="btn-center">
              <button className="btn btn-green modal-close">ОК</button>
            </div>
          </div>
        </div>
      </div>);
  }
}
