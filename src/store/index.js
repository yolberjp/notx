import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nodes: [],
    displayNodes: [],
    rows: 0,
    showSpinner: false,
    tags: []
  },
  mutations: {
    SET_NODES(state, nodes){
      state.nodes = nodes;
    },
    SET_ROWS(state, rows){
      state.rows = rows;
    },
    SET_DISPLAY_NODES(state, displayNodes){
      state.displayNodes = displayNodes;
    },
    SET_SPINNER(state, spinner){
      state.showSpinner = spinner;
    },
    SET_TAGS(state, tags){
      state.tags = [tags];
    }
     
  },
  actions: {
    async fetchData({commit}){
      
      commit("SET_SPINNER", true);

      return new Promise(resolve => {
        setTimeout(async () =>{
          const res = await fetch("docs/db.json");
          const val = await res.json();
          resolve(val);
          commit("SET_SPINNER", false);
        }, 200);
      })
    },
    async fetchNodes({dispatch, commit}, {perPage}){
      const myJson = await dispatch("fetchData");
      const nodes = myJson;
      const displayNodes = nodes.slice(0, perPage);

      commit("SET_NODES", nodes);
      commit("SET_DISPLAY_NODES", displayNodes);
      commit("SET_ROWS", myJson.length);
    },
    async paginate({commit, state}, {currentPage, perPage}){
      const start = (currentPage-1) * perPage;
      const displayNodes = state.nodes.slice(start, start + perPage);
      commit("SET_DISPLAY_NODES", displayNodes);
    },
    updatePagination({commit, dispatch}, {myJson, currentPage, perPage}){
      commit("SET_NODES", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", {currentPage, perPage});
      
    },
    async search({commit, dispatch}, {text, perPage, filter}){
      const myJson = await this.dispatch("fetchData");
      const values = myJson.filter(val=>
        val.title.toLowerCase().includes(text.toLowerCase()) ||
        val.value.toLowerCase().includes(text.toLowerCase())
      );
      commit("SET_TAGS", filter);
      dispatch("updatePagination", {myJson: values, currentPage: 1, perPage})
    }
  },
  getters:{
    nodes(state){
      return state.nodes;
    },
    displayNodes(state){
      return state.displayNodes;
    },
    showSpinner(state){
      return state.showSpinner;
    },
    rows(state){
      return state.rows;
    },
    tags(state){
      return state.tags;
    }
  },
  modules: {}
});
