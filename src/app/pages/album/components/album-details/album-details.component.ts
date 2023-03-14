import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseSlug } from '@src/app/functions/slug.function';
import { Album } from '@src/app/models/album.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent {

  album !: Album

  constructor(
    private route: ActivatedRoute,
    private router : Router
  ) {}

  async ngOnInit() {
    const data = await firstValueFrom(this.route.data)

    this.album = data['album']
    
    if(!data['album']) this.router.navigateByUrl('/album')
  }
}
