import { createElement } from '../create_elements.js';
import { editingCard } from './events/editingCard.js';

//функция для генерации таблицы/списка
export function createLeafrows(personlist, id, stylelist, typeStructure, dataItem, dataStructure) {
  //функция для генерации подэлементов (см dataStructure в config.js)
  function createSubElement(item, dataItem) {
    return createElement({data: dataItem, type: item.subElement.type, id: item.subElement.id, className: item.subElement.stylelist, innerHTML: '', styleElement: item.subElement.styleElement, title: dataItem[item.key]});
  }

  let user = createElement({data: dataItem, type: typeStructure.secondSubtype, id: dataItem.id, className: stylelist, innerHTML: '', styleElement: []});
  let arraySubElements = dataStructure.map ( item => {
    if(item.subkey.length === 0 || item.subkey === undefined) {
      let el = createElement({data: dataItem, type: item.type, id: item.id, className: item.stylelist, innerHTML: dataItem[item.key], styleElement: item.styleElement, title: `${item.id}: ${dataItem[item.key]}`});
      if(Object.keys(item.subElement).length > 0) el.append(createSubElement(item, dataItem))
      return el
    } else {
      let el = createElement({data: dataItem, type: item.type, id: item.id, className: item.stylelist, innerHTML: dataItem[item.key][item.subkey], styleElement: item.styleElement, title: `${item.id}: ${dataItem[item.key][item.subkey]}`});
      if(Object.keys(item.subElement).length > 0) el.append(createSubElement(item, dataItem))
      return el
    };
  });
  
  user.append(...arraySubElements);
  user.addEventListener('click' , event => editingCard(event, 'aboutPerson'), false);
  personlist.append(user);
}