<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav class="flex gap-4 md:gap-10 w-full bg-white justify-center py-5 px-4">
        <RouterLink to="/" class="font-semibold text-lg text-center md:text-xl text-neutral-500 transition-all duration-200 hover:scale-110">Explore current books</RouterLink>
        <RouterLink to="/create" class="font-semibold text-lg text-center md:text-xl text-neutral-500 transition-all duration-200 hover:scale-110">Create a book</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>


.router-link-exact-active{
  @apply text-neutral-800
}


</style>