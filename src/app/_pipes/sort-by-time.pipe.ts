import { Pipe, PipeTransform } from '@angular/core';
import { question } from '../_models/question.model';

@Pipe({
  name: 'sortByTime',
})
export class SortByTimePipe implements PipeTransform {
  transform(questionData: question[], type: 'createdDate' | 'answeredDate') {
    return questionData.sort(
      (a, b) =>
        new Date(b[type]).getTime() - new Date(a[type]).getTime()
    );
  }
}
