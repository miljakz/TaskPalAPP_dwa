<template>
  <div id="app">
    <div v-if="user">
      <h2>Welcome, {{ user.email }}</h2>
      <button @click="logout">Logout</button>
      
      <div>
        <h3>Add Category</h3>
        <input v-model="newCategory" placeholder="New Category" />
        <button @click="addCategory">Add Category</button>
        <ul>
          <li v-for="category in categories" :key="category">
            {{ category }} <button @click="removeCategory(category)">Remove</button>
          </li>
        </ul>
      </div>

      <div>
        <h3>Add Task</h3>
        <input v-model="newTask.title" placeholder="Task Title" />
        <input v-model="newTask.category" placeholder="Task Category" />
        <button @click="addTask">Add Task</button>
        <ul>
          <li v-for="task in filteredTasks" :key="task.id">
            {{ task.title }} ({{ task.category }}) <button @click="removeTask(task.id)">Remove</button>
          </li>
        </ul>
      </div>

      <div>
        <h3>Filter Tasks</h3>
        <input v-model="filterCategory" placeholder="Filter by Category" />
      </div>
    </div>

    <div v-else>
      <h2>Login</h2>
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Login</button>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default {
  name: 'App',
  setup() {
    const email = ref('');
    const password = ref('');
    const user = ref(null);
    const error = ref('');
    const newCategory = ref('');
    const categories = ref([]);
    const newTask = ref({
      title: '',
      category: ''
    });
    const tasks = ref([]);
    const filterCategory = ref('');

    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        user.value = userCredential.user;
      } catch (err) {
        error.value = err.message;
      }
    };

    const logout = async () => {
      await signOut(auth);
      user.value = null;
    };

    const addCategory = () => {
      if (newCategory.value.trim()) {
        categories.value.push(newCategory.value);
        newCategory.value = '';
      }
    };

    const removeCategory = (category) => {
      categories.value = categories.value.filter(cat => cat !== category);
    };

    const addTask = () => {
      if (newTask.value.title.trim() && newTask.value.category.trim()) {
        const task = { ...newTask.value, id: Date.now() };
        tasks.value.push(task);
        newTask.value.title = '';
        newTask.value.category = '';
      }
    };

    const removeTask = (taskId) => {
      tasks.value = tasks.value.filter(task => task.id !== taskId);
    };

    const fetchCategories = () => {
      // Fetch categories from Firebase or local storage
    };

    const fetchTasks = () => {
      // Fetch tasks from Firebase or local storage
    };

    const filteredTasks = computed(() => {
      if (filterCategory.value) {
        return tasks.value.filter(task => task.category === filterCategory.value);
      }
      return tasks.value;
    });

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          user.value = currentUser;
          fetchCategories();
          fetchTasks();
        } else {
          user.value = null;
        }
      });
    });

    return {
      email,
      password,
      user,
      error,
      newCategory,
      categories,
      newTask,
      tasks,
      filterCategory,
      login,
      logout,
      addCategory,
      removeCategory,
      addTask,
      removeTask,
      filteredTasks
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
