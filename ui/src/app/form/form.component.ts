import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoState} from '../states/todo.state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../models/Todo';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AddTodo, SetSelectedTodo, UpdateTodo} from '../actions/todo.action';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {
  @Select(TodoState.getSelectedTodo) selectedTodo: Observable<Todo>;
  todoForm: FormGroup;
  editTodo = false;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.selectedTodo.subscribe(todo => {
      if (todo) {
        this.todoForm.patchValue({
          id: todo.id,
          userId: todo.userId,
          title: todo.title
        });
        this.editTodo = true;
      } else {
        this.editTodo = false;
      }
    });
  }

  createForm() {
    this.todoForm = this.fb.group({
      id: [''],
      userId: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.editTodo) {
      this.store.dispatch(new UpdateTodo(this.todoForm.value, this.todoForm.value.id)).subscribe(() => {
        this.clearForm();
      });
    } else {
      this.store.dispatch(new AddTodo(this.todoForm.value)).subscribe(() => {
        this.clearForm();
      });
    }
  }

  clearForm() {
    this.todoForm.reset();
    this.store.dispatch(new SetSelectedTodo(null));
  }

}