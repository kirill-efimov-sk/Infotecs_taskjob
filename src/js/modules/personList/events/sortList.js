import { createElement } from './../../create_elements.js';
import { createLeafrows } from '../create_rows.js';
import { dataSort } from './sortList__sort.js';
import { styleСontroller, styleToggle } from './sortList__styles.js';
import { LocalStorageWorker } from '../localstorage.js'

/*Дочерний компонент
 *Отвечает за сортировку таблицы
 *на вход принимает список аргументов: event, id, stylelist, typeStructure, dataStructure
 *
 *Собирает данные с таблицы и преобразует их в новый [{}] с данными, которые будут сортироваться
 *Если у аргумента url нет ссылки (переменная пустая) - создаем карточку (div+form)
*/

export function sortList(event, id, stylelist, typeStructure, dataStructure) {
  //Получаем данные из localStorage
  let saveResult = new LocalStorageWorker('userJSON');
  let data = saveResult.read();


  let element = document.querySelector(`.${id}`);
  let personlist = createElement({type: typeStructure.firstSubtype, id: id, className: id, innerHTML: '', styleElement: []})

  styleСontroller(event.target.id, 'person__filterUp', 'person__filterDown')

  //удаляем таблицу полностью кроме header
  while (element.lastChild) {
    if(element.childElementCount === 1) break;
    element.removeChild(element.lastChild);
  }

  //сортируем данные и создаем заново всю таблицу построчно
  let sortedData = dataSort(data, event.target.id)
  //Перезаписываем данные в localStorage
  saveResult.write(sortedData.data)

  sortedData.data.forEach( dataItem => {
    //создание таблицы/списка
    createLeafrows(personlist, id, stylelist, typeStructure, dataItem, dataStructure)
    while (personlist.firstChild) {
      element.append(personlist.firstChild);
    }
    styleToggle(event.target.id, sortedData.result, 'person__filterUp', 'person__filterDown')
  });
}