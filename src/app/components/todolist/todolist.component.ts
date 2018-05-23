import { Component, OnInit } from '@angular/core';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  public todos: Todo[];

  constructor(private _todos: TodoService) { }


  ngOnInit() {
    /*this._todos.getTodos().subscribe(
      (datas) => {
        this.todos = datas; // ECMA Script 6
        console.log("Here : " + JSON.stringify(this.todos));
      },
      (error) => {
        console.log('Erreur : ' + error);
      }
    );*/
    console.log('ngOnInit');
    this._todos.getTodos().pipe(
      map((data: Todo[]) => {
        console.log('Données : ' + JSON.stringify(data));
        this.todos = data;
      })
    );
  }

}
