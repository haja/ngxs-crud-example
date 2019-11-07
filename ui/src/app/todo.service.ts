import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from './models/Todo';
import {User} from './models/User';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  fetchTodos(userid: number) {
    return this.http.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos?userId=${userid}`);
  }

  deleteTodo(id: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  addTodo(payload: Todo) {
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', payload);
  }

  updateTodo(payload: Todo, id: number) {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, payload);
  }
}
