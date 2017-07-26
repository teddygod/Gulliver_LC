import React from 'react';
import ReactDOM from 'react-dom';

export default
class DatePicker extends React.Component {

  getDefaultRange() {
    if (this.props.placeholder != null) {
      return "";
    }

    return moment().subtract(1, 'month').format('DD.MM.YYYY') + ' - ' +
            moment().format('DD.MM.YYYY');
  }

  getPlaceholder() {
    return this.props.placeholder || "";
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.date != null) {
      this.date.unmount();
    }

    this.date = new DateRange(ReactDOM.findDOMNode(this), this.props.mode);

    this.date.onChange = (start, end) => {
      this.props.onChange(start, end);
    };
  }

  render() {
    return (
      <div className="range-calendar">
        <input type="text" name="daterange"
               defaultValue={this.getDefaultRange()}
               placeholder={this.props.placeholder} />
      </div>
    );
  }
};
