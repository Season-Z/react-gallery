import { Component, PropTypes } from 'react';
import { connect } from 'dva';
import ImgFigure from '../components/ImgFigure';
import styles from './Gallery.less';

class Gallery extends Component {
  static PropTypes = {
    dataList: PropTypes.array
  };
  Constant = {
    // 中心区域的图片坐标
    centerPos: {
      left: 0,
      right: 0
    },
    // 水平方向上的取值范围，左分区，右分区
    hPosRange: {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    // 垂直方向上的取值范围，上分区
    vPosRange: {
      x: [0, 0],
      topY: [0, 0]
    }
  };

  state = {
    imgsArrangeArr: []
  };
  
  /**
   * 指定居中centerIndex
   */
  rearrange = (centerIndex) => {
    const { imgsArrangeArr } = this.state;
    const { centerPos, vPosRange, hPosRange } = this.Constant;
    const hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,

      imgsArrangeArr
  };
  
  // 渲染每个图片
  renderImgFigure = (dataList) => {
    return dataList && dataList.map((value, key) => {
      if (!this.state.imgsArrangeArr[key]) {
        this.state.imgsArrangeArr[index] = {
          left: 0,
          top: 0
        };
      }
      
      return (
        <div key={key}>
          <ImgFigure {...value} ref={`imgFigure${key}`} />
        </div>
      );
    });
  };
  
  componentDidMount() {
    const stageDOM = this.refs.stage,
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);
    
    const imgFigureDOM = this.refs.imgFigure0,
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    };
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfImgW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfImgW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }
  
  render() {
    const { dataList } = this.props;

    return (
      <div>
        <section className={styles.stage} ref="stage">
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