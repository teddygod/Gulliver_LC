import autobind from 'autobind-decorator';
import update from 'react-addons-update';

import React from 'react';
import { Fetch, Commit } from '../db';
import { Input, FilePicker } from '../base';
import { Link, Validate } from '../utils';

export default
class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {profile: {}, valid: {}};

    this.request = {
      phone: '', photo: '',
      old_password: '', new_password: '',
      re_password: ''
    };
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
  onComplete(data) {
    const profile = data.defaulData.user.profile;
    this.request.phone = profile.phone;
    this.request.photo = profile.photo;

    this.setState({ profile: profile });
  }

  render() {
    return (
      <Fetch url="/user/profile" onComplete={this.onComplete}>
      <section className="prof-settings prof-settings_lkm">
        <div className="container-fluid">
          <div className="row">
            <div className="prof-settings__title">
              <h1 className="title title_grey">Настройки профиля</h1>
            </div>
          </div>
          <div className="row">
            <div className="prof-settings__prof-form">
              <form action="#" method="GET" className="prof-form">
                <div className="row">
                  <div className="prof-form__col">
                    <div className="prof-form__input">
                      <label htmlFor="lkm-mail">Email</label>
                      <div className="input-group">
                        <input id="lkm-mail" type="text" name="Email" disabled="disabled" value={this.state.profile.email} className="form-control"/>
                      </div>
                    </div>
                    <div className="prof-form__input">
                      <label htmlFor="pass-o">Старый пароль</label>
                      <div className="input-group">
                        <Input id="pass-o" type="password" name="password" valid={this.state.valid.old_password}
                               className="form-control" bind={Link.to(this, 'request.old_password')} />
                      </div>
                    </div>
                    <div className="prof-form__input">
                      <label htmlFor="pass-n">Новый пароль</label>
                      <div className="input-group">
                        <Input id="pass-n" type="password" name="new_password" valid={this.state.valid.new_password}
                               className="form-control" bind={Link.to(this, 'request.new_password')} />
                      </div>
                    </div>
                    <div className="prof-form__input">
                      <label htmlFor="pass-r">Подтверждение пароля</label>
                      <div className="input-group">
                        <Input id="pass-r" type="password" name="re_password" valid={this.state.valid.re_password}
                               className="form-control" bind={Link.to(this, 'request.re_password')} />
                      </div>
                    </div>
                  </div>
                  <div className="prof-form__col">
                    <div className="prof-form__input">
                      <label htmlFor="lkm-name">ФИО</label>
                      <div className="input-group">
                        <input id="lkm-tel" type="text" name="FIO" disabled="disabled" value={this.state.profile.fio} className="form-control" />
                      </div>
                    </div>
                    <div className="prof-form__input">
                      <label htmlFor="prf-name">Контактный телефон</label>
                      <div className="input-group">
                        <Input id="prf-tel" type="text" name="phone" valid={this.state.valid.phone}
                               className="form-control" bind={Link.to(this, 'request.phone')} />
                      </div>
                    </div>
                  </div>
                  <div className="prof-form__col">
                    <div className="prof-form__photo-load">
                      <div className="thumbnail"><img src={this.state.profile.photo} alt="Manager"/></div>
                      <label htmlFor="input-file" className="label-upload"> <span className="label-upload__btn"><span><i className="ar-icon ar-icon-download2"></i></span>Загрузить новое фото профиля</span></label>
                      <FilePicker placeholder="Выберите файл" className="label-upload__input-file"
                                  bind={Link.to(this, 'request.photo')}
                                  onChange={this.onFileChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="prof-form__col">
                  <div className="prof-form__submit">
                    <Commit url="/user/update" params={this.request}
                            validate={Validate.props(this, {'presence': ['phone', 'old_password', 'new_password', 're_password'], 'equals': ['new_password', 're_password']})}
                            className="btn btn-default btn-blue">
                      Сохранить изменения
                    </Commit>
                  </div>
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
