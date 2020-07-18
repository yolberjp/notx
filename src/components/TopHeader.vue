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
                <b-nav-form class="search" form>
                    <b-form-input ref="searchbox" size="md" autocomplete="off" class="mr-md-2" placeholder="Search"></b-form-input>
                    <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
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

            }
        },
        mounted() {
            this._keyListener = function(e) {
                if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault(); // present "Save Page" from getting triggered.
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
        color: #fff;
    }

    .search input{
        background-color: #232323;
        color: #f36d33;
        border: none;
        width: 400px;

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