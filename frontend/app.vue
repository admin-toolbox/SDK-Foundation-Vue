<template>
  <div class="off-canvas-content" data-off-canvas-content>
    <div id="main" class="grid-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    $(document).foundation();
  },
};
</script>
