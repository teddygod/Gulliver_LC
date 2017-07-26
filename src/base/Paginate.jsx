import React from 'react';
import ReactDOM from 'react-dom';

import ReactPaginate from 'react-paginate';

export default
class Paginate extends React.Component {
    render() {
        return (
          <ReactPaginate previousLabel={<span href="#" className="fa fa-angle-double-left"></span>}
                         nextLabel={<span href="#" className="fa fa-angle-double-right"></span>}
                         breakLabel={<a href="">...</a>}
                         breakClassName={"break-me"}
                         pageCount={this.props.pageCount}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={this.props.onPageChange}
                         containerClassName={"section-pagination"}
                         subContainerClassName={"pages pagination"}
                         activeClassName={"active"} />
        );
    }
}
