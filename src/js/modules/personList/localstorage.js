//Инкапсулированный класс для работы с localStorage

export class LocalStorageWorker {
  #key
  constructor (key) {
    this.#key = key;
  }
  read() {
    return JSON.parse (localStorage.getItem (this.#key));
  }
  write(data) {
    localStorage.setItem (this.#key, JSON.stringify(data));
  }
}