import { Injectable } from "@angular/core";
import { ModalConfig } from "../modals/modalConfig";

@Injectable({
  providedIn: "root"
})
export class ModalconfigService {

  modalTitle: string

  set setModaltitle(modalTitleName: string) {
    this.modalTitle = modalTitleName;
  }

  get getAddModalConfig(): ModalConfig {
    return this.addModalConfig
  }

  get getEditModalConfig(): ModalConfig {
    return this.editModalConfig
  }

  get getDeleteModalConfig(): ModalConfig {
    return this.deleteModalConfig
  }

  get getEmployeeManagersModalConfig(): ModalConfig {
    return this.employeeMangersModalConfig
  }

  get getManagerEmployeesModalConfig(): ModalConfig {
    return this.employeeMangersModalConfig
  }

  get getUserModalConfig(): ModalConfig {
    return this.userModalConfig
  }


  addModalConfig: ModalConfig = {
    dismissButtonLabel: "Cancel",
    closeButtonLabel: "Add",
    buttonStyle: "btn btn-outline-primary"
  }

  editModalConfig: ModalConfig = {
    dismissButtonLabel: "Cancel",
    closeButtonLabel: "Edit",
    buttonStyle: "btn btn-outline-primary"
  }

  employeeMangersModalConfig: ModalConfig = {
    dismissButtonLabel: "Cancel",
    closeButtonLabel: "Ok",
    buttonStyle: "btn btn-outline-primary",
    hideCloseButton() {
      return true;
    }
  }

  managersEmployeeModalConfig: ModalConfig = {
    dismissButtonLabel: "Cancel",
    closeButtonLabel: "Ok",
    buttonStyle: "btn btn-outline-primary",
    hideCloseButton() {
      return true;
    }
  }

  deleteModalConfig: ModalConfig = {
    dismissButtonLabel: "Cancel",
    closeButtonLabel: "Delete",
    buttonStyle: "btn btn-outline-danger"
  }

  userModalConfig: ModalConfig = {
    dismissButtonLabel: "Cancel",
    closeButtonLabel: "Ok",
    buttonStyle: "btn btn-outline-primary"
  }

}
