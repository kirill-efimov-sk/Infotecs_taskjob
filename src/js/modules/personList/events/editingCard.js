import { createElement } from './../../create_elements.js';
import { edit } from './editingCard__edit.js';

/*Дочерний компонент
 *Создание карточки для редактирования информации о человеке
 *на вход принимает список аргументов: event, id
 *
*/

export function editingCard(event, id) {
  let form = document.getElementById(`${id}Form`);
  form.classList.add(`${id}__before`);

  let element = event.path[1];
  let countChild = element.childElementCount;
  if(countChild === 1) {
    return false
  } else if (countChild>4) {
    element = event.srcElement
    countChild = element.childElementCount
  }

  //удаляем элементы в исходной форме
  while (form.lastChild) {
    form.removeChild(form.lastChild);
  }
  //создание label и input, заполнение их данными
  for ( let i = 0; countChild > i; i++ ) {
    let label = createElement({type: 'label', id: `label__${element.children[i].id}`, className: `label__${element.className}`, innerHTML: element.children[i].id, styleElement: [], forLabel: element.id})
    let input = createElement({type: 'input', id: element.id, className: `input__${element.className}`, innerHTML: element.children[i].id, styleElement: [], value: element.children[i].innerText})
    //навешиваем событие для передачи данных в таблицу при изменении данных в поле input
    input.addEventListener('keyup' , event => edit(event, element.id, element.children[i].id), false)
    form.append(
      label,
      input)
  }
}