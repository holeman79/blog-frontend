import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import SignUpTemplate from "../../components/signup/SignUpTemplate/SignUpTemplate";
import SignUpBody from 'components/signup/SignUpBody';
import { withRouter } from 'react-router-dom';

class SignUpContainer extends Component {
    handleChangeInput = (e) =>{
        const { BaseActions } = this.props;
        const { value, name } = e.target;
        BaseActions.changeInputSignUp({name, value});
    }

    handleSignUp = async() => {
        const { username, email, password, history, BaseActions } = this.props;
        try{
            await BaseActions.signUp({username, email, password});
            history.push('/');
        }catch(e){
            console.log(e);
        }
    }

    render() {
        const { username, email, password } = this.props;
        const { handleSignUp, handleChangeInput } = this;
        return (
            <div>
                <SignUpBody username={username} email={email} password={password} onSignUp={handleSignUp} onChangeInput={handleChangeInput}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        username: state.base.getIn(['signUp', 'username']),
        email: state.base.getIn(['signUp', 'email']),
        password: state.base.getIn(['signUp', 'password']),
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(withRouter(SignUpContainer));
