import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPlayer'
})
export class FormatPlayerPipe implements PipeTransform {

  transform(player: string): string {
    return player ? player.split('\\')[0] : '';
  }

}
