//функция по сортировке таблицы

export function dataSort(data, targetDataHTML) {
  let getSort = new dataSorting(data, targetDataHTML)
  let sortedData = getSort.sort()
  let result = true
  if(sortedData.sortCounter===0) {
    data = getSort.reverseSort();
    result = false;
  }
  return {data,result}
}


//класс, реализующий 2 метода: сортировку и обратную сортировку (reverse)
class dataSorting {
  #data;
  #targetDataHTML;
  #sortCounter
  constructor(data, targetDataHTML) {
    this.#data = data;
    this.#targetDataHTML = targetDataHTML;
    this.#sortCounter = 0;
  }

  sort() {
    this.#data.sort((a, b) => {
      let nameA, nameB
      
      try {
        if(a.name[this.#targetDataHTML] === undefined) {
          nameA=a[this.#targetDataHTML].toLowerCase();
          nameB=b[this.#targetDataHTML].toLowerCase()
        } else {
          nameA=a.name[this.#targetDataHTML].toLowerCase();
          nameB=b.name[this.#targetDataHTML].toLowerCase()
        }
      } catch (err) {
        console.log(err)
      }
      if (nameA < nameB) {//сортируем строки по возрастанию
        this.#sortCounter -=1
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0 // Никакой сортировки
    });
    return {data: this.#data, sortCounter: this.#sortCounter};
  }
  reverseSort() {
    return this.#data.reverse();
  }
}