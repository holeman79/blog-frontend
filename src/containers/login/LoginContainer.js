import React, {Component} from 'react';
import Login from 'components/login/Login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import { withRouter } from 'react-router-dom';

class LoginContainer extends Component {
    handleLogin = async () => {
        const { BaseActions, usernameOrEmail, password, history } = this.props;
        try{
            await BaseActions.login({usernameOrEmail, password});
            history.push('/');
        }catch(e){
            console.log(e);
        }
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
            handleLogin, handleChange, handleKeyPress
        } = this;
        const { visible,error, loginId, password } = this.props;

        return (
            <Login
                onLogin={handleLogin}
                onChange={handleChange} onKeyPress={handleKeyPress}
                visible={visible} error={error} loginId= {loginId} password={password}
            />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['modal', 'login']),
        usernameOrEmail: state.base.getIn(['login', 'usernameOrEmail']),
        password: state.base.getIn(['login', 'password']),
        error: state.base.getIn(['login', 'error'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(LoginContainer));