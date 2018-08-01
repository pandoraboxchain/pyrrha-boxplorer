import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';

import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

class PaginationBlock extends PureComponent {

    handlePaginationChange = (e, { activePage }) => {
        e.preventDefault();

        if (this.props.refreshAction) {

            this.props.refresh(this.props.refreshAction, activePage); 
        }        
    }

    render() {

        const { page, totalPages } = this.props;

        return(
            <Pagination 
                inverted 
                activePage={page}
                onPageChange={this.handlePaginationChange}
                totalPages={totalPages} />
        );
    }
}

PaginationBlock.defaultProps = {
    refreshAction: null,
    pageSelector: null,
    totalPagesSelector: null,
    page: 1,
    totalPages: 0
};

const mapStateToProps = (state, props) => {
        
    return {
        page: selectors[props.pageSelector](state),
        totalPages: selectors[props.totalPagesSelector](state)
    }
};

const mapDispatchToProps = dispatch => {

    return {
        refresh: (action, activePage) => dispatch(actions[action](activePage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationBlock);
