<template>
  <main class="my-10 flex justify-center flex-col items-center w-full">
    <div class="text-3xl md:text-5xl font-semibold text-neutral-700">
      Book creation form
    </div>
    <div
      class="my-10 bg-white px-5 py-8 md:p-10 rounded-lg flex flex-col gap-6 w-full max-w-[800px]"
    >
      <div class="flex flex-col gap-3">
        <div class="text-[15px] font-light tracking-wider text-zinc-700">
          TITLE
        </div>
        <input
          ref="title"
          type="text"
          maxlength="60"
          class="bg-zinc-100 rounded-lg px-4 py-3 text-lg outline-zinc-400 placeholder-zinc-400"
          placeholder="Book title"
        />
        <div
          class="text-[15px] self-end font-light text-zinc-700 tracking-wider"
        >
          60 Chars max
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div class="text-[15px] font-light tracking-wider text-zinc-700">
          AUTHOR
        </div>
        <input
          ref="author"
          type="text"
          maxlength="40"
          class="bg-zinc-100 rounded-lg px-4 py-3 text-lg outline-zinc-400 placeholder-zinc-400"
          placeholder="Author name"
        />
        <div
          class="text-[15px] self-end font-light text-zinc-700 tracking-wider"
        >
          40 Chars max
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div class="text-[15px] font-light tracking-wider text-zinc-700">
          Date
        </div>
        <input
          ref="date"
          type="date"
          class="bg-zinc-100 rounded-lg px-4 py-3 text-lg outline-zinc-400 placeholder-zinc-400"
        />
      </div>
      <div class="flex flex-col gap-3">
        <div class="text-[15px] font-light tracking-wider text-zinc-700">
          Category
        </div>
        <select
          ref="category"
          class="bg-zinc-100 rounded-lg px-4 py-3 text-lg outline-zinc-400"
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
      </div>

      <div class="flex flex-col gap-3">
        <div class="text-[15px] font-light tracking-wider text-zinc-700">
          Cover Image
        </div>
        <input
          ref="coverImage"
          type="file"
          accept="image/*"
          class="m-4 text-zinc-700 text-lg"
        />
      </div>
      <div class="flex flex-col gap-3">
        <button
          @click="handleCreate()"
          type="button"
          class="bg-zinc-700 w-fit self-center px-8 py-3 border-2 border-transparent rounded-md font-semibold text-xl text-[#ffffff] transition-all duration-200 hover:bg-white hover:border-zinc-700 hover:text-zinc-700 hover:scale-110"
        >
          Create
        </button>
        <div class="font-semibold text-rose-500 self-center">
          {{ errorMessage }}
        </div>
        <div class="font-semibold text-emerald-500 self-center">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import eventBus from "@/eventBus";
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
const title = ref(null);
const author = ref(null);
const date = ref(null);
const category = ref(null);
const coverImage = ref(null);
const errorMessage = ref("");
const successMessage = ref("");

const popMessage = (node) => {
  setTimeout(() => {
    node.value = "";
  }, 3000);
};

const handleCreate = () => {
  if (title.value.value.trim() === "") {
    errorMessage.value = "Verify title !";
    popMessage(errorMessage);
    return;
  }
  if (author.value.value.trim() === "") {
    errorMessage.value = "Verify author !";
    popMessage(errorMessage);
    return;
  }
  if (date.value.value.trim() === "") {
    errorMessage.value = "Verify date !";
    popMessage(errorMessage);
    return;
  }
  if (category.value.value.trim() === "") {
    errorMessage.value = "Verify category !";
    popMessage(errorMessage);
    return;
  }
  if (coverImage.value.value === "") {
    errorMessage.value = "Verify cover image !";
    popMessage(errorMessage);
    return;
  }
  successMessage.value = "Book added successfully !";
  if (localStorage["books"]) {
    let books = JSON.parse(localStorage["books"]);
    localStorage["index"] = Number(localStorage["index"]) + 1
    books.push({
      title: title.value.value,
      author: author.value.value,
      date: date.value.value,
      category: category.value.value,
      coverImage: coverImage.value.value.slice(coverImage.value.value.lastIndexOf("\\") + 1),
      id: Date.now()
    });
    localStorage["books"] = JSON.stringify(books);
    return;
  }
  localStorage["books"] = JSON.stringify([
    {
      title: title.value.value,
      author: author.value.value,
      date: date.value.value,
      category: category.value.value,
      coverImage: coverImage.value.value.slice(coverImage.value.value.lastIndexOf("\\") + 1),
      id: Date.now()
    },
  ]);
  popMessage(successMessage);
};
</script>
