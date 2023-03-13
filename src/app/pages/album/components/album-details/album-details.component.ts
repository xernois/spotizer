import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { parseSlug } from '@src/app/functions/slug.function';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent {

  constructor(
    private route: ActivatedRoute,
    private router : Router
  ) {}

  async ngOnInit() {
    const params = await firstValueFrom(this.route.params)
    const albumId = parseSlug(params['id'])

    if(isNaN(albumId)) this.router.navigateByUrl('/album')

    console.log(albumId)
  }
}
