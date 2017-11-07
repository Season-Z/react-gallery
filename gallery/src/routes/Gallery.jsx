import { Component } from 'react';
import { connect } from 'dva';
import styles from './Gallery.less';

class Gallery extends Component {
  renderGallery = (dataList) => {
    return dataList && dataList.map((value, key) => {
      const { fileName, title, desc } = value;

      return (
        <section className={styles.stage} key={key}>
          <section className={styles.imgSec}></section>
          <nav className={styles.controllerNav}></nav>
        </section>
      );
    });
  };
  render() {
    const { dataList } = this.props;
    
    return (
      <div>{this.renderGallery(dataList)}</div>
    );
  }
}

export default connect(({ gallery }) => gallery)(Gallery);