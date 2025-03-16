<template>
  <div
    class="rainbow"
    pos-fixed
    w-50
    h-50
    opacity-30
  ></div>
</template>

<style scoped lang="scss">
// @mixin rainbow-gradient($step: 360, $saturation: 100%, $lightness: 50%) {
//   $gradient: nth($rainbow-colors, 1);
//   // 循环生成所有颜色
//   @for $i from 2 through length($rainbow-colors) {
//     $gradient: "#{$gradient}, ";
//     $gradient: "#{$gradient}#{nth($rainbow-colors, $i)}";
//   }
//   // 将最后一个颜色和第一个颜色连接起来，形成循环渐变
//   $gradient: "#{$gradient}, #{nth($rainbow-colors, 1)}";
// }

// // 定义彩虹颜色列表
// $rainbow-colors: ();
// @for $i from 0 to 360 {
//   $color: hsl($i, 100%, 50%);
//   $rainbow-colors: append($rainbow-colors, $color);
// }

// // 定义一个生成彩虹动画的混合器
// @mixin rainbow-animation($colors) {
//   @keyframes rainbow {
//     // 初始化动画状态
//     0% {
//       --from-color: #{nth($colors, 1)};
//       --to-color: #{nth($colors, 2)};
//     }
//     // 循环生成动画的关键帧
//     @for $i from 1 through length($colors) - 1 {
//       #{($i * 100%) / (length($colors) - 1)} {
//         --from-color: #{nth($colors, $i)};
//         --to-color: #{nth($colors, $i + 1)};
//       }
//     }
//     // 最后一个关键帧将颜色循环回到开始
//     100% {
//       --from-color: #{nth($colors, length($colors))};
//       --to-color: #{nth($colors, 1)};
//     }
//   }
// }

// // 调用混合器生成动画
// @include rainbow-animation($rainbow-colors);

// .rainbow {
//   @include rainbow-gradient();
//   background-image: linear-gradient(45deg, var(--from-color) 30%, var(--to-color));
//   border-radius: 50%;
//   filter: blur(120px);
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   animation: rainbow 20s infinite;
// }

.rainbow {
  background-image: var(--rainbow-bg);
  background-size: 500% 500%;
  filter: blur(220px);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rainbowBg 30s infinite;
  z-index: -1;
}
</style>