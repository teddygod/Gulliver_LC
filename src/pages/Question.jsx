import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';

import React from 'react';
import { Commit } from '../db';
import { Link, Validate } from '../utils';
import { TextArea } from '../base';

export default
class Question extends React.Component {
  static contextTypes = { modal: PropTypes.object }

  constructor(props) {
    super(props);

    this.request = {message: null};
    this.state = {valid: {}};
  }

  componentDidMount() {
    this.context.modal.onShow(this.onShowModal);
  }

  @autobind
  onShowModal() {
    this.request = {message: null};
    this.forceUpdate();
  }

  render() {
    return (
      <div id="id-ask-question" className="modal-box">
        <div className="modal-area">
          <div className="modal-box__close-btn"></div>
          <div className="popup-content">
            <form action="#" method="post" id="ask-question-form" name="ask-question-form">
              <div className="form-heading">Задать вопрос</div>
              <TextArea name="ask-question-text" id="ask-question-text"
                        placeholder="Ваш вопрос"
                        bind={Link.to(this, 'request.message')}
                        valid={this.state.valid.message}>

              </TextArea>
              <div className="form-btn-row">
                <Commit url="/questions" params={this.request}
                        validate={Validate.props(this, {'presence': ['message']})}
                        className="form-btn-send">
                  Отправить
                </Commit>
              </div>
            </form>
          </div>
        </div>
      </div>);
  }
}
