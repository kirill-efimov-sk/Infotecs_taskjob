import { LocalStorageWorker } from '../localstorage.js'

//функция для редактирования строки таблицы

export function edit(e, id, childrenId) {
  let el = document.getElementById(id)
  
  for( let i = 0; el.childElementCount > i; i++) {
    if(el.childNodes[i].id === childrenId) {
      el.childNodes[i].classList.add('editing__element')
      if(el.childNodes[i].childElementCount > 0) {
        let lastChildren = el.childNodes[i].lastChild
        el.childNodes[i].innerHTML = e.target.value
        el.childNodes[i].title = `${el.childNodes[i].id}: ${e.target.value}`
        el.childNodes[i].append(lastChildren)
        
        lastChildren.style['backgroundColor'] = e.target.value;
      } else {
        el.childNodes[i].innerHTML = e.target.value
        el.childNodes[i].title = `${el.childNodes[i].id}: ${e.target.value}`
      }
      setTimeout( () => el.childNodes[i].classList.remove('editing__element'), 200)
    }
  }
  //Сохраняем изменения в localStorage
  let saveResult = new LocalStorageWorker('userJSON');
  let data = saveResult.read()
  let reviewData = data.map(element => {
    if(element.id === el.id) {
      element = updateData(element, childrenId, e)
      return element
    } else {
      return element;
    }
  });
  saveResult.write(reviewData)
}

//перебор объекта и его вложенных объектов через рекурсию
function updateData(element, childrenId, e){
  for (let key in element) {
    if(key === childrenId || Object.keys(element[key]).length > 1 && typeof(element[key]) === 'object' ) {
      if(Object.keys(element[key]).length > 1 && typeof(element[key]) === 'object') {
        updateData(element[key], childrenId, e)
        element[key][childrenId] = e.target.value
      } else {
        element[key] = e.target.value
      }
      
    }
  }
  return element
}
  