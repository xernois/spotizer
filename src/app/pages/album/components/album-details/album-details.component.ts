import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '@src/app/models/album.model';

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
    this.album = this.route.snapshot.data['album'][0]

    if(!this.album) this.router.navigateByUrl('/album')
  }
}
