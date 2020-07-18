<template>
  <div id="app">
    <div id="nav">
      <top-header></top-header>

      <!-- <div class="container">
        <code-card ></code-card>

        <code-card></code-card>

        <code-card></code-card>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
      </div> -->


    </div>
    <router-view />
  </div>
</template>

<script>
import TopHeader from '@/components/TopHeader.vue'

export default {
  components: {
    'top-header': TopHeader,
  }
}
</script>  

<style lang="scss">


body{
  background-color: #232323;
}


</style>
