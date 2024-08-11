<template>
  <dashboard :JSProj="JSProj" />
</template>

<script>
import Vue from 'vue'
import JSProj from '@JSProj/core'
import { Dashboard } from '@JSProj/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    JSProj: () => new JSProj(),
  },
}
</script>

<style src="@JSProj/core/dist/style.css"></style>
<style src="@JSProj/dashboard/dist/style.css"></style>
