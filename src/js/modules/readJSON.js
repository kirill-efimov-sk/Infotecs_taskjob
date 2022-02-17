export function readJSON() {
  return async function getData(url, data) {
    try {
      let response = await fetch(url, {
      method: 'GET'
      });
      data = await response.json();
    } catch(err) {
      data = {errorMSG: err}
    }
  
    return await data
  }
}