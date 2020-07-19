<template>
  <div class="home">
    <div class="container">

      <div class="header m-3 mb-5">

        <div class="tag-list col-md-8">
          <a href="" v-for="tag in tags" :key="tag">
            <b-badge variant="light">{{tag}}</b-badge>
          </a>
        </div>

        <div class="index-search col-md-2">
          {{rows}} notx
        </div>
      </div>
       

        <code-card v-for="node in displayNodes" 
          :key="node.id" 
          :node="node"
        ></code-card>

        <b-pagination
          v-show="rows>perPage"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          @input="paginate(currentPage)"
        ></b-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CodeCard from '@/components/CodeCard.vue'
import {mapGetters} from "vuex";

export default {
  name: "Home",
  components: {
    'code-card': CodeCard
  },
  computed:{
    ...mapGetters(["rows", "nodes", "displayNodes", "tags"])
  },
  mounted(){
    this.fetchData();
  },
  data(){
    return {
      // tags: [],
      currentPage: 1,
      perPage: 10, 
    }
  },
  methods:{
    async fetchData(){
      await this.$store.dispatch("fetchNodes", {perPage: this.perPage});
    },
    paginate(currentPage){
      this.$store.dispatch("paginate", {currentPage, perPage: this.perPage})
    }
  }
};
</script>

<style lang="css" scoped>
  .header{
    width: 100%;
    display: inline-block;
  }

  .index-search{
    color: #626262;
    float: right;
  }
</style>
