import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Footer = ({onLoginClick, logged}) => (
    <footer className={cx('footer')}>
        <Link to="/" className={cx('brand')}>reactblog</Link>
        <div className={cx('content')}>
            <div onClick={onLoginClick} className={cx('admin-login')}>
                {logged ? '로그아웃' : '로그인'}
            </div>
            <div className={cx('admin-login')}>
                {!logged && <Link to="/signup">회원가입</Link>}
            </div>
        </div>
    </footer>
)

export default Footer;