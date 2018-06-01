import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from './../models/todo';
import { Constants } from './../constants/constants';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private subject: Subject<Todo> = new Subject<Todo>();


  constructor(
    private _http: HttpClient
  ) {}

  /**
   * Méthode utilisée pour diffuser le sujet
   * vers tous les abonnés à ce sujet
   * @param todo
   */
  public sendTodo(todo: Todo) {
    this.subject.next(todo);
  }

  /**
   * Méthode permettant aux "consommateurs"
   * de souscrire au sujet.
   */
  public getTodo(): Observable<Todo> {
    return this.subject.asObservable();
  }

  /**
   * Désabonnement
   */
  public clearTodo(): void {
    this.subject.next();
  }

   public getTodos(): Observable<Todo[]> {
    return this._http.get<Todo[]>(Constants.allTodos);
   }

   public addTodo(todo: Todo): Observable<Todo> {
     return this._http.post<Todo>(Constants.addTodo, todo);
   }

   public deleteTodo(id: number): Observable<number> {
     return this._http.delete<number>(Constants.deleteTodo +  id);
   }

   public updateTodo(id: number, todo: Todo): Observable<Todo> {
     return this._http.put<Todo>(Constants.updateTodo + id, todo);
   }
}
