import autobind from 'autobind-decorator';

import React from 'react';

export default
class NumRange extends React.Component {
  constructor(props) {
    super(props);

    this.range = {};
  }

  @autobind
  onChange(e) {
    const onChange = this.props.onChange;
    const target = e.target;
    const name = target.name;

    let range = {};

    range.from = this.range.from;
    range.to = this.range.to;
    range[name] = target.value;

    if (range.to == null) { range.to = range.from; }
    else if (range.from == null) { range.from = range.to; }

    this.range = range;

    if (onChange != null) {
      onChange(range.from, range.to);
    }
  }

  render() {
    return (
      <div>
        <div className="tip">{this.props.title}</div>
        <div className="sum-wrap">
          <input type="text" name="from" id="scores-sum-from" className="doc-sum-from" placeholder="от" onChange={this.onChange} />
          <span>-</span>
          <input type="text" name="to" id="scores-sum-to" className="doc-sum-to" placeholder="до" onChange={this.onChange} />
        </div>
      </div>);
  }
};
