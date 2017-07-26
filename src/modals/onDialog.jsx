import autobind from 'autobind-decorator';
import React from 'react';

export default
class OnDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {contents: []};
  }

  getItems() {
    return this.props.items || [];
  }

  @autobind
  onToggle(e) {
    const target = e.target;
    const index = target.getAttribute('data-id');

    const contents = this.state.contents;

    const ref = contents.indexOf(index);
    if (ref === -1) {
      contents.push(index);
    } else {
      contents.splice(ref, 1);
    }
  }

  @autobind
  onCommit(e) {
    e.preventDefault();

    const { onChange, tag } = this.props;
    const contents = this.state.contents;
    const items = this.getItems();

    let result = [];

    for (let i of contents) {
      let v = items.filter((j) => j.id == i);
      result = result.concat(v);
    }

    if (onChange != null) {
      onChange(result, tag);
    }
  }

  render() {
    return (
      <div id={this.props.name} className="modal-box dialog-popup">
        <div className="modal-area">
          <div className="modal-box__close-btn"></div>
          <div className="popup-content">
            <form action="#" id="ntf-c-add-center" name="ntf-c-add-center">
              <div className="form-heading">{this.props.title}</div>
              <ul className="ntf-c-recipient-filter-list">
                {
                  this.getItems().map((item, i) => {
                    const keyPath = this.props.path || 'name';

                    return (
                      <li key={i}>
                        <label>
                          <input type="checkbox" data-id={item.id} onChange={this.onToggle} />
                          <span className="customized-checkbox"></span>
                          <span>{item[keyPath]}</span>
                        </label>
                      </li>)
                  })
                }
              </ul>
              <div className="form-btn-row">
                <input className="form-btn-send" type="submit" value="Создать список" onClick={this.onCommit} />
              </div>
            </form>
          </div>
        </div>
      </div>);
  }
}
