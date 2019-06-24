<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <li
        v-for="item in todoListShow"
        :key="item.id"
        @dblclick="editTodo(item.id)"
        :class="{completed: item.iscompleted,editing: currentId == item.id}"
      >
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            @change="editIscompleted(item.id)"
            v-model="item.iscompleted"
            value="2"
          >
          <label v-text="item.todo"></label>
          <button class="destroy" @click="removeTodo(item.id)"></button>
        </div>
        <input class="edit" v-model="item.todo" @keyup.enter="restTodo">
      </li>
    </ul>
  </section>
</template>

<script>
import axios from "axios";
export default {
  props: ["todoList"],
  data() {
    return {
      filter: "All",
      currentId: -1
    };
  },
  methods: {
    //修改状态
    editIscompleted(id) {
      let todo = this.todoList.find(v => v.id == id);
      axios({
        url: `http://localhost:3000/todoList/${id}`,
        method: "patch",
        data: {
          iscompleted: todo.iscompleted
        }
      }).then(res => {
        if (res.status == 200) {
          console.log("状态更新成功");
        }
      });
    },

    // 删除指定元素
    removeTodo(id) {
      this.$emit("delTodo", id);
    },

    //双击修改指定元素样式
    editTodo(id) {
      this.currentId = id;
    },
    //筛选参数
    filfterTodoList(value) {
      this.filter = value;
    },
    //回车修改元素
    restTodo() {
      let todos = this.todoList.find(v => v.id == this.currentId);
      axios({
        url: `http://localhost:3000/todoList/${todos.id}`,
        method: "patch",
        data: {
          todo: todos.todo
        }
      }).then(res => {
        if (res.status == 200) {
          console.log("内容更新成功");
        }
      });
      this.currentId = -1;
    }
  },
  computed: {
    //筛选模型数据
    todoListShow() {
      if (this.filter == "All") {
        return this.todoList;
      } else if (this.filter == "Active") {
        return this.todoList.filter(v => !v.iscompleted);
      } else if (this.filter == "Completed") {
        return this.todoList.filter(v => v.iscompleted);
      }
      return [];
    }
  },
  created() {
    this.$bus.$on("filfterTodoList", this.filfterTodoList);
  }
};
</script>
