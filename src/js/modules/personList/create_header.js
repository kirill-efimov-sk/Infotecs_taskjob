import { createElement } from '../create_elements.js';
import { sortList } from '../personList/events/sortList.js';

//функция для генерации header'a таблицы/списка
export function createHeader(personlist, id, stylelist, typeStructure, dataItem, dataStructure) {
  let header = createElement({type: typeStructure.secondSubtype, id: `${id}_${typeStructure.secondSubtype}`, className: stylelist, innerHTML: '', styleElement: []});
  let arraySubHeaderElements = dataStructure.map ( item => {
    return createElement({data: dataItem, type: item.type, id: `${item.id}`, className: [item.stylelist, item.styleheader], innerHTML: item.name, styleElement: {}});
  });
  header.append(...arraySubHeaderElements);
  header.addEventListener('click' , event => sortList(event, id, stylelist, typeStructure, dataStructure), false); //вешаем событие сортировки
  personlist.append(header);
}