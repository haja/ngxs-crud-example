import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoState} from '../states/todo.state';
import {Observable} from 'rxjs';
import {Todo} from '../models/Todo';
import {DeleteTodo, GetTodos, SetSelectedTodo} from '../actions/todo.action';
import {User} from '../models/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;

  // TODO implement
  users: User[] = [];

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetTodos());
  }

  deleteTodo(id: number) {
    this.store.dispatch(new DeleteTodo(id));
  }

  editTodo(payload: Todo) {
    this.store.dispatch(new SetSelectedTodo(payload));
  }

  selectUser(userid: number) {
    // TODO implement
  }

}
