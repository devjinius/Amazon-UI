const data = fetch('./resources/localData.json');

// prettier-ignore
data
  .then(response => response.json())
  .then(data => console.log(data));
