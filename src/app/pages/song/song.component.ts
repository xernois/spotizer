import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slugify } from '@src/app/functions/slug.function';
import { Song } from '@src/app/models/song.model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

}
