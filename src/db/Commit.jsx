import autobind from 'autobind-decorator';

import React from 'react';
import PropTypes from 'prop-types';

export default
class Commit extends React.Component {
  static contextTypes = {
    axios: PropTypes.func,
    modal: PropTypes.object,
    auth: PropTypes.object
  }

  constructor(props) {
      super(props);
  }

  @autobind
  onCommit(e) {
    e.preventDefault();

    const validate = this.props.validate;
    const params = this.props.params;

    if (validate != null) {
      let result = validate.action(params);
      if (result === false) { return; }
    }

    const axios = this.context.axios;
    const token = this.context.auth.token;
    const url = this.props.url + "?token=" + token;
    const multipart = this.props.multipart;
    var config = {};

    var data = new FormData();

    for (var name in params) {
      if (params[name] != null && params[name] != "") {
        if (name.endsWith('[]')) {
          for (let i of params[name]) {
            data.append(name, i);
          }
        } else {
          data.append(name, params[name]);
        }
      }
    }

    if (multipart == "true") {
      config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
    }

    console.log(params);

    axios.post(url, data, config)
        .then(this.onSuccess).catch(this.onError);
  }

  @autobind
  onSuccess(response) {
    const onComplete = this.props.onComplete;
    const silent = this.props.silent || false;
    const modal = this.context.modal;
    const data = response.data || {};
    const status = data.status;

    if (status === 'failure') {
      this.onError(null);
      return;
    }

    if (!silent) {
      modal.show('thank-you');
    }

    if (onComplete != null) {
      onComplete(response.data);
    }

    console.log(response);
  }

  @autobind
  onError(e) {
    console.log(e);
    const modal = this.context.modal;
    modal.show('error');
  }

  render() {
    if (this.props.custom) {
      return (
      <div onClick={this.onCommit}>
        {this.props.children}
      </div>);
    }

    return (
      <button type="submit" onClick={this.onCommit} className={this.props.className}>{this.props.children}</button>
    );
  }
};
