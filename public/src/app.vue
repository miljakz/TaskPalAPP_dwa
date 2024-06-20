<template>
  <div id="app">
    <header class="center">
      <h1>TaskPal</h1>
      <img class="logo" src="logo.png" alt="TaskPal Logo">
    </header>
    <main>
      <div v-if="user">
        <!-- Category Management -->
        <section>
          <h2>Manage Categories</h2>
          <form @submit.prevent="addCategory">
            <input type="text" v-model="newCategory" placeholder="New Category" required>
            <button type="submit" class="button">Add Category</button>
          </form>
          <ul>
            <li v-for="category in categories" :key="category">
              {{ category }} <button @click="removeCategory(category)">Remove</button>
            </li>
          </ul>
        </section>

        <!-- Task Management -->
        <section>
          <h2>Tasks</h2>
          <form @submit.prevent="addTask">
            <input type="text" v-model="newTask.title" placeholder="Task Title" required>
            <select v-model="newTask.category" required>
              <option v-for="category in categories" :key="category">{{ category }}</option>
            </select>
            <button type="submit" class="button">Add Task</button>
          </form>
          <h3>Filter Tasks</h3>
          <select v-model="filterCategory">
            <option value="">All</option>
            <option v-for="category in categories" :key="category">{{ category }}</option>
          </select>
          <ul>
            <li v-for="task in filteredTasks" :key="task.id">
              {{ task.title }} - {{ task.category }} <button @click="removeTask(task.id)">Remove</button>
            </li>
          </ul>
        </section>

        <button class="button" @click="logout">Logout</button>
      </div>
      <div v-else>
        <!-- Login form -->
        <form @submit.prevent="login" class="form-container">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
          <button type="submit" class="button">Login</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </main>
    <footer class="center footer">
      <p>© 2023 TaskPal. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
// Import Firebase SDK components as needed
import { ref, computed } from 'vue';

export default {
  name: 'App',
  data() {
    return {
      email: '',
      password: '',
      user: null,
      error: '',
      newCategory: '',
      categories: [],
      newTask: {
        title: '',
        category: ''
      },
      tasks: [],
      filterCategory: ''
    };
  },
  created() {
    // Initialize Firebase and handle authentication
    // Example:
    // firebase.initializeApp(firebaseConfig);
    // firebase.auth().onAuthStateChanged(...)
  },
  methods: {
    login() {
      // Handle login with Firebase
      // Example:
      // firebase.auth().signInWithEmailAndPassword(...)
    },
    logout() {
      // Handle logout with Firebase
      // Example:
      // firebase.auth().signOut()
    },
    addCategory() {
      // Add category logic (update Firebase or local storage)
    },
    removeCategory(category) {
      // Remove category logic (update Firebase or local storage)
    },
    addTask() {
      // Add task logic (update Firebase or local storage)
    },
    removeTask(taskId) {
      // Remove task logic (update Firebase or local storage)
    },
    fetchCategories() {
      // Fetch categories from Firebase or local storage
    },
    fetchTasks() {
      // Fetch tasks from Firebase or local storage
    }
  },
  computed: {
    filteredTasks() {
      if (this.filterCategory) {
        return this.tasks.filter(task => task.category === this.filterCategory);
      }
      return this.tasks;
    }
  }
};
</script>

<style scoped>
/* Scoped CSS for App.vue component */
/* Adjust styles as needed */
.center {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

main {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
}

input[type=email],
input[type=password],
input[type=text],
select {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.footer {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}
</style>
