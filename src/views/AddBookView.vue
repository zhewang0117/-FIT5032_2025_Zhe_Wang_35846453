<template>
  <div>
    <h1>Manage Books</h1>

    <form @submit.prevent="addBook">
      <h2>Add a New Book</h2>
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <hr />


    <h2>Query Books</h2>
    <form @submit.prevent="fetchBooks">
  
      <div>
        <label>Where:</label>
        <input v-model="whereField" placeholder="Field (e.g., name)" />
        <select v-model="whereOp">
          <option>==</option>
          <option value="lt">&lt;</option>
          <option value="lte">&lt;=</option>  
          <option value="gt">&gt;</option>
          <option value="gte">&gt;=</option>
          <option>!=</option>
          <option>array-contains</option>
          <option>in</option>
          <option>not-in</option>
          <option>array-contains-any</option>
        </select>
        <input v-model="whereValue" placeholder="Value" />
      </div>

      <div>
        <label>Order By:</label>
        <input v-model="orderByField" placeholder="Field (e.g., name)" />
        <select v-model="orderByDirection">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div>
        <label>Limit:</label>
        <input type="number" v-model.number="limitValue" placeholder="e.g., 5" />
      </div>

      <button type="submit">Apply Query</button>
    </form>

    <hr />

    <h2>Book List</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} (ISBN: {{ book.isbn }})
        <button @click="selectBook(book)">Update</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>

    <hr />

    <div v-if="selectedBook">
      <h2>Edit Book</h2>
      <form @submit.prevent="updateBook">
        <div>
          <label for="update-isbn">ISBN:</label>
          <input type="text" v-model="selectedBook.isbn" id="update-isbn" required />
        </div>
        <div>
          <label for="update-name">Name:</label>
          <input type="text" v-model="selectedBook.name" id="update-name" required />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" @click="selectedBook = null">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where, orderBy, limit } from 'firebase/firestore';

const isbn = ref('');
const name = ref('');
const books = ref([]);
const selectedBook = ref(null);

// Query parameters
const whereField = ref('');
const whereOp = ref('==');
const whereValue = ref('');
const orderByField = ref('');
const orderByDirection = ref('asc');
const limitValue = ref(null);

const fetchBooks = async () => {
  try {
    let booksQuery = collection(db, 'books');

    // Build the query dynamically
    const queryConstraints = [];
    if (whereField.value && whereValue.value) {
      let val = whereValue.value;
      // Attempt to convert to number if the field is isbn
      if (whereField.value === 'isbn') {
        const numVal = Number(val);
        if (!isNaN(numVal)) {
          val = numVal;
        }
      }
      queryConstraints.push(where(whereField.value, whereOp.value, val));
    }

    if (orderByField.value) {
      queryConstraints.push(orderBy(orderByField.value, orderByDirection.value));
    }

    if (limitValue.value > 0) {
      queryConstraints.push(limit(limitValue.value));
    }

    const finalQuery = query(booksQuery, ...queryConstraints);
    const querySnapshot = await getDocs(finalQuery);
    books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching books: ", error);
    alert("Failed to fetch books. Check console for details. You may need to create an index in Firestore.");
  }
};

onMounted(fetchBooks);

const addBook = async () => {
  if (!isbn.value || !name.value) return;
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value
    });
    isbn.value = '';
    name.value = '';
    fetchBooks(); // Refresh the list
  } catch (error) {
    console.error('Error adding book: ', error);
  }
};

const deleteBook = async (id) => {
  try {
    await deleteDoc(doc(db, 'books', id));
    fetchBooks(); // Refresh the list
  } catch (error) {
    console.error('Error deleting book: ', error);
  }
};

const selectBook = (book) => {
  selectedBook.value = { ...book }; 
};

const updateBook = async () => {
  if (!selectedBook.value) return;
  try {
    const bookRef = doc(db, 'books', selectedBook.value.id);
    await updateDoc(bookRef, {
      isbn: Number(selectedBook.value.isbn),
      name: selectedBook.value.name
    });
    selectedBook.value = null; 
    fetchBooks(); 
  } catch (error) {
    console.error('Error updating book: ', error);
  }
};
</script>
