<template>
  <div id="app">
    <div class="page" v-if="showSpinner">
      <b-spinner 
        class="spinner" 
        variant="light"
        key="light"
      ></b-spinner>
    </div>

    <div id="nav">
      <top-header></top-header>
    </div>
    <router-view />
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue'
import {mapGetters} from "vuex";

export default {
  components: {
    'top-header': TopHeader,
  },
  computed:{
      ...mapGetters(["showSpinner"])
  },
}
</script>  

<style lang="scss">


body{
  background-color: #232323;
}

.page{
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  z-index: 25;
  width: 100%;
  height: 100%;
}

.spinner{
  position: relative;
  top:50%;
  left: 50%;
}

</style>
