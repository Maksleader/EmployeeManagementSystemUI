import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalConfig } from 'src/app/modals/modalConfig';
import { SharedModalComponent } from 'src/app/modals/shared-modal/shared-modal.component';
import { Position } from 'src/app/models/position';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-positionmodal',
  templateUrl: './positionmodal.component.html',
  styleUrls: ['./positionmodal.component.scss']
})
export class PositionmodalComponent {
constructor(private positionService:PositionService){}

  positionRequest:Position=
  {
    id:null,
    name:''
  }
  isCloseStatus: any;

  @ViewChild('addPosition') private addPostionModal: SharedModalComponent
  @ViewChild('editPosition') private editPostionModal: SharedModalComponent
  @ViewChild('deletePosition') private deletePositionModal: SharedModalComponent
  @Output() newConfirmationEvent = new EventEmitter<boolean>();

  addModalConfig: ModalConfig = {
    modalTitle: 'Add Postion',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Add',
    buttonStyle: "btn btn-outline-primary"
  }

  editModalConfig: ModalConfig = {
    modalTitle: 'Edit',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Edit',
    buttonStyle: "btn btn-outline-primary"
  }

  deleteModalConfig: ModalConfig = {
    modalTitle: 'Delete',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Delete',
    buttonStyle: "btn btn-outline-danger"
  }

  async openAddPositionModal() {

    return await this.addPostionModal.open()
  }

  async closeAddPositionModal() {

    this.positionRequest.name = this.positionRequest.name.trim();
    this.positionService.addPosition(this.positionRequest).subscribe();
    this.addPostionModal.close()
  }

  async openEditPostionModal(positionId:number) {
    this.positionService.getPosition(positionId).subscribe(result=>{
      this.positionRequest=result;
    })
    return await this.editPostionModal.open()
  }

  async closeEditPositionModal() {
    this.positionRequest.name = this.positionRequest.name.trim();
    this.positionService.editPosition(this.positionRequest).subscribe();
    return await this.editPostionModal.close()
  }

  async openDeletePositionModal(positionId: number) {
    this.positionRequest.id = positionId
    return await this.deletePositionModal.open()

  }

  async closeDeletePositionModal() {
   this.positionService.deletePosition(this.positionRequest.id).subscribe();
    return await this.deletePositionModal.close()
  }


  getConfirmationValue(value: any,modaltype:any) {
    if (value == 'Save click') {
      if(modaltype=='addPosition')
      {
        this.isCloseStatus=true;
        this.closeAddPositionModal();
      }

      if(modaltype=='editPostion')
      {
        this.isCloseStatus=true;
        this.closeEditPositionModal();
      }

      if(modaltype=='deletePosition')
      {
        this.isCloseStatus=true;
        this.closeDeletePositionModal();
      }
      this.newConfirmationEvent.emit(this.isCloseStatus);
    }
  }

}
