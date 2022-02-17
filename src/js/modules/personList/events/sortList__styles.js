//функция, которая удаляет стили в header'e возвращая исходный стиль для .person__filter:after
export function styleСontroller(id, style1, style2) {
  let parentNodeHeader = document.getElementById(id).parentNode;
  for ( let i = 0; parentNodeHeader.childElementCount > i; i++) {
    if(Array.from(parentNodeHeader.children[i].classList).includes(style2)) {
      parentNodeHeader.children[i].classList.remove(style2);
    };
    if(Array.from(parentNodeHeader.children[i].classList).includes(style1)) {
      parentNodeHeader.children[i].classList.remove(style1);
    };
  };
}
//функция для смены стилей .person__filterDown:after и .person__filterUp:after
export function styleToggle(id, parameter, style1, style2) {
  let element = document.getElementById(id);
  if(parameter) {
    element.classList.remove(style1);
    element.classList.add(style2);
  } else {
    element.classList.remove(style2);
    element.classList.add(style1);
  }
}