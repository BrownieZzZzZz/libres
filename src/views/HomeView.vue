<template>
  <main class="flex flex-col items-center justify-center my-14">
    <div class="w-full max-w-[1200px] px-5 mx-5 flex flex-col gap-6">
      <div
        className="flex w-full flex-row items-center gap-3 rounded-md border px-4 py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#71717a"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
          />
        </svg>
        <input
          ref="search"
          placeholder="Search for books.."
          className="w-full bg-transparent placeholder-neutral-500 outline-none"
        />
        <button
          @click="handleSearch()"
          type="button"
          className="mr-1 rounded-xl bg-zinc-700 px-2.5 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-zinc-500"
        >
          Search
        </button>
      </div>
      <div class="grid gap-6 self-center ">
        <select
          ref="category"
          class="bg-white shadow-sm border border-neutral-200 rounded-lg px-4 py-3 text-lg outline-zinc-400"
        >
          <option selected value="">Select a category</option>
          <option
            v-for="(category, index) of categories"
            :key="index"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <!-- <button @click="handleCategory()" type="button" class="text-lg rounded-lg text-zinc-700 border shadow-sm border-neutral-200  font-semibold bg-white transition-all duration-200 hover:scale-[1.07]">Apply</button> -->
      </div>
      <div
        v-if="empty"
        class="flex flex-col gap-4 justify-center items-center"
      >
        <div class="text-4xl font-semibold text-neutral-800">
          There are no books.
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          fill="#262626"
          class="bi bi-slash-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
          />
          <path
            d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708"
          />
        </svg>
      </div>
      <div
        v-else
        class="w-fit self-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr auto-cols-fr gap-6"
      >
        <BookCard
          v-for="(book, index) of books"
          :key="index"
          :book="book"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import BookCard from "@/components/BookCard.vue";
import { ref } from "vue";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Mystery & Thriller",
  "Biography & Memoir",
  "History",
  "Self-Help",
  "Romance",
];



const category = ref(null);
const search = ref(null);


const allBooks = localStorage["books"] ? JSON.parse(localStorage["books"]) : null;
const empty = ref(!allBooks)
const books = ref(allBooks);


const handleSearch = () => {
  if(allBooks){
    books.value = [... allBooks].filter((book) => (book.title.toLowerCase().includes(search.value.value.toLowerCase()) || book.author.toLowerCase().includes(search.value.value.toLowerCase())))
    books.value = [... books.value].filter((book) => (book.category.includes(category.value.value)))
    if(books.value.length == 0){
      empty.value = true;
    }
    else{
      empty.value = false;
    } 
  }
}

</script>
