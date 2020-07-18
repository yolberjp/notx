<template>
  <div class="home">
    <div class="container">
        <code-card v-for="node in displayNodes" :key="node.id" :label="node.label" :textCode="node.textCode"></code-card>

        <b-pagination
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


export default {
  name: "Home",
  components: {
    'code-card': CodeCard
  },
  mounted(){
    this.fetchData();
  },
  data(){
    return {
      nodes: [],
      displayNodes: [],
      currentPage: 1,
      rows: 1, 
      perPage: 6, 
    }
  },
  methods:{
    async fetchData(){
      const res = await fetch("docs/db.json");
      const val = await res.json();
      this.nodes = val;
      this.displayNodes = val.slice(0, this.perPage);

      this.rows = this.nodes.length;
    },
    paginate(currentPage){
      const start = (currentPage -1) * this.perPage;
      this.displayNodes = this.nodes.slice(start, start + this.perPage)
    }
  }
};
</script>

<style lang="css" scoped>

</style>
