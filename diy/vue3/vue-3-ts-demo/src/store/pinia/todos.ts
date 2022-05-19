import { defineStore } from "pinia";
interface Todo {
  text: string;
  id: number;
  isFinished: boolean;
}
export const todos = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
    filter: "all",
    nextId: 0,
  }),
  getters: {
    finishedTodos(state): Todo[] {
      return state.todos.filter((todo: Todo) => todo.isFinished);
    },
    unfinishedTodos(state): Todo[] {
      return state.todos.filter((todo: Todo) => !todo.isFinished);
    },
    filteredTodos(state): Todo[] {
      if (this.filter === "finished") {
        return this.finishedTodos;
      } else if (this.filter === "unfinished") {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    addTodo(text: string) {
      this.todos.push({ text, id: this.nextId++, isFinished: false });
    },
  },
});
