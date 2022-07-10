<template>
  <div class="off-canvas-content" data-off-canvas-content>
    <div id="main" class="grid-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  components: {},
  mounted() {
    $("body").on("swipeleft", function () {
      $(".offcanvas-trigger").click();
    });

    $(document).foundation();
  },
};
</script>
