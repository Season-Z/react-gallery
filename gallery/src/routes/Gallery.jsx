import { Component, PropTypes } from 'react';
import { connect } from 'dva';
import ImgFigure from '../components/ImgFigure';
import styles from './Gallery.less';

/**
 * 获取区间内一个随机数
 * @param {*} low 
 * @param {*} high 
 */
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

class Gallery extends Component {
  static PropTypes = {
    dataList: PropTypes.array
  };

  state = {
    imgsArrangeArr: [],
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

      imgsArrangeTopArr = [],
      topImgNum = Math.ceil(Math.random() * 2), // 取一个或者不取
      
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
      
    // 居中centerIndex的图片
    imgsArrangeCenterArr[0].pos = centerPos;
    let topImgSpliceIndex = 0;

    // 取出要布局上侧的图片的状态信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum))
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index].pos = {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      }
    });

    // 布局左右两侧的图片
    
  };
  // 渲染每个图片
  renderImgFigure = (dataList) => {
    return dataList && dataList.map((value, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          left: 0,
          top: 0,
        };
      }
      return (
        <div key={index}>
          <ImgFigure {...value} ref={`imgFigure${index}`} />
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
      top: halfStageH - halfImgH,
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
  Constant = {
    // 中心区域的图片坐标
    centerPos: {
      left: 0,
      right: 0,
    },
    // 水平方向上的取值范围，左分区，右分区
    hPosRange: {
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0],
    },
    // 垂直方向上的取值范围，上分区
    vPosRange: {
      x: [0, 0],
      topY: [0, 0],
    },
  };
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