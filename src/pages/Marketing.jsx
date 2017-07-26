import autobind from 'autobind-decorator';

import React from 'react';
import PropTypes from 'prop-types';
import { ItemPicker, FilePicker } from '../base';
import { Fetch } from '../db';

export default
class Marketing extends React.Component {
  static contextTypes = {
    axios: PropTypes.func,
    auth: PropTypes.object,
    modal: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      stores: [], events: [],
      contents: {}
    };
  }

  @autobind
  onStoreChange(id) {
    const events = this.state.events;
    const item = events.find((i) => i.sec_id == id);

    this.setState({ contents: item });
  }

  @autobind
  onComplete(data) {
    this.setState({
      stores: data.directory.sec,
      events: data.events,
      contents: data.events[0]
    });
  }

  @autobind
  onFileChange(file, upload) {
    const axios = this.context.axios;
    const token = this.context.auth.token;
    const sec = this.state.contents.sec_id;
    const url = '/events/update?token=' + token;

    let data = new FormData();
    data.append('sec', sec);
    data.append('photo', file);

    axios.post(url, data)
      .then(this.onSuccess)
      .catch(this.onError);
  }

  @autobind
  onSuccess(response) {
    const modal = this.context.modal;
    const data = response.data || {};
    const status = data.status;

    if (status === 'failure') {
      this.onError();
      return;
    }

    modal.show('thank-you');
  }

  @autobind
  onError() {
    const modal = this.context.modal;
    modal.show('error');
  }

  render() {
    return (
      <Fetch url="/events" onComplete={this.onComplete}>
        <section className="mark-actions">
          <div className="container-fluid">
            <div className="row">
              <div className="mark-actions__title">
                <h1 className="title title_grey">Маркетинговые мероприятия</h1>
              </div>
            </div>
            <div className="row">
              <div className="b-table-info__select pad-row">
                <ItemPicker items={this.state.stores} onChange={this.onStoreChange} />
              </div>
              <div className="mark-actions__table">
                <div className="b-table-info b-table-info_mark-actions">
                  <div className="b-table-info__descr">
                    <img src={this.state.contents.file} alt="tb"/>
                  </div>
                </div>
              </div>
              <div className="mark-actions__btn">
                <label htmlFor="input-file" className="label-upload">
                  <span className="btn btn-default btn-blue">Обновить изображения</span>
                </label>

                <FilePicker className="label-upload__input-file"
                            placeholder="Обновить изображения"
                            onChange={this.onFileChange} />
              </div>
            </div>
          </div>
        </section>
      </Fetch>);
  }
}
