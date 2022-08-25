import { questionTypes } from './questionTypes.model';

export interface question {
  questionType: 'open' | 'singleSelect' | 'multiSelect';
  text: string;
  options?: { optionText: string, checked: boolean }[];
  answer?: string | number | boolean[];
  createdDate: string;
  answeredDate: string;
  isAnswered: boolean;
}