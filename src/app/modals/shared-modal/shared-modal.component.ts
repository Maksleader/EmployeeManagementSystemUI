import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../modalConfig';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

@Injectable()
export class SharedModalComponent implements OnInit {
  @ViewChild('modal') private modalContent!: TemplateRef<SharedModalComponent>
  @Input() public modalConfig: ModalConfig
  @Output() newConfirmationEvent = new EventEmitter<string>();

  private modalRef!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }



  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent)
      this.modalRef.result.then((result) => {
        this.newConfirmationEvent.emit(result);
      }, (reason) => {
        console.log(reason);
      });
      
    })
  }

  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }
  
  async dismiss(): Promise<void> {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }

}
