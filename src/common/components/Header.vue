<template>
  <header :class="showCriteria ? 'show-criteria' : ''">
    <div class="ideas">
      <div class="logo" :style="'background-color:' + bgColor">
        <img :src="logo" height="49" width="49" />
      </div>

      <button class="to-criteria" v-on:click.prevent="handleShowCriteria">
        Criteria
      </button>
    </div>

    <div class="criteria">
      <button class="to-ideas" v-on:click.prevent="handleShowIdeas">
        Ideas
      </button>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      hasIdeas: {
        type: Boolean,
        required: true
      },
      showCriteria: {
        type: Boolean,
        required: true
      },
      updateShowCriteria: {
        type: Function,
        required: true
      }
    },
    methods: {
      handleShowCriteria: function () {
        this.updateShowCriteria(true)
      },
      handleShowIdeas: function () {
        this.updateShowCriteria(false)
      }
    },
    computed: {
      bgColor: function () {
        return this.hasIdeas ? '#FFFFFC' : '#FEFFFC'
      },
      logo: function () {
        return this.hasIdeas ? '/icons/logo-on.svg' : '/icons/logo.svg'
      }
    }
  }
</script>

<style scoped>
  header {
    background-color: #F0F2ED;
    display: flex;
    transition: transform 0.3s ease-in-out;
    width: 200vw;
  }

  .show-criteria {
    transform: translateX(-100vw);
  }

  .ideas,
  .criteria {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }

  .logo {
    margin: calc(14px * 0.5);
    padding:
      calc((14px * 4.5 - 49px) / 2 + 1px)
      calc((14px * 4.5 - 49px) / 2)
      calc((14px * 4.5 - 49px) / 2 - 1px);
  }

  img {
    display: block;
    height: 49px;
    width: 49px;
  }
</style>
