import { Component, OnInit } from '@angular/core';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  progress = this.progressService.getProgress();

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {}
}
