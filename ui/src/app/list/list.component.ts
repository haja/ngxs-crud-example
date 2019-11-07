import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoState} from '../states/todo.state';
import {Observable} from 'rxjs';
import {Todo} from '../models/Todo';
import {DeleteTodo, GetTodos, GetUsers, SetSelectedTodo} from '../actions/todo.action';
import {User} from '../models/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;
  @Select(TodoState.getUserList) users: Observable<User[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetUsers());

    // Hässliche Lösung
    this.users.subscribe(users => {
      if (users.length > 0) {
        this.selectUser(users[0].id);
      }
    })
  }

  deleteTodo(id: number) {
    this.store.dispatch(new DeleteTodo(id));
  }

  editTodo(payload: Todo) {
    this.store.dispatch(new SetSelectedTodo(payload));
  }

  selectUser(userid: number) {
    this.store.dispatch(new GetTodos(userid));
  }

}
