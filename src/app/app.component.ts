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
  /**
   * Méthode invoquée immédiatement après l'instanciation de l'objet
   */
  public ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      debut: [
        '',
        [
          Validators.required
        ]
      ],
      fin: [
        '',
        [
          Validators.required
        ]
      ]
    });
  }

  public formSubmit(): void {
    this._api.addTodo(this.todoForm.value)
      .subscribe((data) => {
        // Utiliser la méthode pour informer des modifications
        this._api.sendTodo(new Todo().deserialize(data[0]));
    });
  }
}
