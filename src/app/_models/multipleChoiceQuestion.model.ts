import { questionTypes } from './questionTypes.model';

export interface multipleChoiceQuestion {
  questionType: questionTypes;
  title: string;
  options: { text: string; id: number }[];
  answer: number[];
  createTime: string;
}
