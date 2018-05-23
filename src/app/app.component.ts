import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo';

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
  public constructor(private formBuilder: FormBuilder) {}

  public get title() {
    return this.todoForm.get('title');
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
      ]
    });
  }

  public formSubmit(): void {
    if (this.todoForm.valid) {
      this._todo = new Todo();
      this._todo.setTitle(this.todoForm.controls.title.value);

      // Faire persister la données dans localStorage
      this._todo.persist();

      console.log('Validation du formulaire : ' + this._todo.getTitle());
    }
  }
}
