import React, {Component} from 'react';
import Footer from 'components/common/Footer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import { withRouter } from 'react-router-dom';

class FooterContainer extends Component {
    handleLoginClick = () => {
        const logged = localStorage.logged;
        const { BaseActions, history } = this.props;
        if(logged){
            try{
                localStorage.removeItem("accessToken");
                localStorage.logged = '';
                window.location.reload();
            }catch(e){
                console.log(e);
            }
            return;
        }
        history.push('/login');
        BaseActions.initializeLogin();
    }
    render() {
        const { handleLoginClick } = this;
        const logged = localStorage.logged;
        return (
            <Footer onLoginClick={handleLoginClick} logged={logged}/>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(FooterContainer));