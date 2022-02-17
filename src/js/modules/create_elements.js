export function createElement(dataObject) {
  let { data, type, id, className, innerHTML, styleElement, title, forLabel, value } = dataObject;

  let element = document.createElement(type);

  if(id !== undefined || id.length !== 0) element.id = id;
  if(className !== undefined || className.length !== 0) Array.isArray(className) ? element.classList.add(...className) : element.classList.add(className);
  if(innerHTML !== undefined || innerHTML.length !== 0) element.innerHTML = innerHTML;
  if(styleElement.length > 0) {
    styleElement.forEach(item => {
      if(Object.keys(item).length !== 0) {
        element.style[item.name] = data[item.value];
      }
    });
  }
  if(title !== undefined ) element.title = title;
  if(forLabel !== undefined) element.setAttribute('for', forLabel);
  if(value !== undefined) element.value = value;

  return element;
}