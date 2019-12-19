<template>
  <div id="app">
    <router-view />
    <div class="animation" />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
<style>
.header-title {
  color: bisque;
  font-size: 2.5em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
