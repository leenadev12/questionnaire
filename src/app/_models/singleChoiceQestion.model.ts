import { questionTypes } from './questionTypes.model';

export interface singleChoiceQuestion {
  questionType: questionTypes;
  title: string;
  options: { optionText: string; id: number }[];
  answer: number;
  createdDate: string;
}
