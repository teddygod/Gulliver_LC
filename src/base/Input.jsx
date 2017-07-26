import classNames from 'classnames/bind';

import React from 'react';
import ReactDOM from 'react-dom';

export default
class Input extends React.Component {
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

  render() {
    const {
      name, type, id, className,
      bind, valid, placeholder
    } = this.props;

    const isValid = (valid == null || valid == true || valid == 1);

    return (<input ref="me" id={id} name={name} className={classNames(className, {'invalid': !isValid})}
                   type={type} placeholder={placeholder}
                   defaultValue={bind.value()} onChange={(e) => bind.action(e.target.value)} />);
  }
}
