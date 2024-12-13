<template>
  <router-link :to="`/books/${book.id}`">
  <main
    class="select-none w-full mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer"
  >
    <div className="overflow-hidden">
      <img
        :src="`/images/${book.coverImage}`"
        alt="Book Image"
        className="h-[600px] w-full object-cover transition-all duration-200 hover:scale-110"
      />
    </div>
    <div class="px-5 py-6">
      <h2 class="font-bold text-xl text-gray-800 truncate">{{ book.title }}</h2>
      <p class="text-sm mt-1 text-gray-600">
        by <span class="font-medium">{{ book.author }}</span>
      </p>

     
      <span
        class="inline-block mt-2 px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
      >
        {{ book.category }}
      </span>

      
      <p class="mt-3 text-sm text-gray-500">
        Published on: <span class="font-medium">{{ book.date }}</span>
      </p>
    </div>
  </main>
</router-link>
</template>

<script setup>
const { book} = defineProps({
  book: {
    required: true,
    type: Object,
  },
});
</script>
