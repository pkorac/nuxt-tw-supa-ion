<template>
  <div id="app-container">
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  </div>
  <div id="overflower"></div>
</template>
<script setup></script>
<style scoped>
#app-container,
#overflower {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  transform: translate(0%, 0%) scale(1) translate3d(0, 0, 0);
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  z-index: 20;
}
#overflower {
  opacity: 0;
  pointer-events: none;
  z-index: 100000000;
}

@media (min-width: 640px) {
  #app-container {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7) translate3d(0, 0, 0);
    width: 393px;
    height: 844px;
    border-radius: 32px;
    background: #f0f0f0;
    border: 9px solid #413d35;
    box-shadow:
      0px 23px 52px 0px rgba(0, 0, 0, 0.1),
      0px 94px 94px 0px rgba(0, 0, 0, 0.09),
      0px 211px 127px 0px rgba(0, 0, 0, 0.05),
      0px 375px 150px 0px rgba(0, 0, 0, 0.01),
      0px 586px 164px 0px rgba(0, 0, 0, 0);
  }
  #overflower {
    opacity: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7) translate3d(0, 0, 0);
    width: 393px;
    height: 844px;
    border-radius: 32px;
    border: 9px solid #413d35;
  }
}

/*Dark mode*/
@media (prefers-color-scheme: dark) {
  #app-container {
    background: #303332;
    border-color: #717171;
  }
  #overflower {
    border-color: #717171;
  }
}

@media (min-width: 640px) and (min-height: 800px) {
  #app-container,
  #overflower {
    transform: translate(-50%, -50%) scale(0.8);
  }
}
@media (min-width: 640px) and (min-height: 900px) {
  #app-container,
  #overflower {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
