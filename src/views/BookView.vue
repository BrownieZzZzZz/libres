<template>
  <div
    class="max-w-4xl mx-auto my-20 px-10 py-12 bg-white shadow-lg rounded-lg"
  >
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Book Details</h1>
    <div class="flex flex-col sm:flex-row gap-4 sm:gap-10">
      <div class="mb-8">
        <label for="image" class="block text-gray-700 font-medium mb-2"
          >Book Image</label
        >
        <div class="flex items-center flex-col gap-4">
          <div class="overflow-hidden rounded-lg">
            <img
              @click="handleImage()"
              :src="`/images/${currentImage}`"
              alt="Book Cover"
              class="w-full sm:h-[400px] object-cover mr-4 hover:scale-110 hover:cursor-pointer transition-all duration-200"
            />
          </div>
          <input
            @change="handleLoadImage()"
            ref="imageInput"
            class="hidden"
            type="file"
            accept="images/*"
          />
          <div class="font-medium text-zinc-600">{{ currentImage }}</div>
        </div>
      </div>

      <div class="w-full h-full">
        <div class="mb-8">
          <label for="title" class="block text-gray-700 font-medium mb-2"
            >Title</label
          >
          <input
            ref="titleInput"
            type="text"
            id="title"
            v-model="book.title"
            class="outline-zinc-400 rounded-lg px-4 py-3 bg-zinc-100 w-full"
            :readonly="!isEditing"
          />
        </div>

        <div class="mb-8">
          <label for="author" class="block text-gray-700 font-medium mb-2"
            >Author</label
          >
          <input
            ref="authorInput"
            type="text"
            id="author"
            v-model="book.author"
            class="outline-zinc-400 rounded-lg px-4 py-3 bg-zinc-100 w-full"
            :readonly="!isEditing"
          />
        </div>

        <div class="mb-8">
          <label for="date" class="block text-gray-700 font-medium mb-2"
            >Publication Date</label
          >
          <input
            ref="dateInput"
            type="date"
            id="date"
            v-model="book.date"
            class="outline-zinc-400 bg-zinc-100 rounded-lg px-4 py-3 w-full"
            :readonly="!isEditing"
          />
        </div>

        <div class="mb-6">
          <label for="category" class="block text-gray-700 font-medium mb-2"
            >Category</label
          >
          <select
            ref="categoryInput"
            id="category"
            v-model="book.category"
            class="outline-zinc-400 bg-zinc-100 rounded-lg px-4 py-3 w-full"
            :disabled="!isEditing"
          >
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <div class="flex items-center justify-center space-x-4">
          <button
            @click="editBook"
            v-if="!isEditing"
            class="bg-blue-500 text-white w-[100px] py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Edit
          </button>

          <button
            @click="saveBook"
            v-if="isEditing"
            class="bg-green-500 text-white w-[100px] py-2 rounded-lg shadow hover:bg-green-600"
          >
            Save
          </button>

          <button
            @click="deleteBook"
            class="bg-red-500 text-white w-[100px] py-2 rounded-lg shadow hover:bg-red-600"
          >
            Delete
          </button>
        </div>
        <div class="font-semibold text-rose-500 self-center">
          {{ errorMessage }}
        </div>
        <div class="font-semibold text-emerald-500 self-center">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";


const route = useRoute();
const router = useRouter();

const bookId = route.params.id;

const book = [... JSON.parse(localStorage["books"])].find((book) => bookId == book.id)

const bookSave = ref([... JSON.parse(localStorage["books"])].find((book) => bookId == book.id))


const currentImage = ref(book.coverImage);

const categories = [
  "Fiction",
  "Non-Fiction",
  "Mystery & Thriller",
  "Biography & Memoir",
  "History",
  "Self-Help",
  "Romance",
];

const errorMessage = ref("");
const successMessage = ref("");

const popMessage = (node) => {
  setTimeout(() => {
    node.value = "";
  }, 3000);
};
const imageInput = ref(null);

const handleImage = () => {
  if (isEditing.value) {
    imageInput.value.click();
  }
};

const handleLoadImage = (event) => {
  currentImage.value = imageInput.value.files[0].name;
};

const isEditing = ref(false);
const titleInput = ref(null);
const authorInput = ref(null);
const dateInput = ref(null);
const categoryInput = ref(null);

const editBook = () => {
  isEditing.value = true;
};

const saveBook = () => {
  if (titleInput.value.value.trim() === "") {
    errorMessage.value = "Verify title !";
    book.title = bookSave.value.title;
    popMessage(errorMessage);
    return;
  }
  if (authorInput.value.value.trim() === "") {
    errorMessage.value = "Verify author !";
    book.author = bookSave.value.author;
    popMessage(errorMessage);
    return;
  }
  if (dateInput.value.value.trim() === "") {
    errorMessage.value = "Verify date !";
    book.date = bookSave.value.date;
    popMessage(errorMessage);
    return;
  }
  if (categoryInput.value.value.trim() === "") {
    errorMessage.value = "Verify category !";
    book.category = bookSave.value.category;
    popMessage(errorMessage);
    return;
  }
  bookSave.value = {... book}
  localStorage["books"] = JSON.stringify([... JSON.parse(localStorage["books"]).filter((book) => book.id != bookSave.value.id), bookSave.value])
  isEditing.value = false;
};

const deleteBook = () => {
  localStorage["books"] = JSON.stringify([... JSON.parse(localStorage["books"]).filter((book) => book.id != bookSave.value.id)])
  router.push("/")
};
</script>
