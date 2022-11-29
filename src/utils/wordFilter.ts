interface IWord {
  label: string;
  value: string;
}

/**
 * Returns a list of words that, somehow, are related to the given word.
 * But, for it to work, it normalizes the word and the list of words.
 *
 * @category Utils
 * @param words The array of words to be filtered.
 * @param word The word to be used as a reference.
 * @returns Returns a list of words.
 * @example
 *
 * var words = ["Bananas", "Bang Bang", "Eça de Queiroz", "Products to Sales", "Products"];
 * var word = " ban"
 *
 * var filteredWords = wordFilter(words, word);
 *
 * console.log(filteredWords);
 * // => ["Bananas", "Bang Bang"]
 *
 * --
 *
 * var word2 = "çadequeiroz";
 *
 * var filteredWords2 = wordFilter(words, word2);
 *
 * console.log(filteredWords2);
 * // => ["Eça de Queiroz"]
 *
 * --
 *
 * var word3 = "products";
 *
 * var filteredWords3 = wordFilter(words, word3);
 *
 * console.log(filteredWords3);
 * // => ["Products", "Products to Sales"] // that is, by the length of the word
 *
 */
function wordFilter(words: IWord[], word: string): IWord[] {
  // returns the filtered words
  const filteredWords = words.filter((w) => {
    // normalizes the word and the list of words
    const normalizedWord = normalize(word);
    const normalizedW = normalize(w.label);

    // returns the filtered words
    return normalizedW.includes(normalizedWord);
  });

  // orders the filtered words
  const orderedWords = filteredWords.sort((a: IWord, b) => {
    // normalizes the word and the list of words
    // ex.: ["Product Very Rare", "Products to Sales", "Products"]
    // returns
    // => ["Product", "Products to Sales", "Product Very Rare"]

    const normalizedA = normalize(a.label);
    const normalizedB = normalize(b.label);

    // returns the ordered words
    return normalizedA.length - normalizedB.length;
  });
  console.log(filteredWords, orderedWords);

  // returns the ordered words
  return orderedWords;
}

export default wordFilter;

function normalize(word: string): string {
  // removes the spaces
  let normalizedWord = word.replace(/\s/g, "");

  // removes the accents
  normalizedWord = normalizedWord
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // removes the special characters
  normalizedWord = normalizedWord.replace(/[^a-zA-Z0-9]/g, "");

  // lowercases the word
  normalizedWord = normalizedWord.toLowerCase();

  // returns the normalized word
  return normalizedWord;
}
