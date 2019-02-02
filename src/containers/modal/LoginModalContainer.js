import React, {Component} from 'react';
import LoginModal from 'components/modal/LoginModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class LoginModalContainer extends Component {
    handleLogin = async () => {
        const { BaseActions, loginId, password } = this.props;
        try{
            await BaseActions.login({loginId, password});
            BaseActions.hideModal('login');
        }catch(e){
            console.log(e);
        }
    }

    handleCancel = () => {
        const { BaseActions } = this.props;
        BaseActions.hideModal('login');
    }
    handleChange = (e) => {
        const { value } = e.target;
        const { BaseActions } = this.props;
        BaseActions.changePasswordInput(value);
    }
    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.handleLogin();
        }
    }
    render() {
        const {
            handleLogin, handleCancel, handleChange, handleKeyPress
        } = this;
        const { visible,error, loginId, password } = this.props;

        return (
            <LoginModal
                onLogin={handleLogin} onCancel={handleCancel}
                onChange={handleChange} onKeyPress={handleKeyPress}
                visible={visible} error={error} loginId= {loginId} password={password}
            />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['modal', 'login']),
        loginId: state.base.getIn(['loginModal', 'loginId']),
        password: state.base.getIn(['loginModal', 'password']),
        error: state.base.getIn(['loginModal', 'error'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(LoginModalContainer);