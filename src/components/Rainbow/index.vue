<template>
  <div
    class="rainbow"
    pos-absolute
    w-50
    h-50
    opacity-50
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
//   background-image: linear-gradient(var(--from-color), var(--to-color));
//   border-radius: 50%;
//   filter: blur(120px);
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   animation: rainbow 30s infinite;
// }

.rainbow {
  background-image: var(--rainbow-color);
  background-size: 200% 200%;
  filter: blur(120px);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rainbow 30s ease infinite;
  z-index: -99;
}
</style>