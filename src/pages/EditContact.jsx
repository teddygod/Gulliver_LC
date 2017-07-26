import autobind from 'autobind-decorator';
import update from 'react-addons-update';

import React from 'react';
import PropTypes from 'prop-types';
import { Input, ItemPicker, FilePicker } from '../base';
import { Link } from '../utils';
import { Fetch, Commit } from '../db';

export default
class EditContact extends React.Component {
  constructor(props) {
    super(props);

    const id = this.props.match.id;
    let url = '';

    if (id == null) {
      url = '/contacts/add';
    } else {
      url = '/contacts/update';
    }

    this.state = {
      stores: [], positions: [],
      url: url, valid: {}, profile: {}
    };

    this.request = {fio: '', sec_id: 0, position: 0};
  }

  @autobind
  onComplete(data) {
    const user = data.defaulData.user;
    const profile = user.profile;
    const department = user.type.departamentId;
    const directory = data.defaulData.directory;

    this.request = {
      fio: profile.fio, sec_id: 0,
      mail: profile.email, phone: profile.phone
    };

    user.photo = profile.photo || "/img/mng-photo-2.jpg";

    this.setState({
      profile: user,
      stores: directory.sec,
      positions: directory.departament[department].position
    });
  }

  @autobind
  onPickerChange(id, tag) {
    this.request[tag] = id;
  }

  @autobind
  onFileChange(file, upload) {
    const dataUri = upload.target.result;

    this.setState({
      profile: update(this.state.profile, {
        photo: {$set: dataUri}
      })
    });
  }

  @autobind
  onCommit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Fetch url="/user/profile" onComplete={this.onComplete}>
        <section className="contact">
          <div className="container-fluid">
            <div className="row">
              <div className="contact__title">
                <h1 className="title title_grey">Контакты</h1>
              </div>
            </div>
            <div className="row">
              <div className="contact__filters-wrap">
                <div className="contact__filter">
                  <ItemPicker prompt="Выбрать ТРК" allowsMultiple="false"
                              items={this.state.stores} bind={Link.to(this, 'request.sec')} />
                </div>
                <div className="contact__filter">
                </div>
              </div>
            </div>
            <div className="row">
              <div className="contact__lkm-form">
                <form action="#" className="contact-lkm-form">
                  <div className="contact-lkm-form__col">
                    <div className="contact-lkm-form__input">
                      <label htmlFor="lkm-name">ФИО</label>
                      <div className="input-group">
                        <Input id="lkm-name" type="text" name="FIO" valid={this.state.valid.fio}
                               className="form-control" bind={Link.to(this, 'request.fio')} />
                      </div>
                    </div>
                    <div className="contact-lkm-form__input">
                      <label htmlFor="lkm-name">Должность</label>
                      <div className="input-group">
                        <ItemPicker prompt="Должность" displayKey="position" allowsMultiple="false"
                                    items={this.state.positions} bind={Link.to(this, 'request.position')} />
                      </div>
                    </div>
                    <div className="contact-lkm-form__input">
                      <label htmlFor="lkm-pos">Email</label>
                      <div className="input-group">
                        <Input id="lkm-name" type="text" name="Email" valid={this.state.valid.email}
                               className="form-control" bind={Link.to(this, 'request.email')}/>
                      </div>
                    </div>
                    <div className="contact-lkm-form__input">
                      <label htmlFor="lkm-tel">Контактный телефон</label>
                      <div className="input-group">
                        <Input id="lkm-tel" type="text" name="tel" valid={this.state.valid.phone}
                               className="form-control" bind={Link.to(this, 'request.phone')}/>
                      </div>
                    </div>
                    <div className="contact-lkm-form__submit">
                      <Commit url={this.state.url} params={this.request} className="btn btn-default btn-blue">Сохранить изменения</Commit>
                    </div>
                  </div>
                  <div className="contact-lkm-form__col">
                    <div className="contact-lkm-form__photo-load">
                      <div className="thumbnail"><img src={this.state.profile.photo} alt="Manager"/></div>
                      <label htmlFor="input-file" className="label-upload"> <span className="label-upload__btn"><span><i className="ar-icon ar-icon-download2"></i></span>Загрузить новое фото профиля</span>
                      <FilePicker placeholder="Выберите файл" className="label-upload__input-file"
                                  bind={Link.to(this, 'request.photo')}
                                  onChange={this.onFileChange} />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fetch>);
  }
}
