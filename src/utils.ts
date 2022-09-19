/**
 * Shuffle list from stackoverflow: 
 * https://stackoverflow.com/a/2450976/10000150
 * @param array
 */
export function shuffleList(array: []): [] {

  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
