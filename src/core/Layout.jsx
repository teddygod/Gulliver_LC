import autobind from 'autobind-decorator';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default
class Layout extends React.Component {
  static childContextTypes = {
    modal: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.observers = [];
  }

  componentDidMount() {
    this.modal = new Modal(".popup_on", this.onShow);
  }

  getChildContext() {
    return {
      modal: {
        onShow: this.addObserver,
        show: this.showModal,
        close: this.closeModal,
        mount: this.refreshModal
      }
    };
  }

  @autobind
  onShow() {
    for (let i of this.observers) { i(); }
  }

  @autobind
  addObserver(callback) { this.observers.push(callback); }

  @autobind
  showModal(id) { this.modal.showModal(id); }

  @autobind
  closeModal() { this.modal.closeModal(); }

  @autobind
  refreshModal() {
    if (this.modal == null) {return;}

    this.modal.unmount();
    this.modal = new Modal(".popup_on", this.onShow);
  }

  render() { return this.props.children; }
}
