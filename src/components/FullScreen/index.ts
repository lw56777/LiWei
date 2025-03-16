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
    margin: 0;
  }

  .container {
    width: 100%;
    height: 100%;
    position: fixed;
    transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
  }

  .page-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .container .page-box:nth-child(1) {
    background-color: blueviolet;
  }

  .container .page-box:nth-child(2) {
    background-color: aquamarine;
  }

  .container .page-box:nth-child(3) {
    background-color: brown;
  }

  .container .page-box:nth-child(4) {
    background-color: chartreuse;
  }

  .page-box h1 {
    color: #fff;
    text-align: center;
  }
</style>
<body>
  <div class="container">
    <div class="page-box">
      <h1>第一页</h1>
    </div>

    <div class="page-box">
      <h1>第二页</h1>
    </div>

    <div class="page-box">
      <h1>第三页</h1>
    </div>

    <div class="page-box">
      <h1>第四页</h1>
    </div>
  </div>

  <script>
    const oContainer = document.querySelector('.container');
    const oPageBoxs = document.querySelectorAll('.page-box');
    let pageHeight;
    let pageIndex = 0;
    let isScroll = false;

    const init = () => {
      pageHeight = window.innerHeight;
      setPageHeight();
      scrollPage();
    }

    const setPageHeight = () => {
      oPageBoxs.forEach((p, index) => {
        p.style.setProperty('height', \`\${ pageHeight }px\`);
        p.style.setProperty('top', \`\${ index * pageHeight }px\`);
      });
    }

    const scrollPage = () => {
      oContainer.style.setProperty('transform', \`translate3d(0, -\${ pageIndex * pageHeight }px, 0)\`);
    }

    window.addEventListener('resize', init, false);

    window.addEventListener('wheel', (e) => {
      if (isScroll) return;

      isScroll = true;

      if (e.deltaY < 0 && pageIndex > 0) {
        // 向上滚动
        pageIndex--;
      } else if (e.deltaY > 0 && pageIndex < oPageBoxs.length - 1) {
        // 向下滚动
        pageIndex++;
      }
      
      scrollPage();

      let t = setTimeout(() => {
        isScroll = false;
        clearTimeout(t);
        t = null;
      }, 500);
    }, false);

    window.addEventListener('keydown', onKeydown, false);

    function onKeydown (e) {
      switch (e.keyCode) {
        case 38: // 上
          if (pageIndex > 0) {
            pageIndex--;
          }
          break;

        case 40: // 下
          if (pageIndex < oPageBoxs.length - 1) {
            pageIndex++;
          }
          break;

        default:
          break;
      }

      scrollPage();
    }

    init();
  </script>
</body>
</html>
`;