import { questionTypes } from './questionTypes.model';

export interface question {
  questionType: 'open' | 'singleSelect' | 'multiSelect';
  text: string;
  options?: { text: string; id: number }[];
  answer?: string | number | number[];
  createTime: string;
}