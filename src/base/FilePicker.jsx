import autobind from 'autobind-decorator';

import React from 'react';
import ReactDOM from 'react-dom';

export default
class FilePicker extends React.Component {

  @autobind
  onChange(e) {
    const { bind, onChange } = this.props;

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      if (bind != null) {
        bind.action(file);
      }

      if (onChange != null) {
        onChange(file, upload);
      }
    };

    reader.readAsDataURL(file);
  }

  render() {
    const id = this.props.id || "input-file";

    return (
      <input type="file" name={id} id={id}
             placeholder={this.props.placeholder}
             className={this.props.className}
             onChange={this.onChange} />
    );
  }
};
