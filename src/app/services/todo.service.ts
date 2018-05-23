import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { Todo } from './../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todos: Todo[];

  constructor() {
    // Alimenter le tableau des todos
    let _todos: Todo[] = JSON.parse(localStorage.getItem('todos'));

    if (_todos !== null) {
     this.todos = _todos;
    }
   }

   public getTodos(): Observable<Todo[]> {
    return Observable.of(this.todos);
   }
}
