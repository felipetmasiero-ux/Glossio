import { HeadingBlock } from "./HeadingBlock/HeadingBlock";
import { ParagraphBlock } from "./ParagraphBlock/ParagraphBlock";
import { ExampleBlock } from "./ExampleBlock/ExampleBlock";
import { TipBlock } from "./TipBlock/TipBlock";
import { QuoteBlock } from "./QuoteBlock/QuoteBlock";
import { ListBlock } from "./ListBlock/ListBlock";
import { DialogueBlock } from "./DialogueBlock/DialogueBlock";
import { GrammarBlock } from "./GrammarBlock/GrammarBlock";
import { CultureBlock } from "./CultureBlock/CultureBlock";
import { QuizBlock } from "./QuizBlock/QuizBlock";
import { StepBlock } from "./StepBlock/StepBlock";
import { BLOCK_TYPES } from "../../../constants/lessonBlocks";

export const lessonBlocks = {

  [BLOCK_TYPES.HEADING]: {
    component: HeadingBlock,
    label: "Heading",
    category: "text"
  },

  [BLOCK_TYPES.PARAGRAPH]: {
    component: ParagraphBlock,
    label: "Paragraph",
    category: "text"
  },

  [BLOCK_TYPES.EXAMPLE]: {
    component: ExampleBlock,
    label: "Example",
    category: "content",
    getVocabulary: block => block.word ? [block.word] : []
  },

  [BLOCK_TYPES.TIP]: {
    component: TipBlock,
    label: "Tip",
    category: "content"
  },

  [BLOCK_TYPES.QUOTE]: {
    component: QuoteBlock,
    label: "Quote",
    category: "content",
    getVocabulary: block => block.words ?? []
  },

  [BLOCK_TYPES.LIST]: {
    component: ListBlock,
    label: "List",
    category: "content"
  },

  [BLOCK_TYPES.DIALOGUE]: {
    component: DialogueBlock,
    label: "Dialogue",
    category: "conversation",
    getVocabulary: block => block.lines?.flatMap(line => line.words ?? []) ?? []
  },

  [BLOCK_TYPES.GRAMMAR]: {
    component: GrammarBlock,
    label: "Grammar",
    category: "language",
    getVocabulary: block => block.words ?? []
  },

  [BLOCK_TYPES.CULTURE]: {
    component: CultureBlock,
    label: "Culture",
    category: "culture",
    getVocabulary: block => block.words ?? []
  },

  [BLOCK_TYPES.QUIZ]: {
    component: QuizBlock,
    label: "Quiz",
    category: "exercise",
    interactive: true
  },

  [BLOCK_TYPES.STEP]: {
    component: StepBlock,
    label: "Step",
    category: "system"
}
  

};