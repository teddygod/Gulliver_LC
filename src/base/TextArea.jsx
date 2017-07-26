import classNames from 'classnames/bind';

import React from 'react';
import ReactDOM from 'react-dom';

export default
class TextArea extends React.Component {
  componentWillReceiveProps(nextProps) {
    const elem = this.refs.me;
    const bind = nextProps.bind;

    if (elem.value != null && bind != null) {
      const value = bind.value();
      if (value == null) {
        elem.value = '';
      }
    }
  }

  refresh() {
    this.refs.me.value = '';
  }

  render() {
    const {
      name, placeholder, id,
      rows, cols,
      className, bind, valid
    } = this.props;

    const isValid = (valid == null || valid == true || valid == 1);

    return (<textarea ref="me" id={id} name={name} placeholder={placeholder}
                      rows={rows} cols={cols}
                      className={classNames(className, {'invalid': !isValid})}
                      defaultValue={bind.value()} onChange={(e) => bind.action(e.target.value)} />);
  }
}
