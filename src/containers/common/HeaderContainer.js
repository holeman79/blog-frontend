import React, {Component} from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';

import * as baseActions from 'store/modules/base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HeaderContainer extends Component {
    handleRemove = () => {
        const { BaseActions } = this.props;
        BaseActions.showModal('remove');
    }
    handleEditPost = () => {
        const { BaseActions, history } = this.props;
    }
    render() {
        const { handleRemove } = this;
        const { match } = this.props;
        const logged = localStorage.logged;
        const { id } = match.params;
        return (
            <Header
                postId={id}
                logged={logged}
                onRemove={handleRemove}
            />
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(HeaderContainer));