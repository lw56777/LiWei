export default `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<style>
  body {
    user-select: none;
    margin: 0;
  }

  li {
    list-style: none;
  }

  .box {
    width: 0;
    height: 0;
    background-color: rgba(0, 128, 0, 0.37);
    border: 1px solid greenyellow;
    box-sizing: border-box;
    position: fixed;
    z-index: 100;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .log {
    height: 40px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(5, 50px);
    gap: 15px;
  }

  .list li {
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 50px;
  }

  .list .selected {
    color: #fff;
    background-color: blue;
  }
</style>
<body>
  <div class="box"></div>
  <div class="container">
    <p class="log">未选择</p>
    <ul class="list"></ul>
  </div>

  <script>
    const oBox = document.querySelector('.box');
    const oList = document.querySelector('.list');
    const oLog = document.querySelector('.log');
    let boxStyle = {}
    let listItems = null;

    function mouseDown (e) {
      initListItemStyle();
      boxStyle.startX = e.clientX;
      boxStyle.startY = e.clientY;
    }

    function mouseMove (e) {
      boxStyle.endX = e.clientX;
      boxStyle.endY = e.clientY;
      boxStyle.width = Math.abs(boxStyle.endX - boxStyle.startX);
      boxStyle.height = Math.abs(boxStyle.endY - boxStyle.startY);
      setBoxStyle();
      
      if (boxStyle.width && boxStyle.height) {
        setListItemStyle();
      }
    }

    function mouseUp (e) {
      initBoxStyle();
    }

    window.addEventListener('mousedown', mouseDown, false);

    window.addEventListener('mousemove', mouseMove, false);

    window.addEventListener('mouseup', mouseUp, false);

    function initBoxStyle () {
      oBox.removeAttribute('style');
      boxStyle = {};
      const selecteds = [];

      listItems.forEach(item => {
        if (item.classList.contains('selected')) {
          selecteds.push(item.innerText);
        }
      });

      oLog.innerText = selecteds.length ? selecteds.join(' | ') : '未选择';
    }

    function setBoxStyle () {
      const {
        width,
        height,
        startX,
        startY,
        endX,
        endY
      } = boxStyle;

      oBox.style.width = width + 'px';
      oBox.style.height = height + 'px';

      if (endX < startX) {
        oBox.style.left = startX - width + 'px';
      } else {
        oBox.style.left = startX + 'px';
      }

      if (endY < startY) {
        oBox.style.top = startY - height + 'px';
      } else {
        oBox.style.top = startY + 'px';
      }
    }
    
    function createListItem () {
      const oFragment = document.createDocumentFragment();

      for (let i = 0; i < 20; i++) {
        const oLi = document.createElement('li');
        oLi.innerText = i + 1;
        oFragment.appendChild(oLi);
      }

      oList.appendChild(oFragment);
      listItems = document.querySelectorAll('.list li');
    }

    createListItem();

    function setListItemStyle () {
      const {
        width: boxWidth,
        height: boxHeight,
        x: boxStartX,
        y: boxStartY
      } = oBox.getBoundingClientRect();
      const boxEndX = boxStartX + boxWidth;
      const boxEndY = boxStartY + boxHeight;

      listItems.forEach(item => {
        const {
          width,
          height,
          x: itemStartX,
          y: itemStartY
        } = item.getBoundingClientRect();
        const itemEndX = itemStartX + width;
        const itemEndY = itemStartY + height;
        
        if (
          // 左上角
          (
            itemStartX > boxStartX
            &&
            itemStartX < boxEndX
            &&
            itemStartY > boxStartY
            &&
            itemStartY < boxEndY
          )
          ||
          // 右上角
          (
            itemEndX > boxStartX
            &&
            itemEndX < boxEndX
            &&
            itemStartY > boxStartY
            &&
            itemStartY < boxEndY
          )
          ||
          // 左下角
          (
            itemStartX > boxStartX
            &&
            itemStartX < boxEndX
            &&
            itemEndY > boxStartY
            &&
            itemEndY < boxEndY
          )
          ||
          // 右下角
          (
            itemEndX > boxStartX
            &&
            itemEndX < boxEndX
            &&
            itemEndY > boxStartY
            &&
            itemEndY < boxEndY
          )
        ) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
    }

    function initListItemStyle () {
      listItems.forEach(item => {
        if (item.classList.contains('selected')) {
          item.classList.remove('selected');
        }
      });
    }
  </script>
</body>
</html>
`;