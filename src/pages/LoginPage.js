import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ListWrapper from "../components/list/ListWrapper/ListWrapper";
import LoginContainer from 'containers/login/LoginContainer'

const LoginPage = () => {
    return (
        <PageTemplate>
            <LoginContainer/>
        </PageTemplate>
    );
};

export default LoginPage;