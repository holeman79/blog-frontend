import React from 'react';
import SignUpTemplate from "../components/signup/SignUpTemplate/SignUpTemplate";
import SignUpContainer from 'containers/signup/SignUpContainer';
import ListWrapper from "../components/list/ListWrapper/ListWrapper";
import HeaderContainer from 'containers/common/HeaderContainer'

const SignUpPage = () => {
    return (
        <SignUpTemplate>
            <HeaderContainer/>
            <ListWrapper>
                <SignUpContainer/>
            </ListWrapper>
        </SignUpTemplate>
    );
};

export default SignUpPage;