import { controller } from '../js/modules/controller.js';
import { settings } from '../config.js'

/*Основной родительский компонент
 *на вход - конфигурация UI, импортируемая из settings
 *вызывает controller, передавая ему корневой html-элемент root и объект массива конфигурации UI settings
 *root - ключевой html-элемент, служит для вставки объекта из конфигурации в dom
*/

(function generateUI() {
  function callingController(dataCall) {
    //собираем ID объектов из массива объектов для передачи их в дочерний компонент
    let arrayID = dataCall.map( item => {
      return item.id;
    })
    //создаем компоненты UI вызывая контроллер, определяющий что создавать на основании dataCall
    dataCall.forEach( creatingObject => {
      controller(root, creatingObject, arrayID);
    })
  }
  const root = document.getElementById('root');
  
  //можно передавать разные объекты (для UI делать свои конфигурационные файлы или доработать текущий)
  callingController(settings)
})();