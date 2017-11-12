import { Component, PropTypes } from 'react';
import { connect } from 'dva';
import ImgFigure from '../components/ImgFigure';
import styles from './Gallery.less';

class Gallery extends Component {
  static PropTypes = {
    dataList: PropTypes.array
  };

  // 渲染每个图片
  renderImgFigure = (dataList) => {
    return dataList && dataList.map((value, key) => {
      
      return (
        <div key={key}>
          <ImgFigure {...value} />
        </div>
      );
    });
  };
  
  render() {
    const { dataList } = this.props;

    return (
      <div>
        <section className={styles.stage}>
          <section className={styles.imgSec}>
            {this.renderImgFigure(dataList)}
          </section>
          <nav className={styles.controllerNav}></nav>
        </section>
      </div>
    );
  }
}

export default connect(({ gallery }) => gallery)(Gallery);