import React from 'react';
import PropTypes from 'prop-types';

export default
class Fetch extends React.Component {
  static contextTypes = {
    axios: PropTypes.func,
    auth: PropTypes.object,
    modal: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {status: 'pending'};
    this.query = "";
  }

  componentDidMount() {
    this.updateIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateIfNeeded(nextProps);
  }

  forceUpdate() {
    this.query = "";
  }

  updateIfNeeded(props) {
    var nextProps = props;

    var params = nextProps.params;
    var query = "";

    if (params != null) {
      for (var name in params) {
        if (params[name] != null && params[name] != "") {
          query += "&" + name + "=" + params[name];
        }
      }
    }

    const modal = this.context.modal;
    const axios = this.context.axios;
    const token = this.context.auth.token;

    if (token == null || token.length == 0) {
      return;
    }

    var url = nextProps.url + "?token=" + token + query;

    if (this.query === url) {
      return;
    }


    this.query = url;

    axios.get(url).then((response) => {
      this.props.onComplete(response.data);
      this.setState({status: 'complete'});
      console.log(url);
    }).catch((e) => {
      if (modal != null) {
        modal.show('error');
      }
      console.log(e);
    });
  }

  render() {
    if (this.props.force == "true") {
      return this.props.children;
    }

    if (this.state.status == 'pending') {
      return <div></div>
    } else {
      return this.props.children;
    }
  }
}
