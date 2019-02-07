import React, {Component} from 'react';
import LoginContainer from 'containers/login/LoginContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class Base extends Component {
    initialize = async () => {
        const { BaseActions } = this.props;
        if(localStorage.logged){
            BaseActions.tempLogin();
        }
        try {
            await BaseActions.checkLogin();
            localStorage.logged=true;
        }catch(e){
            localStorage.removeItem("accessToken");
            localStorage.logged='';
            debugger;
        }
    }
    componentDidMount(){
        this.initialize();
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Base);