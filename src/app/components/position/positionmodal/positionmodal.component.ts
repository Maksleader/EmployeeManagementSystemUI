import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { SharedModalComponent } from "src/app/modals/shared-modal/shared-modal.component";
import { Position } from "src/app/models/position";
import { ModalconfigService } from "src/app/services/modalconfig.service";
import { PositionService } from "src/app/services/position.service";
import { PositionComponent } from "../position.component";

@Component({
  selector: "app-positionmodal",
  templateUrl: "./positionmodal.component.html",
  styleUrls: ["./positionmodal.component.scss"]
})
export class PositionmodalComponent {
  constructor(private positionService: PositionService, public modalConfig: ModalconfigService, private toastr: ToastrService) { }

  updatePositionRequest: Position = new Position();
  isEditNameInvalid: boolean
  addPositionRequest: Position = new Position();

  @ViewChild("addPosition") private addPostionModal: SharedModalComponent
  @ViewChild("editPosition") private editPostionModal: SharedModalComponent
  @ViewChild("deletePosition") private deletePositionModal: SharedModalComponent
  @Output() ConfirmationEvent = new EventEmitter<string>();
  @Input() parent: PositionComponent;

  async openAddPositionModal() {
    return await this.addPostionModal.open()
  }

  async addPostion(form: NgForm) {

    this.addPositionRequest = form.value as Position;
    this.addPositionRequest.name = this.addPositionRequest.name.trim();
    this.positionService.addPosition(this.addPositionRequest).subscribe({
      next: (() => {
        this.parent.refreshPositions();
        this.addPostionModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Add Position")
      })
    });

  }

  async closeAddPositionModal(form: NgForm) {
    form.reset()
    this.addPositionRequest = new Position();
  }

  async openEditPostionModal(positionId: number) {
    this.positionService.getPosition(positionId).subscribe({
      next: (async result => {
        this.updatePositionRequest = result;
        return await this.editPostionModal.open()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Edit Position");
        this.isEditNameInvalid = true;
      })
    })

  }

  editPostion() {
    this.updatePositionRequest.name = this.updatePositionRequest.name.trim();
    this.positionService.editPosition(this.updatePositionRequest).subscribe({
      next: (() => {
        this.parent.refreshPositions();
        return this.editPostionModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Edit Position")
      })
    });

  }

  async closeEditPositionModal(form: NgForm) {
    form.reset()
    this.updatePositionRequest = new Position();
    this.isEditNameInvalid = false;
  }

  async openDeletePositionModal(positionId: number) {
    this.updatePositionRequest.id = positionId
    return await this.deletePositionModal.open()

  }

  async deletePositions() {
    this.positionService.deletePosition(this.updatePositionRequest.id).subscribe({
      next: (() => {
        this.parent.refreshPositions();
        return this.deletePositionModal.close()
      }),
      error: (response => {
        this.toastr.error(response.error.message, "Delete Position")
      })
    });
  }

  stateChange(value: string) {
    if (value.length == 0) {
      this.isEditNameInvalid = true;
    }
    else if (value.length > 0) {
      this.isEditNameInvalid = false;
    }

  }
}
