import { readJSON } from '../readJSON.js';
import { createElement } from '../create_elements.js';
import { createLeafrows } from './create_rows.js'
import { createHeader } from './create_header.js'
import { LocalStorageWorker } from './localstorage.js'

/*Дочерний компонент
 *Отвечает за создание списка людей и карточки выделенного человека
 *на вход принимает список аргументов: rootElement, id, typeStructure, url, stylelist, innerHTML, dataStructure
 *все аргументы берутся из settings (config.js)
 *
 *Если у аргумента url есть ссылка - генерация таблицы/списка
 *Если у аргумента url нет ссылки (переменная пустая) - создаем карточку (div+form)
*/

export function createPersonlist(rootElement, id, typeStructure, url, stylelist, innerHTML, dataStructure) {
  let container = createElement({type: typeStructure.main, id: `${id}__${typeStructure.main}`, className: `container__${id}`, innerHTML: innerHTML, styleElement: []})
  
  if(url.length > 0) { //если у аргумента url есть ссылка - генерация таблицы/списка (см описание выше)
    let personlist = createElement({type: typeStructure.firstSubtype, id: `${id}__${typeStructure.firstSubtype}`, className: id, innerHTML: '', styleElement: []})

    //получаем данные из JSON
    readJSON()(url, {})
      .then(result => {
        //Сохраняем данные в localStorage
        let saveResult = new LocalStorageWorker('userJSON');
        saveResult.write(result)
        
        result.forEach( (dataItem, index) => {

          //ОСНОВНАЯ ЧАСТЬ:
          //создание таблицы/списка
          if(index===0) createHeader(personlist, id, stylelist, typeStructure, dataItem, dataStructure)
          createLeafrows(personlist, id, stylelist, typeStructure, dataItem, dataStructure)
          container.append(personlist)
          rootElement.prepend(container);
        });
      });
  //ОСНОВНАЯ ЧАСТЬ:
  //иначе создаем обычный контейнер (см описание выше)
  } else { 
    container.append(createElement({type: typeStructure.firstSubtype, id: `${id}Form`, className: `${id}__form`, innerHTML: 'click on a row in the table', styleElement: []}))
    rootElement.append(container)
  }
};