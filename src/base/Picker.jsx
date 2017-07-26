import React from 'react';
import ReactDOM from 'react-dom';

export default
class Picker extends React.Component {
  componentDidMount() {
    this.mountIfNeeded(this.props)
  }

  componentDidUpdate(prevProps, prevState) {
    this.mountIfNeeded(this.props)
  }

  mountIfNeeded(nextProps) {
    var elem = $(ReactDOM.findDOMNode(this));
    var children = elem.find('option');

    var limit = 0;

    if (this.props.prompt != null) {
      limit = 2;
    }

    if (children.length < limit) {
      return;
    }

    if (this.block != null) {
      return;
    }


    this.block = new Selectblock(elem.first());
    var tag = this.props.tag;

    this.block.onChange = (item) => {
      this.props.onChange(item, tag);
    };

    if (this.props.value != null) {
      this.block.setSelected(parseInt(this.props.value));
    }
  }

  refresh() {
    this.block.resetSelected();
  }

  reset() {
    this.block.resetSelected();
    this.block.removeAll();
    this.block = null;

    this.mountIfNeeded(this.props);
  }

  render() {
    return this.props.children;
  }
};
