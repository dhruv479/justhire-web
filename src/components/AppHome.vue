<template>
  <div>
    <HeaderHome />
    <img src="/src/assets/jh.jpg" alt="home_page" />
  </div>
</template>

<script>
import HeaderHome from './headers/HeaderHome';

export default {
  name: 'AppHome',
  components: { HeaderHome },
  data() {
    return {};
  }
};
</script>
<style scoped>
img {
  width: 100%;
  height: 800px;
}
</style>
