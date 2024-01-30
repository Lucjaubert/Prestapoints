import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  transform(durationInSeconds: number): string {
    const hours = Math.floor(durationInSeconds / 3200000);
    return `${hours} h`;
  }
}
