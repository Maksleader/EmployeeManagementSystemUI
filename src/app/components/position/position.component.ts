import { Component, OnInit, ViewChild } from '@angular/core';
import { Position } from 'src/app/models/position';
import { PositionService } from 'src/app/services/position.service';
import { PositionmodalComponent } from './positionmodal/positionmodal.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
  positions: Position[];
  constructor(private positionService: PositionService) { }

  @ViewChild(PositionmodalComponent) modal: PositionmodalComponent

  ngOnInit(): void {
    this.refreshPositions();
  }

  refreshPositions() {
    this.positionService.getAllPostions().subscribe({
      next: (result) => {
        console.log(result);
        this.positions = result;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  showAddpositionModal() {
    this.modal.openAddPositionModal();
  }

  showEditpositionModal(positionId: number) {
    this.modal.openEditPostionModal(positionId);
  }

  showDeletePositionModal(positionId: number) {
    this.modal.openDeletePositionModal(positionId);
  }

}



