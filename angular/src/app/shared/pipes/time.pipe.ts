import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'songTime'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let arr = value.trim().split(":");

    for(let i = 1; i < arr.length; i++){
      let number: any = parseInt(arr[i]);
      
      
      if(number < 10){
        number = "0" + number;
      }
      arr[i] = number;
    }
  
    return arr.join(":");
  }

}
