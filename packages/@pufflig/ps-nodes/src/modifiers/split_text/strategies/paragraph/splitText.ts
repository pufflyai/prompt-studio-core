const filterEmptySections = (section: string) => section;

const joinSmallChunks = (chunks: string[], CHUNK_LENGTH = 1500) => {
  const joinedChunks: string[] = [];
  let currentChunk = "";
  chunks.forEach((chunk) => {
    if ((currentChunk + chunk).length < CHUNK_LENGTH) {
      currentChunk += " " + chunk;
    } else {
      joinedChunks.push(currentChunk);
      currentChunk = chunk;
    }
  });
  return [...joinedChunks, currentChunk];
};

const splitBySections =
  (CHUNK_LENGTH = 1500) =>
  (text: string) => {
    if (text.length < CHUNK_LENGTH) return [text];
    const sections = text.split(/(\n\s*\n)/);
    return joinSmallChunks(sections, CHUNK_LENGTH);
  };

const splitByParagraph =
  (CHUNK_LENGTH = 1500) =>
  (text: string) => {
    if (text.length < CHUNK_LENGTH) return [text];
    const paragraphs = text.split(/\.\n/);
    return joinSmallChunks(paragraphs, CHUNK_LENGTH);
  };

const splitByEnumeration =
  (CHUNK_LENGTH = 1500) =>
  (text: string) => {
    if (text.length < CHUNK_LENGTH) return [text];
    const enumerationSteps = text.split(/(\n[0-9].)/);
    return joinSmallChunks(enumerationSteps, CHUNK_LENGTH);
  };

const splitBySentence =
  (CHUNK_LENGTH = 1500) =>
  (text: string) => {
    if (text.length < CHUNK_LENGTH) return [text];
    const sentences = text.split(/(\.)/);
    return joinSmallChunks(sentences, CHUNK_LENGTH);
  };

const catchAllSplit =
  (CHUNK_LENGTH = 1500) =>
  (text: string) => {
    if (text.length < CHUNK_LENGTH) return [text];
    const sentences = text.split(/ /);
    return joinSmallChunks(sentences, CHUNK_LENGTH);
  };

/**
 * remove duplicate sections - some parts of the input text might be repeated
 * we want to avoid presenting the same information twice to the language model
 * @param split
 * @returns
 */
const deduplicateInput = (split: string[]) => {
  const duplicateIndexes: number[] = [];

  split
    .map((value) => value.toLowerCase().replace(/ |\n|\.|-|,/g, ""))
    .forEach((values, index, self) => {
      if (self.indexOf(values) !== index) {
        duplicateIndexes.push(index);
      }
    });

  return split.filter((_, index) => !duplicateIndexes.includes(index));
};

/**
 * Split text into chunks of CHUNK_LENGTH_LIMIT characters trying to preserve in order:
 * - sections
 * - paragraphs
 * - sentences
 * - words
 */
export const splitText = (text: string, CHUNK_LENGTH_LIMIT = 1500) => {
  const split = splitBySections(CHUNK_LENGTH_LIMIT)(text)
    .map(splitByParagraph(CHUNK_LENGTH_LIMIT))
    .flat()
    .map(splitByEnumeration(CHUNK_LENGTH_LIMIT))
    .flat()
    .map(splitBySentence(CHUNK_LENGTH_LIMIT))
    .flat()
    .map(catchAllSplit(CHUNK_LENGTH_LIMIT))
    .flat()
    .map((chunk) => chunk.trim())
    .filter(filterEmptySections);

  const dedup = deduplicateInput(split);
  return dedup;
};
