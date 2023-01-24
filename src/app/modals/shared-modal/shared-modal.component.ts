import { Component, EventEmitter, Injectable, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal, NgbModalConfig, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ModalConfig } from "../modalConfig";

@Component({
  selector: "app-shared-modal",
  templateUrl: "./shared-modal.component.html",
  styleUrls: ["./shared-modal.component.scss"],
  providers: [NgbModalConfig, NgbModal]
})

@Injectable()
export class SharedModalComponent {
  @ViewChild("modal") private modalContent!: TemplateRef<SharedModalComponent>;
  @Input() public modalConfig: ModalConfig;
  @Input() modaltTitle: string;
  @Input() groupForm: any;
  @Output() closeModal = new EventEmitter<string>();
  @Output() newConfirmationEvent = new EventEmitter<string>();
  ngbModalOptions: NgbModalOptions = {
    backdrop: "static",
    keyboard: false
  };

  private modalRef!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
  }

  open(): Promise<boolean> {
    return new Promise<boolean>(() => {
      this.modalRef = this.modalService.open(this.modalContent, this.ngbModalOptions)
    })
  }

  close() {
    if (this.modalConfig.shouldClose === undefined || this.modalConfig.shouldClose()) {
      const result = this.modalConfig.onClose === undefined || this.modalConfig.onClose()
      this.closeModal.emit();
      this.modalRef.close(result)
    }
  }

  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.closeModal.emit();
      this.modalRef.dismiss(result)

    }
  }

}
