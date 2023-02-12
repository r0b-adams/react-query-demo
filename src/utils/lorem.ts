import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 5,
    min: 3,
  },
});

export { lorem };
