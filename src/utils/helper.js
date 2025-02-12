// set item to local storage
export function setItemToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }


  // get item from local storage
export function getItemFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }