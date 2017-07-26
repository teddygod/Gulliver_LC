import React from 'react';
import { Link } from 'react-router-dom';

export default
class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer__text"><Link to="/promotion">Дополнительное продвижение бренда</Link></div>
            <div className="footer__bot-helper"><img src="img/bot-helper.jpg" alt=""/></div>
          </div>
        </div>
      </footer>
    );
  }
};
