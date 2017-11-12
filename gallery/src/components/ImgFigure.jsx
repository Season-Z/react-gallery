/**
 * 渲染图片组件
 */
import { Component, PropTypes } from 'react';
import styles from '../routes/Gallery.less';

class ImgFigure extends Component {
  static PropTypes = {
    fileName: PropTypes.string,
    title: PropTypes.string
  };
  
  render() {
    const { fileName, title } = this.props;

    return (
      <div>
        <figure className={styles.imgFigure}>
          {/* 使用require来引入图片文件 */}
          <img src={require(`../assets/${fileName}`)} alt={title} />
          <figcaption>
            <h2 className={styles.imgTitle}>{title}</h2>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default ImgFigure;