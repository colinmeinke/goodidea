<template>
  <div :style="style"></div>
</template>

<script>
  export default {
    name: 'Baseline',
    props: {
      baseline: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        active: false,
        style: ''
      }
    },
    methods: {
      calcStyle: function () {
        return `background-image:linear-gradient(to bottom,${this.color} 0,${this.color} 1px,transparent 1px,transparent ${this.baseline});background-size: 100% ${this.baseline};${this.active ? '' : 'display:none;'}`
      }
    },
    mounted: function () {
      window.addEventListener('keypress', e => {
        if (e.ctrlKey && e.code === 'KeyL') {
          this.active = !this.active
          this.style = this.calcStyle()
        }
      })
    }
  }
</script>

<style scoped>
  div {
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 999;
  }
</style>
