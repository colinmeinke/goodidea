<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <input type="text" v-model="title" />
  </div>
</template>

<script>
  export default {
    name: 'home',
    data: () => ({
      title: 'Good idea!'
    })
  }
</script>
