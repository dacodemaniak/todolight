export class Todo {

  private _title: string;

  public constructor() {}

  /**
   * Retourne le titre du todo
   */
  public getTitle(): string {
    return this._title;
  }

  /**
   * Définit le titre du todo
   * @param title
   * @return Todo
   */
  public setTitle(title: string): Todo {
    this._title = title;
    return this;
  }

  public persist(): void {
    let _todos: any;

    if (localStorage.getItem('todos') !== null) {
      // La clé "todos" existe dans le stockage local
      _todos = JSON.parse(localStorage.getItem('todos'));
    } else {
      _todos = []; // Initialise un tableau
    }

    // Alimente le tableau avec la donnée à faire persister
    _todos.push(this);

    // Stocke la nouvelle valeur pour la clé courante
    localStorage.setItem('todos', JSON.stringify(_todos));
  }
}
