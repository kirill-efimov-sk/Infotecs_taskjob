import { personList } from './personList/personList.js';
import { createPaginationList } from './personList/pagination.js';

/*Компонент определяющий по значению свойства id вызываемый модуль
 *на вход принимает:
 *- rootElement - корневой элемент
 *- creatingObject- объект из конфигурации для отрисовки UI
 *
 *ничего не возвращает
 *выполняет функцию маршрутизатора для отрисовки UI
*/

export function controller(rootElement, creatingObject, arrayID) {
  //вызов компонента по созданию списка людей и карточки редактирования
  //на вход передаем корневой hrml-элемент, объект и массив с ID объектов
  if(creatingObject.id.toLowerCase().includes('person')) personList(rootElement, creatingObject, arrayID);
  if(creatingObject.id.toLowerCase().includes('pagelist')) createPaginationList(rootElement, creatingObject);
}