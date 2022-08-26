import { questionTypes } from './questionTypes.model';

export interface question {
  questionType: 'open' | 'singleSelect' | 'multiSelect';
  text: string;
  options?: { optionText: string, checked: boolean }[];
  answer: any[];
  createdDate: string;
  answeredDate: string;
  isAnswered: boolean;
}