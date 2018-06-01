import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo';
import { TodoService } from './services/todo.service';
import { Constants } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pageTitle = 'Todo Light';
  public buttonContent: String = 'Ajouter';
  private _updateMode: Boolean = false;
  private _todo: Todo;

  /**
   * Groupe de champs du formulaire
   */
  public todoForm: FormGroup;

  /**
   * Injecte une instance de FormBuilder dans le contrôleur
   * @param formBuilder Instance d'un objet formBuilder injecté
   */
  public constructor(
    private formBuilder: FormBuilder,
    private _api: TodoService) {}

  public get title() {
    return this.todoForm.get('title');
  }

  public get debut() {
    return this.todoForm.get('debut');
  }

  public get fin() {
    return this.todoForm.get('fin');
  }

  public receiveTodo(todo: Todo) {
    console.log('Todo reçu : ' + JSON.stringify(todo));
    this.buttonContent = 'Mettre à jour';
    this._updateMode = true;
    this._todo = todo;
    this._makeForm(todo);
  }

  /**
   * Méthode invoquée immédiatement après l'instanciation de l'objet
   */
  public ngOnInit(): void {
    this._makeForm();
  }

  public formSubmit(): void {
    if (!this._updateMode) {
      this._api.addTodo(this.todoForm.value)
        .subscribe((data) => {
          // Utiliser la méthode pour informer des modifications
          this._api.sendTodo(new Todo().deserialize(data[0]));
      });
    } else {
      this._api.updateTodo(this._todo.id, this.todoForm.value)
        .subscribe((data) => {
          this._todo = new Todo().deserialize(data);
          this._api.sendTodo(this._todo);
        });
    }
  }

  private _makeForm(todo: Todo = null): void {
    if ( todo === null) {
      todo = new Todo();
    }

    this.todoForm = this.formBuilder.group({
      title: [
        todo.getTitle(),
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      debut: [
        todo.getDebut().format('YYYY-MM-DD'),
        [
          Validators.required
        ]
      ],
      fin: [
        todo.getDebut().format('YYYY-MM-DD'),
        [
          Validators.required
        ]
      ]
    });
  }
}
