export function pause(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * (arr.length))];

  if (item === not) {
    console.log('Oh no, we used this one last time, look again');
    randomItemFromArray(arr, not);
  }
  return item;
}
