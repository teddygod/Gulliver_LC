import autobind from 'autobind-decorator';
import update from 'react-addons-update';

import React from 'react';
import { Fetch } from '../db';

export default
class Promotion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {contents: []};
  }

  @autobind
  onComplete(data) {
    this.setState({
      contents: data.promotionList
    });
  }

  render() {
    return (
      <Fetch url="/brand-promotion" onComplete={this.onComplete}>
      <section className="brands-promotion">
        {
          this.state.contents.map((item, i) => {
            return (
              <div className="bp-item" key={i}>
                <div className="item-image"><img src={item.img} alt=" " /></div>
                <div className="item-heading">
                  <h3>{item.name}</h3>
                </div>
                <div className="item-content">
                  <p>{item.description}</p>
                </div>
                <div className="bp-trigger">
                  <img src="./img/red-tr-arrow.svg" />
                </div>
                <div className="promotion-btn-holder"><a href="#" className="promotion-btn">Заказать</a></div>
              </div>
            )
          })
        }
      </section>
    </Fetch>);
  }
};
