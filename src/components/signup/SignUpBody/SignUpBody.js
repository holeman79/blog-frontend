import React from 'react';
import styles from './SignUpBody.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from "../../common/Button/Button";

const cx = classNames.bind(styles);

const SignUpBody = ({username, email, password, onSignUp, onChangeInput}) => {
    // const handleChange = (e) => {
    //     const { value, name } = e.target;
    //     onChangeInput({name, value});
    // }
    return(
        <div className={cx('signup-body')}>
            <div className={cx('content')}>
                <h1>Sign Up</h1>
                <div className={cx('input-box')}>
                    <div className={cx('input-title')}>User Name:</div>
                    <input name = 'username' autoFocus type="text" value={username} placeholder="Your name" onChange={onChangeInput}/>
                </div>
                <div className={cx('input-box')}>
                    <div className={cx('input-title')}>Email:</div>
                    <input name = 'email' type="text" value={email} placeholder="Your email" onChange={onChangeInput}/>
                </div>
                <div className={cx('input-box')}>
                    <div className={cx('input-title')}>Password:</div>
                    <input name = 'password' type="password" value={password} placeholder="password" onChange={onChangeInput}/>
                </div>
                {/*{error && <div className={cx('error')}>로그인 실패</div>} */}
                <button onClick={onSignUp}>Sign up</button>
            </div>
        </div>

    )
};

export default SignUpBody;