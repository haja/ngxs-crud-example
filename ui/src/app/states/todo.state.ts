import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Todo} from '../models/Todo';
import {TodoService} from '../todo.service';
import {tap} from 'rxjs/operators';
import {AddTodo, DeleteTodo, GetTodos, GetUsers, SetSelectedTodo, UpdateTodo} from '../actions/todo.action';
import {User} from '../models/User';
import {UserService} from '../user.service';

export class TodoStateModel {
  users: User[];
  selectedUser: User;
  todos: Todo[];
  selectedTodo: Todo;
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    users: [],
    selectedUser: null,
    todos: [],
    selectedTodo: null
  }
})
export class TodoState {

  constructor(private todoService: TodoService,
              private userService: UserService) {
  }

  @Selector()
  static getTodoList(state: TodoStateModel) {
    return state.todos;
  }

  @Selector()
  static getUserList(state: TodoStateModel) {
    return state.users;
  }

  @Selector()
  static getSelectedTodo(state: TodoStateModel) {
    return state.selectedTodo;
  }

  @Action(GetTodos)
  getTodos({getState, setState}: StateContext<TodoStateModel>, {userid}: GetTodos) {
    return this.todoService.fetchTodos(userid).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        todos: result,
      });
    }));
  }

  @Action(AddTodo)
  addTodo({getState, patchState}: StateContext<TodoStateModel>, {payload}: AddTodo) {
    return this.todoService.addTodo(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        todos: [...state.todos, result]
      });
    }));
  }

  @Action(UpdateTodo)
  updateTodo({getState, setState}: StateContext<TodoStateModel>, {payload, id}: UpdateTodo) {
    return this.todoService.updateTodo(payload, id).pipe(tap((result) => {
      const state = getState();
      const todoList = [...state.todos];
      const todoIndex = todoList.findIndex(item => item.id === id);
      todoList[todoIndex] = result;
      setState({
        ...state,
        todos: todoList,
      });
    }));
  }


  @Action(DeleteTodo)
  deleteTodo({getState, setState}: StateContext<TodoStateModel>, {id}: DeleteTodo) {
    return this.todoService.deleteTodo(id).pipe(tap(() => {
      const state = getState();
      const filteredArray = state.todos.filter(item => item.id !== id);
      setState({
        ...state,
        todos: filteredArray,
      });
    }));
  }

  @Action(SetSelectedTodo)
  setSelectedTodoId({getState, setState}: StateContext<TodoStateModel>, {payload}: SetSelectedTodo) {
    const state = getState();
    setState({
      ...state,
      selectedTodo: payload
    });
  }

  @Action(GetUsers)
  getUsers({patchState}: StateContext<TodoStateModel>) {
    return this.userService.fetchUsers().pipe(tap(result => {
      patchState({
        users: result,
      });
    }));
  }


}
