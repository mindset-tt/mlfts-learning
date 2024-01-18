function binarySearch(array, value) {
  let firstIndex = 0;
  let lastIndex = array.length - 1;
  while (firstIndex <= lastIndex) {
    let middleIndex = Math.floor((firstIndex + lastIndex) / 2);
    if (array[middleIndex] === value) {
      return middleIndex;
    }
    if (array[middleIndex] > value) {
      lastIndex = middleIndex - 1;
    } else {
      firstIndex = middleIndex + 1;
    }
  }
  return -1;
}
function binarySearchNew(array, value) {
  let firstIndex = 0;
  let lastIndex = array.length - 1;

  while (firstIndex <= lastIndex) {
    let middleIndex = (firstIndex + lastIndex) >>> 1;

    if (array[middleIndex] === value) {
      return middleIndex;
    }

    if (array[middleIndex] > value) {
      lastIndex = middleIndex - 1;
    } else {
      firstIndex = middleIndex + 1;
    }
  }

  return -1;
}



let score = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
console.time("binarySearchDefault")
binarySearch(score, 37);
console.timeEnd("binarySearchDefault")
console.time("binarySearchNew")
binarySearchNew(score, 37);
console.timeEnd("binarySearchNew")
