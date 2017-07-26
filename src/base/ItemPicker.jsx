import autobind from 'autobind-decorator';
import classNames from 'classnames/bind';

import React from 'react';
import ReactDOM from 'react-dom';

import Picker from './Picker.jsx';

export default
class ItemPicker extends React.Component {
  getContents() {
    const prompt = this.props.prompt;
    const allowsMultiple = this.props.allowsMultiple || true;
    const keyPath = this.props.displayKey || 'name';

    if (this.props.prompt == null || allowsMultiple === "false") {
      return this.props.items || [];
    }

    let result = [{id: null}];
    result[0][keyPath] = 'Показать все';

    result = result.concat(this.props.items || []);

    return result;
  }

  getValue() {
    const { bind, value, prompt } = this.props;

    if (bind != null) {
      return bind.value();
    }

    if (value != null) {
      return value;
    }

    return (prompt != null) ? null : 0;
  }

  getStyle() {
    return this.props.style != null ?
        this.props.style : "select-block_form";
  }

  @autobind
  onChange(index) {
    var list = this.getContents();
    var tag = this.props.tag;
    var item = null;

    if (index == 0) {
      return;
    }

    var id = list[index - 1].id;
    var objects = this.props.objects;

    if (objects != null) {
      if (id != null) {
        item = objects.find(i => i.id == id);
      }
    }

    const { bind, onChange } = this.props;

    if (bind != null) {
      bind.action(id);
    }

    if (onChange != null) {
      onChange(id, tag, item);
    }
  }


  refresh() {
    this.refs.picker.refresh();
  }

  reset() {
    this.refs.picker.reset();
  }

  render() {
    const keyPath = this.props.displayKey || 'name';

    return (
      <Picker ref="picker" prompt={this.props.prompt} onChange={this.onChange} value={this.getValue()}>
        <div className={classNames('select-block', this.getStyle(), this.props.className)}>
          <select className="select">
            <option value="hide">{this.props.prompt}</option>
            {
              this.getContents().map(function(item, i) {
                return <option value={i} key={i}>{item[keyPath]}</option>
              })
            }
          </select>
        </div>
      </Picker>);
  }
};
