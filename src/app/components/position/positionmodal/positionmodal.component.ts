import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SharedModalComponent } from 'src/app/modals/shared-modal/shared-modal.component';
import { Position } from 'src/app/models/position';
import { ModalconfigService } from 'src/app/services/modalconfig.service';
import { PositionService } from 'src/app/services/position.service';
import { PositionComponent } from '../position.component';

@Component({
  selector: 'app-positionmodal',
  templateUrl: './positionmodal.component.html',
  styleUrls: ['./positionmodal.component.scss']
})
export class PositionmodalComponent {
  constructor(private positionService: PositionService,public modalConfig:ModalconfigService) { }

  positionRequest: Position =new Position();
  addPositionRequest: Position = new Position();

  @ViewChild('addPosition') private addPostionModal: SharedModalComponent
  @ViewChild('editPosition') private editPostionModal: SharedModalComponent
  @ViewChild('deletePosition') private deletePositionModal: SharedModalComponent
  @Output() ConfirmationEvent = new EventEmitter<string>();
  @Input() parent: PositionComponent;

  async openAddPositionModal() {
    return await this.addPostionModal.open()
  }

  async addPostion() {

    this.addPositionRequest.name = this.addPositionRequest.name.trim();
    this.positionService.addPosition(this.addPositionRequest).subscribe(_ => {
      this.parent.refreshPositions();
    });
    this.addPositionRequest.name=null;
    this.addPostionModal.close()
  }

  async openEditPostionModal(positionId: number) {
    this.positionService.getPosition(positionId).subscribe(result => {
      this.positionRequest = result;
    })
    return await this.editPostionModal.open()
  }

  editPostion() {
    this.positionRequest.name = this.positionRequest.name.trim();
    this.positionService.editPosition(this.positionRequest).subscribe(_ => {
      this.parent.refreshPositions();
    });
    return this.editPostionModal.close()
  }

  async openDeletePositionModal(positionId: number) {
    this.positionRequest.id = positionId
    return await this.deletePositionModal.open()

  }

  async deletePositions() {
    this.positionService.deletePosition(this.positionRequest.id).subscribe(_ => {
      this.parent.refreshPositions();
    });
    return this.deletePositionModal.close()
  }

}
