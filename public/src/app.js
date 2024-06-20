import { createApp, ref, computed, onMounted } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAP-8IoWSYxNhvNAHq18yOe5S1B6nZKJQ4",
    authDomain: "task-e1b5f.firebaseapp.com",
    projectId: "task-e1b5f",
    storageBucket: "task-e1b5f.appspot.com",
    messagingSenderId: "877382835559",
    appId: "1:877382835559:web:b315dbc787c26643d323c2",
    measurementId: "G-PZGJGBVYD5"
};

initializeApp(firebaseConfig);
const auth = getAuth();

createApp({
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
}).mount('#app');
