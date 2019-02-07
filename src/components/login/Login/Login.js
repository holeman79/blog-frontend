import React from 'react';
import styles from './Login.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Login = ({visible, usernameOrEmail, password, error, onLogin, onChange, onKeyPress}) => {
    const handleChange = (e) => {
        const { value, name } = e.target;
        onChange({name, value});
    }
    return(
        <div className={cx('form')}>
            {/*<div onClick={onCancel} className={cx('close')}>&times;</div>*/}
            <div className={cx('title')}>로그인</div>
            <div className={cx('description')}>아이디, 비밀번호를 입력하세요</div>
            <input name = 'usernameOrEmail' autoFocus type="text" placeholder="아이디 입력" value={usernameOrEmail} onChange={handleChange}
                   onKeyPress={onKeyPress}/>
            <input name = 'password' type="password" placeholder="비밀번호 입력" value={password} onChange={handleChange} onKeyPress={onKeyPress}/>
            {error && <div className={cx('error')}>로그인 실패</div>}
            <div className={cx('login')} onClick={onLogin}>로그인</div>
        </div>
    )
};

export default Login;