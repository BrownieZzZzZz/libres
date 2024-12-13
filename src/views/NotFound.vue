<template>
  <div class="flex flex-col gap-1 my-14 px-2 items-center justify-center">
    <div class="mb-4 flex flex-row gap-2 items-center justify-center">
      <div class="text-7xl font-bold text-neutral-800 font-mono">4</div>
      <div class="bg-red-600 rounded-full size-[50px] text-center flex justify-center items-center"><div class="text-white text-[40px] font-semibold font-mono">!</div></div>
      <div class="text-7xl font-bold text-neutral-800 font-mono">4</div>
    </div>
    <div class="text-center font-medium text-3xl text-neutral-800">Oops! You're lost.</div>
    <div class="text-center text-xl text-neutral-800">The page you're looking for was not found.</div>
    <router-link to="/">
      <button type="button" class="bg-red-600 border-2 border-transparent text-[#ffffff] transition-all duration-200 text-xl font-medium px-10 py-3 rounded-full mt-4 hover:bg-red-500">Back to Home</button>
    </router-link>
  </div>
</template>
