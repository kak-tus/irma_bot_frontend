<template lang="pug">
div
  settings
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Settings from './components/Settings.vue'

@Options({
  components: {
    Settings
  }
})

export default class App extends Vue {}
</script>
