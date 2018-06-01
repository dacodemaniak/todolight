import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  private subscription: Subscription;
  private _todo: Todo;
  private _todos: Todo[];
  public todos: Todo[] = [];

  // Décorateur @Output()
  @Output() loadTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private _api: TodoService) {
    // Souscrire aux changement de todo
    this.subscription = this._api.getTodo()
      .subscribe((todo) => {
        console.log('Observable Todo : ' + JSON.stringify(todo));
        // Ajoute le todo à la liste des todos
        //let index = this._find(todo);
        let index = this.todos.findIndex((obj) => obj.getId() == todo.getId() );
        console.log('Index : ' + index);
        if (index === -1) {
          this.todos.push(todo);
        } else {
          this.todos[index] = todo;
        }
    });
  }

  public load(todo: Todo): void {
    this.loadTodo.emit(todo);
  }

  public delete(todo: Todo) {
    this._api.deleteTodo(todo.getId()).subscribe((data) => {
      let index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    });
  }

  ngOnInit() {
   this._api.getTodos().subscribe(
     (datas) => {
        for (let data of datas) {
          this.todos.push(new Todo().deserialize(data));
        }
     },
     (error) => {
       console.log('Erreur : ' + error);
     }
   );
  }

  private _find(toFind: Todo) {
    let index: Number = -1;
    let indice: Number = 0;

    for (let todo of this.todos) {
      console.log('Compare : ' + todo.getId() + ' à ' + toFind.getId());
      if (toFind.getId() == todo.getId()) {
        index = indice;
      }
    }
    return index;
  }
}
