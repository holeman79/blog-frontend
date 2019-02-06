import React, {Component} from 'react';
import styles from './SignUpTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class SignUpTemplate extends Component {

    render() {
        const { children } = this.props;
        return (
            <div className={cx('signup-template')}>
                <main>
                    {children}
                </main>
            </div>
        );
    }
}

export default SignUpTemplate;