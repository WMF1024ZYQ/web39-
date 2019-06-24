<template>
  <footer class="footer" v-show="todoList.length">
    <span class="todo-count">
      <strong v-text="getCount"></strong> item left
    </span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <!-- <a class="selected" href="#/" @click="filfterTodoList('All')">All</a> -->
        <router-link to="/" active-class="selected" @click.native="filfterTodoList('All')" exact>All</router-link>
      </li>
      <li>
        <!-- <a href="#/active" @click="filfterTodoList('Active')">Active</a> -->
        <router-link
          to="/active"
          active-class="selected"
          @click.native="filfterTodoList('Active')"
        >Active</router-link>
      </li>
      <li>
        <!-- <a href="#/completed" @click="filfterTodoList('Completed')">Completed</a> -->
        <router-link
          to="/completed"
          active-class="selected"
          @click.native="filfterTodoList('Completed')"
        >Completed</router-link>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed" v-show="showTodoList" @click="cleartodoListFish">Clear completed</button>
  </footer>
</template>

<script>
export default {
  props: ["todoList"],

  data() {
    return {
      // todoList: []
    };
  },
  methods: {
    //清除已完成任务
    cleartodoListFish() {
      this.$emit("clearTodo");
    },
    filfterTodoList(value) {
      this.$bus.$emit("filfterTodoList", value);
    }
  },
  computed: {
    //未完成的任务数量
    getCount() {
      let newTodoList = this.todoList.filter(v => !v.iscompleted);
      return newTodoList.length;
    },
    //是否有已完成的任务
    showTodoList() {
      return this.todoList.some(v => v.iscompleted);
    }
  }
};
</script>

<style>
</style>
