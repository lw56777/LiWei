export default `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>画图</title>
</head>
<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

.tools {
  width: 100%;
  border-bottom: solid 1px #555;
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 100;
}

.tools-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.eraser-icon {
  display: none;
  box-sizing: border-box;
  border: 1px solid #ccc;
  position: fixed;
  z-index: 99;
}
</style>
<body>
  <ul class="tools">
    <li class="tools-item">
      <span>选择画笔颜色：</span>
      <input
        id="lineColorInput"
        type="color"
      />
    </li>

    <li class="tools-item">
      <span>选择线条粗细：</span>
      <input
        id="lineWidthInput"
        type="range"
        min="1"
        max="10"
        value="1"
        step="1"
      />
      <span id="lineWidthValue">1</span>
    </li>

    <li class="tools-item">
      <span>橡皮擦：</span>
      <button id="eraserButton">橡皮擦</button>
      <input
        id="eraserSizeInput"
        type="range"
        min="10"
        max="100"
        value="10"
        step="1"
      />
      <span>大小：</span>
      <span id="eraserSizeValue">10</span>
      <i
        class="eraser-icon"
        id="eraserIcon"
      ></i>
    </li>

    <li class="tools-item">
      <span>清除画布：</span>
      <button id="clearCanvas">清除画布</button>
    </li>
  </ul>

  <canvas id="can"></canvas>

  <script>
    ;(function (doc) {
    const oCan = doc.getElementById('can'),
          ctx = oCan.getContext('2d'),
          oLineColorInput = doc.getElementById('lineColorInput'),
          oLineWidthInput = doc.getElementById('lineWidthInput'),
          oLineWidthValue = doc.getElementById('lineWidthValue'),
          oEraserBtn = doc.getElementById('eraserButton'),
          oEraserSizeInput = doc.getElementById('eraserSizeInput'),
          oEraserSizeValue = doc.getElementById('eraserSizeValue'),
          oEraserIcon = doc.getElementById('eraserIcon'),
          oClearCanvas = doc.getElementById('clearCanvas');
    const { 
            clientWidth,
            clientHeight
          } = doc.documentElement;
    
    oCan.width = clientWidth;
    oCan.height = clientHeight;

    const defaultValue = {
      lineColor: '#000',
      lineWidth: 1,
      lineStyle: 'round',
      eraserColor: '#fff'
    }

    const state = {
      // 开始、结束坐标
      pos: {
        startX: null,
        startY: null,
        endX: null,
        endY: null
      },
      // 橡皮擦状态
      eraserStatus: false
    }

    const init = () => {
      defaultConfig();
      bindEvent();
    }

    function bindEvent () {
      oCan.addEventListener('mousedown', onCanMouseDown, false);
      oLineColorInput.addEventListener('input', onLineColorInput, false);
      oLineWidthInput.addEventListener('input', onLineWidthInput, false);
      oEraserBtn.addEventListener('click', onEraserBtnClick, false);
      oEraserSizeInput.addEventListener('input', onEraserSizeInput, false);
      oClearCanvas.addEventListener('click', onClearCanvas, false);
    }

    function onCanMouseDown (e) {
      const {
        clientX,
        clientY
      } = e;

      setStartPos(clientX, clientY);
      drawPoint(clientX, clientY);
      oCan.addEventListener('mousemove', onCanMouseMove, false);
      oCan.addEventListener('mouseup', onCanMouseUp, false);
    }

    function onCanMouseMove (e) {
      const {
        clientX,
        clientY
      } = e;

      setEndPos(clientX, clientY);
      drawLine();
      setStartPos(clientX, clientY);

      if (state.eraserStatus) {
        setEraserPos(clientX, clientY);
      }
    }

    function onCanMouseUp () {
      oCan.removeEventListener('mousemove', onCanMouseMove, false);
      oCan.removeEventListener('mouseup', onCanMouseUp, false);
    }

    // 默认配置
    function defaultConfig () {
      setLineColor(defaultValue.lineColor);
      setLineWidth(defaultValue.lineWidth);
      setLineStyle(defaultValue.lineStyle);
    }

    // 设置线条颜色
    function setLineColor (color) {
      ctx.strokeStyle = color;
      // 填充色
      ctx.fillStyle = color;
    }

    // 设置线条宽度
    function setLineWidth (width) {
      ctx.lineWidth = width;
    }

    // 设置线条样式
    function setLineStyle () {
      // 线段头的样式（圆角）
      ctx.lineCap = 'round';
      // 交叉头的样式（圆角）
      ctx.lineJoin = 'round';
    }

    // 设置开始坐标
    function setStartPos (x, y) {
      const { pos } = state;

      pos.startX = x;
      pos.startY = y;
    }

    // 设置结束坐标
    function setEndPos (x, y) {
      const { pos } = state;

      pos.endX = x;
      pos.endY = y;
    }

    // 起点画个圆
    function drawPoint (x, y) {
      ctx.beginPath();
      ctx.arc(x, y, ctx.lineWidth / 2, 0, 2 * Math.PI, false);
      ctx.fill();
    }

    // 画线
    function drawLine () {
      const {
        startX,
        startY,
        endX,
        endY
      } = state.pos;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // -----工具方法-----
    // 选择画笔颜色
    function onLineColorInput (e) {
      setLineColor(e.target.value);
      setLineWidth(oLineWidthValue.value);
      state.eraserStatus = false;
      setLineColor(oLineColorInput.value);
      setLineWidth(oLineWidthInput.value);
      setEraserVisible(false);
    }

    // 选择线条粗细
    function onLineWidthInput (e) {
      const { value } = e.target;
      
      setLineWidth(value);
      oLineWidthValue.innerText = value;
    }

    // 打开橡皮擦状态
    function onEraserBtnClick (e) {
      state.eraserStatus = true;

      const {
        clientX,
        clientY
      } = e;
      
      setLineColor(defaultValue.eraserColor);
      setLineWidth(oEraserSizeInput.value);
      setEraserVisible(true);
      setEraserPos(clientX, clientY);
      setEraserSize(oEraserSizeInput.value);
      onCanMouseDown(e);
    }

    // 设置橡皮擦显示/隐藏
    function setEraserVisible (visible) {
      oEraserIcon.style.display = visible ? 'block' : 'none';
    }

    // 设置橡皮擦坐标
    function setEraserPos (x, y) {
      // 获取自身的宽高
      const {
        clientWidth,
        clientHeight
      } = oEraserIcon;

      oEraserIcon.style.top = \`\${ y - clientWidth / 2 }px\`;
      oEraserIcon.style.left = \`\${ x - clientHeight / 2 }px\`;
    }

    // 设置橡皮擦大小
    function setEraserSize (width) {
      if (state.eraserStatus) {
        setLineWidth(width);
        oEraserIcon.style.width = width + 'px';
        oEraserIcon.style.height = width + 'px';
      }
    }

    // 选择橡皮擦大小
    function onEraserSizeInput (e) {
      const { value } = e.target;

      setEraserSize(value);
      oEraserSizeValue.innerText = value;
    }

    // 清除画布
    function onClearCanvas () {
      ctx.clearRect(0, 0, oCan.offsetWidth, oCan.offsetHeight);
    }

    init();
  })(document);
  </script>
</body>
</html>
`;