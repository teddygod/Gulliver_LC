import autobind from 'autobind-decorator';
import update from 'react-addons-update';

import React from 'react';
import { ItemPicker } from '../base';
import { Fetch } from '../db';

export default
class Materials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {contents: null, item: null};
  }

  getContents() {
    if (this.state.item === null) {
      return [];
    }

    return this.state.item.materials;
  }

  @autobind
  onStoreChange(id, tag, item) {
    this.setState({ item: item });
  }

  @autobind
  onComplete(data) {
    this.setState({
      stores: data.directory.sec,
      contents: data.materialList,
      item: data.materialList[0]
    });
  }

  render() {
    return (
      <Fetch url="/materials" onComplete={this.onComplete}>
      <section className="materials">
        <div className="container-fluid">
          <div className="row">
            <div className="materials__title">
              <h1 className="title title_green">Метериалы</h1>
            </div>
          </div>
          <div className="row">
            <div className="materials__table">
              <div className="b-table-info b-table-info_materials">
                <div className="b-table-info__descr">
                  <div className="b-table-info__select">
                    <ItemPicker items={this.state.stores} objects={this.state.contents} onChange={this.onStoreChange} />
                  </div>
                  <table className="t-materials t-materials_full">
                    <tbody>
                      {
                        this.getContents().map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{item.name}</td>

                              { item.type === "text" && <td>{item.text}</td> }
                              { item.type === "download" && <td><a href={item.file} className="btn btn-default btn-blue">Скачать</a></td> }
                              { item.type === "dowload-view" &&
                              <td>
                                <a href="#" data-toggle="modal" data-target="#modal-materials_1" className="btn btn-default btn-grey">Посмотреть</a>
                                <a href={item.file} className="btn btn-default btn-blue">Скачать</a>
                              </td>
                            }
                          </tr>
                        )})
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fetch>);
  }
};
