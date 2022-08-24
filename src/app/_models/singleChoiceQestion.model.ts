import { questionTypes } from './questionTypes.model';

export interface singleChoiceQuestion {
  questionType: questionTypes;
  title: string;
  options: { text: string; id: number }[];
  answer: number;
  createTime: string;
}
