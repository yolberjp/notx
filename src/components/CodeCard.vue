<template>
    <div id="blockcode" class="code" :class="{ copied: copied }">
        <b-button-group class="icon-options">
            <b-button class="icon" v-b-tooltip.hover title="Copy" @click="copy">
                <b-icon icon="clipboard" aria-hidden="true"></b-icon>
            </b-button>
            <b-button class="icon" v-b-tooltip.hover title="Star">
                <b-icon icon="star" aria-hidden="true"></b-icon>
            </b-button>
            <b-button class="icon" v-b-tooltip.hover title="Info">
                <b-icon icon="info-circle" aria-hidden="true"></b-icon>
            </b-button>
      </b-button-group>

        <span class="label"><b class="tc-logo">></b> {{label}}</span>
        <pre class="unselectable" @dblclick="copy">{{textCode}}</pre>

    </div>
</template>

<script>

export default {
    name: 'blockcode',
    data(){
        return {
            id:4,
            copied: false,

        }
    },
    methods:{
        async copy() {
            await navigator.clipboard.writeText(this.textCode);
            this.copied = true;
            setTimeout(function () { this.copied = false }.bind(this), 2000);
        }
    },
    props:[
        'label',
        'textCode',
    ]
}
</script>


<style lang="css" scoped>

.code{
    position: relative;
    padding: 10px;
    margin: 10px 0px;
    color: #acacac;
}

span.label{
    color: #cbcbcb;
}

.unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.code pre {
    background: #333;
    border: 1px solid #333;
    border-left: 3px solid #f36d33;
    color: #acacac;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 16px;
    line-height: 1.6;
    margin-top: 5px;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
    transition: .5s;
    overflow: hidden;
}



.icon-options{
    width: 155px;
    position: absolute;
    top: 44px;
    left: 100%;
    margin-left: -165px;
    padding: 5px 10px;
    transition: .5s;
    display: none;
    background-color: #333;
}

.icon-options .icon{
    transition: .5s;
    background-color: #333;
    outline: none;
    border: none;
}

.icon-options:hover{
    display: block;
}
.code:hover .icon-options{
    display: block;
}

.copied pre{
    background-color: #f36d33;
    color: #333;
}

.copied .icon-options{
    background-color: #f36d33;
    display: inline-block !important;
}
.copied .icon-options .icon{
    background-color: #f36d33;
    color: #333;

}

.tc-logo{
    color: #f36d33;
}

</style>