import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { EmployeemodalComponent } from 'src/app/components/employee/employeemodal/employeemodal.component';
import { AddEmployee } from 'src/app/models/addEmployee';
import { ModalConfig } from '../modalConfig';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

@Injectable()
export class SharedModalComponent implements OnInit {
  @ViewChild('modal') private modalContent!: TemplateRef<SharedModalComponent>;
  @Input() public modalConfig: ModalConfig;
  @Input() modaltTitle:string;
  @Input() formName:string
  @Output() newConfirmationEvent = new EventEmitter<string>();
   ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
};
   @Input() child :EmployeemodalComponent

  private modalRef!: NgbModalRef;
  
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
  }




  ngOnInit(): void {
  }



  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent,this.ngbModalOptions)
      this.modalRef.result.then((result) => {
        this.newConfirmationEvent.emit(result);
      }, (reason) => {
        console.log(reason);
      });
      
    })
  }

   close(){
    if (this.modalConfig.shouldClose === undefined ||  this.modalConfig.shouldClose()) {
      const result = this.modalConfig.onClose === undefined ||  this.modalConfig.onClose()
      this.modalRef.close(result)
    }
  }
  
  async dismiss(): Promise<void> {
    
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
    if(this.formName!=null)
    (document.getElementById(this.formName) as HTMLFormElement).reset();
  }

}
