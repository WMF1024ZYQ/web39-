<template>
  <div id="app">
    <section class="todoapp">
      <add-todo @addTodo="addTodo"></add-todo>
      <todos :todoList="todoList" @delTodo="delTodo"></todos>
      <filter-footer v-bind:todoList="todoList" @clearTodo="clearTodo"></filter-footer>
    </section>

    <footer class="info">
      <p>Double-click to edit a todo</p>
      <!-- Remove the below line ↓ -->
      <p>
        Template by
        <a href="http://sindresorhus.com">Sindre Sorhus</a>
      </p>
      <!-- Change this out with your name and url ↓ -->
      <p>
        Created by
        <a href="http://todomvc.com">you</a>
      </p>
      <p>
        Part of
        <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  </div>
</template>
<script>
import axios from "axios";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import FilterFooter from "./components/FilterFooter";
export default {
  components: {
    AddTodo,
    Todos,

    FilterFooter
  },

  data() {
    return {
      todoList: []
    };
  },
  methods: {
    //渲染数据
    rendertodoList() {
      axios({
        url: "http://localhost:3000/todoList"
      }).then(res => {
        this.todoList = res.data;
      });
    },
    //添加新元素
    addTodo(value) {
      let newTodo = {
        id:
          this.todoList.length > 0
            ? this.todoList[this.todoList.length - 1].id + 1
            : 1,
        todo: value,
        iscompleted: false
      };

      axios({
        url: "http://localhost:3000/todoList",
        method: "post",
        data: newTodo
      }).then(res => {
        if (res.status == 201) {
          this.todoList.push(newTodo);
          console.log("添加成功");
        }
      });
    },
    //发送删除请求
    sendDeleteTodo(id) {
      return axios({
        url: `http://localhost:3000/todoList/${id}`,
        method: "delete"
      });
    },
    ////删除元素
    delTodo(id) {
      this.todoList = this.todoList.filter(item => {
        return item.id != id;
      });
      this.sendDeleteTodo(id).then(res => {
        if (res.status == 200) {
          console.log("删除成功");
        }
      });
    },
    clearTodo() {
      let clearTodos = this.todoList.filter(v => v.iscompleted);
      let count = 0;
      clearTodos.forEach(v => {
        this.sendDeleteTodo(v.id).then(res => {
          if (res.status == 200) {
            count++;
            if (count == clearTodos.length) {
              this.rendertodoList();
              console.log("删除成功");
            }
          }
        });
      });
    }
  },
  created() {
    this.rendertodoList();
  }
};
</script>
