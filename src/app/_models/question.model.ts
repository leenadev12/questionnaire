import { questionTypes } from './questionTypes.model';

export interface question {
  questionType: 'open' | 'singleSelect' | 'multiSelect';
  text: string;
  options?: { optionText: string; id: number }[];
  answer?: string | number | number[];
  createdDate: string;
}