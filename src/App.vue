<script setup>
// import NavBar from './components/NavBar.vue'
import Users from './components/page/Users.vue'
</script>

<template>
  <v-row>
    <!-- <v-col cols="2">
      <NavBar></NavBar>
    </v-col> -->
    <v-col cols="12">
      <Users />
    </v-col>
    
  </v-row>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
