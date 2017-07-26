import autobind from 'autobind-decorator';

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

var instance = axios.create();

export default
class Store extends React.Component {
  static childContextTypes = { axios: PropTypes.func }

  constructor(props) {
    super(props);
    axios.defaults.baseURL = 'http://portal-api.sproduccion.com';
  }

  getChildContext() {
    return { axios: axios };
  }

  render() {
    return this.props.children;
  }
}
