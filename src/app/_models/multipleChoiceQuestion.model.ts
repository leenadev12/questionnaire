import { questionTypes } from './questionTypes.model';

export interface multipleChoiceQuestion {
  questionType: questionTypes;
  title: string;
  options: { optionText: string; id: number }[];
  answer: number[];
  createdDate: string;
}
