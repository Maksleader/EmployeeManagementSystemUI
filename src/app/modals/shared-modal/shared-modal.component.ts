import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

@Injectable()
export class SharedModalComponent implements OnInit {
  @ViewChild('modal') private modalContent!: TemplateRef<SharedModalComponent>
  @Input() modalTitle:any
  @Output() newConfirmationEvent = new EventEmitter<string>();

  private modalRef!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'md' })
      this.modalRef.result.then((result) => {
        this.newConfirmationEvent.emit(result);
      }, (reason) => {
        console.log(reason);
      });
    })
  }



}
