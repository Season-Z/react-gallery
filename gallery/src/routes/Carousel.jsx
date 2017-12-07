import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import styles from './Carousel.less';

class Carousel extends PureComponent {
    state = {
        data: [
            {
                firTitle: '123',
                secTitle: '234',
                url: '1.jpg'
            },
            {
                firTitle: '123',
                secTitle: '234',
                url: '2.jpg'
            },
            {
                firTitle: '123',
                secTitle: '234',
                url: '3.jpg'
            },
            {
                firTitle: '123',
                secTitle: '234',
                url: '4.jpg'
            },
            {
                firTitle: '123',
                secTitle: '234',
                url: '5.jpg'
            },
            {
                firTitle: '123',
                secTitle: '234',
                url: '6.jpg'
            },
            {
                firTitle: '123',
                secTitle: '234',
                url: '7.jpg'
            }
        ],
        activeKey: 0
    };
    render () {
        const { data } = this.state;
        const imgDOM = [], ctrlBtn = [];
        
        data && data.forEach(({ firTitle, secTitle, url }, key) => {
            const picture = (
                <div 
                    className={classnames({ 
                        [styles.mainItem]: true
                    })} key={key}
                >
                    <img src={require(`../img/${url}`)} alt="轮播图" />
                    <div className={styles.firTitle}>{firTitle}</div>
                    <div className={styles.secTitle}>{secTitle}</div>
                </div>
            );
            const btn = (
                <span 
                    className={classnames({ [styles.ctrlItem]: true, [styles.activeCtrlItem]: true })} 
                    key={key}
                >
                    <img src={require(`../img/${url}`)} alt="轮播图" />
                </span>
            );
            
            imgDOM.push(picture);
            ctrlBtn.push(btn);
        });
        
        return (
            <div className={styles.content}>
                <div className={styles.main}>
                    {imgDOM}
                    <img src={require(`../img/${url}`)} alt="轮播图" />
                </div>
                <div className={styles.ctrl}>
                    {ctrlBtn}
                </div>
            </div>
        );
    }
}

export default connect()(Carousel);