import { createPersonlist } from './create_personList.js';
import { createElement } from '../create_elements.js';

/*Компонент создающий список людей и карточку редактирования
 *взависимости от id вызывает нужный модуль (в текущей реализации 1):
 *1. createPersonlist - создает список людей в виде таблицы и карточки
 *на вход принимает:
 *- rootElement - корневой элемент
 *- creatingObject- объект из конфигурации для отрисовки UI
 *- verifiedIDs - массив, определяющий вызов нужного модуля/компонента
*/

export function personList(rootElement, creatingObject, verifiedIDs) {
  //создаем главный контейнер для  хранения
  let personContainer = document.getElementById(creatingObject.containerId);
  if(personContainer === null) {
    personContainer = createElement({
      type: creatingObject.type, 
      id: creatingObject.containerId, 
      className: creatingObject.containerStylelist, 
      innerHTML: '', 
      styleElement: {}})
  }

  verifiedIDs.forEach(verifiedItem => {
    if(verifiedItem === creatingObject.id) createPersonlist( //создание списка людей в виде таблицы и карточки
      personContainer, 
      creatingObject.id, 
      creatingObject.typeStructure, 
      creatingObject.url, 
      creatingObject.stylelist,
      creatingObject.innerHTML,
      creatingObject.dataStructure,
      );
    //тут вставляем созданные данные в корневой html-элемент root (создается в main.js)
    rootElement.append(personContainer);
  })
}