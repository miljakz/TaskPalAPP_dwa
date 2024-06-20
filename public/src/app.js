const firebaseConfig = {
    apiKey: "AIzaSyAP-8IoWSYxNhvNAHq18yOe5S1B6nZKJQ4",
    authDomain: "task-e1b5f.firebaseapp.com",
    projectId: "task-e1b5f",
    storageBucket: "task-e1b5f.appspot.com",
    messagingSenderId: "877382835559",
    appId: "1:877382835559:web:b315dbc787c26643d323c2",
    measurementId: "G-PZGJGBVYD5"
};

firebase.initializeApp(firebaseConfig);

new Vue({
    el: '#app',
    data: {
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
    },
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                this.fetchCategories();
                this.fetchTasks();
            } else {
                this.user = null;
            }
        });
    },
    methods: {
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(userCredential => {
                    this.user = userCredential.user;
                })
                .catch(error => {
                    this.error = error.message;
                });
        },
        logout() {
            firebase.auth().signOut().then(() => {
                this.user = null;
            });
        },
        addCategory() {
            if (this.newCategory.trim()) {
                this.categories.push(this.newCategory);
                this.newCategory = '';
            }
        },
        removeCategory(category) {
            this.categories = this.categories.filter(cat => cat !== category);
        },
        addTask() {
            if (this.newTask.title.trim() && this.newTask.category.trim()) {
                const task = { ...this.newTask, id: Date.now() };
                this.tasks.push(task);
                this.newTask.title = '';
                this.newTask.category = '';
            }
        },
        removeTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
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
});
