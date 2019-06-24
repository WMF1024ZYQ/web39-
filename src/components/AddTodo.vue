<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      @keyup.enter="addTodo"
      v-model="addTodoValue"
      placeholder="What needs to be done?"
      autofocus
    >
  </header>
</template>

<script>
export default {
  data() {
    return {
      addTodoValue: ""
    };
  },
  methods: {
    addTodo() {
      this.$emit("addTodo", this.addTodoValue);
      this.addTodoValue = "";
    }
  }
};
</script>

<style>
</style>

