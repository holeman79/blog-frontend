import React, {Component} from 'react';
import LoginModal from 'components/modal/LoginModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class LoginModalContainer extends Component {
    handleLogin = async () => {
        const { BaseActions, usernameOrEmail, password } = this.props;
        try{
            await BaseActions.login({usernameOrEmail, password});
            BaseActions.hideModal('login');
            localStorage.logged="true";
        }catch(e){
            console.log(e);
        }
    }

    handleCancel = () => {
        const { BaseActions } = this.props;
        BaseActions.hideModal('login');
    }
    handleChange = ({name, value}) => {
        const { BaseActions } = this.props;
        BaseActions.changeInput({name, value});
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
        usernameOrEmail: state.base.getIn(['loginModal', 'usernameOrEmail']),
        password: state.base.getIn(['loginModal', 'password']),
        error: state.base.getIn(['loginModal', 'error'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(LoginModalContainer);