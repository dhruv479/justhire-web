<template>
  <div id="app">
    <HeaderHome />
    <router-view />
    <div class="animation" />
  </div>
</template>

<script>
import HeaderHome from './components/headers/HeaderHome';

export default {
  name: 'App',
  components: {HeaderHome}
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
