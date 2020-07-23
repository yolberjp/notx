<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand class="brand" to="/">Notx</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item to="/about" >Link</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto" >
                <b-nav-form class="search" spellcheck="false" @submit.prevent="search">
                    <b-form-input 
                        ref="searchbox" 
                        size="md" 
                        autocomplete="off" 
                        class="mr-md-2" 
                        placeholder="Search"
                        v-model="searchText"
                        @keyup="listenSearch"
                        v-on:keyup.8="restartSearch"
                    ></b-form-input>
                </b-nav-form>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                id:4,
                copied: false,
                searchText: ""

            }
        },
        mounted(){
            this._keyListener = function(e) {
                if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    this.focusSearch();
                }
            };
            document.addEventListener('keydown', this._keyListener.bind(this));
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this._keyListener);
        },
        methods:{
            focusSearch(){
                this.$refs.searchbox.$el.focus();
            },
            search(){
                let filter = '';
                let _query = this.searchText;
                if(this.searchText[0]=='#'){
                    filter = this.searchText.split(' ')[0];
                    _query = this.searchText.replace(filter, '').trim();

                    if(_query){
                        this.$store.dispatch("search", {text: _query, perPage:10, filter})
                    }   
                }else{
                    this.$store.dispatch("search", {text: _query, perPage:10, filter})
                }
            },
            listenSearch(){
                if(this.searchText.length>=2){
                    this.search();
                }
                
            },
            restartSearch(){
                if(!this.searchText){
                    this.search();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .brand{
        font-weight: bold;;
        color: #f36d33 !important;
    }

    #nav a{
        color: #ababab;
    }

    #nav a.router-link-exact-active{
        color: #ababab;
    }

    .search input{
        background-color: #232323;
        color: #f36d33;
        border: none;
        width: 400px;
        text-decoration: none;
        

        &:focus{
            box-shadow: none;
            outline: 2px solid #943d1e;
        }
    }

    .search button{
        color: #ababab;
        background-color: #232323;
        border: none;
    }
</style>