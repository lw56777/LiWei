<template>
  <div class="astral">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
  </div>
</template>

<style scoped lang="scss">
@function createShadows($n) {
  $shadows: '#{random(100)}vw #{random(100)}vh #{var(--star-color)}';

  @for $i from 2 through $n {
    $shadows: '#{$shadows}, #{random(100)}vw #{random(100)}vh #{var(--star-color)}';
  }

  @return unquote($shadows);
}

.astral {
  $sizes: 3px, 2px, 1px;
  $counts: 10, 100, 200;
  @for $i from 1 through 3 {
    .layer#{$i} {
      $size: nth($sizes, $i);
      $count: nth($counts, $i);
      $speed: #{$i * 100}s;
      width: $size;
      height: $size;
      background: var(--star-color);
      border-radius: 50%;
      box-shadow: createShadows($count);
      position: fixed;
      animation: moveUp $speed linear infinite, twinkle #{$i * 5}s ease infinite;

      &::after {
        content: '';
        width: inherit;
        height: inherit;
        background: inherit;
        border-radius: inherit;
        box-shadow: inherit;
        position: inherit;
        top: 100vh;
        left: 0;
      }
    }
  }
}

@keyframes moveUp {
  to {
    transform: translateY(-100vh);
  }
}

@keyframes twinkle {
  0% {
    opacity: .1;
  }

  50% {
    opacity: .5;
  }

  100% {
    opacity: .1;
  }
}
</style>