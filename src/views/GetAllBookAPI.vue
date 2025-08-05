<template>
  <div>
    <h1>All Books (JSON)</h1>
    <pre v-if="!loading && !error">{{ booksJson }}</pre>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import db from '../firebase/init.js';
import { collection, getDocs } from 'firebase/firestore';

const books = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchBooks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'books'));
    books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    error.value = 'Error fetching documents: ' + e.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchBooks);

const booksJson = computed(() => {
  return JSON.stringify(books.value, null, 2);
});
</script>

<style scoped>
pre {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  white-space: pre-wrap;       
  white-space: -moz-pre-wrap;  
  white-space: -pre-wrap;      
  white-space: -o-pre-wrap;    
  word-wrap: break-word;       
}
.error {
  color: red;
}
</style>