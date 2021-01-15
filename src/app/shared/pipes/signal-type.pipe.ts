import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signalType'
})
export class SignalTypePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'price_below': return 'Price Below'
      case 'price_above': return 'Price Above'
      case 'wait_seconds': return 'Wait for (in seconds)'
      default: return value
    }
  }

}
