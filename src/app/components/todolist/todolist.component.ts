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
  private _todos: Todo[];
  public todos: Todo[] = [];

  constructor(private _api: TodoService) { }


  ngOnInit() {
   this._api.getTodos().subscribe(
     (datas) => {
       console.log(JSON.stringify(datas));
       this.todos = datas;
     },
     (error) => {
       console.log('Erreur : ' + error);
     }
   );
  }

}
