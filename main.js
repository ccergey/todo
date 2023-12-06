const todoItem = {
    props: ["todo"],

    methods: {
        removeItem(todo) {
            console.log(todo)
            const index = this.todoList.indexOf(todo);
            if (index !== -1) {
                this.todoList.splice(index, 1);
            } else {
                console.log(555)
            }
        },
    },

    template: `
    <div class = "item" :data-id = "todo.id">
        <input type = "checkbox" :checked = "todo.completed" :key ="todo">{{ todo.title }}
        <span class = "delete"  @click ="removeItem(todo)">&times;</span>
    </div>
    `,
}

const app = Vue.createApp({
    data() {
        return {
            todoList: [],
            newItem: '',
        }
    },
    methods: {

        addItem() {
            let cnt = this.todoList.length + 1;
            this.todoList.unshift({ title: this.newItem, id: cnt });
            this.newItem = '';
        },


    },
    components: {
        "todo-item": todoItem,
    },
    mounted() {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => (this.todoList = json))
    }
})
app.mount('#todo')