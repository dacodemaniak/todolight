import * as moment from 'moment';

export class Todo {

  public id: number;
  public title: string;
  public debut: any;
  public fin: any;

  public constructor() {}

  public getId(): number {
    return this.id;
  }
  /**
   * Retourne le titre du todo
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Définit le titre du todo
   * @param title
   * @return Todo
   */
  public setTitle(title: string): Todo {
    this.title = title;
    return this;
  }

  public getDebut(): moment.Moment {
    return moment(this.debut, 'YYYY-MM-DD');
  }

  public getFin(): moment.Moment {
    return moment(this.fin, 'YYYY-MM-DD');
  }

  /**
   * Casting d'un objet de type "any" en type Todo
   * @param input Données à traiter
   */
  public deserialize(input: any): Todo {
    Object.assign(this, input);
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
