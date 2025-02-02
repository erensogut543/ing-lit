import {LitElement, html, css} from 'lit';
import {SingletonFactory} from './singleton-employee-list';
import {Router} from '@vaadin/router';
import {cloneDeep} from 'lodash-es';

export class EmployeeForm extends LitElement {
  static styles = css`
    .list-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .title {
        font-weight: bold;
        color: #f60;
      }
    }
    input {
      width: 300px;
      border: 1px solid lightgray;
      background-color: #ffffff;
      padding: 8px;
      border-radius: 5px;
    }
    .label-wrapper {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }

    .col {
      width: 50%;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
    }

    .btn {
      padding: 8px 12px;
      border-radius: 3px;
      &.btn-secondary {
        border: 1px solid lightgray;
        background-color: #ffffff;
        color: #000000;
      }
      &.btn-primary {
        border: 1px solid transparent;
        background-color: #f60;
        color: #ffffff;
      }
    }
    .actions {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }
    button {
      cursor: pointer;
    }
    @media screen and (max-width: 576px) {
      .col {
        width: 100%;
      }
    }
  `;

  static get properties() {
    return {
      employee: {},
    };
  }

  get factoryEmployeeList() {
    return SingletonFactory.getInstance().employeeList;
  }

  set factoryEmployeeList(val) {
    SingletonFactory.getInstance().employeeList = val;
  }

  get factorySelectedEmployee() {
    return SingletonFactory.getInstance().selectedEmployee;
  }

  set factorySelectedEmployee(val) {
    SingletonFactory.getInstance().selectedEmployee = val;
  }

  constructor() {
    super();
    if (this.factorySelectedEmployee) {
      this.employee = cloneDeep(this.factorySelectedEmployee);
    } else {
      this.employee = {
        firstName: '',
        lastName: '',
        dateOfEmployment: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        department: '',
        position: '',
      };
    }
  }

  render() {
    return html`
      <div class="list-header">
        <span class="title"
          >${this.factorySelectedEmployee ? 'Employee' : 'New Employee'}</span
        >
      </div>
      <div class="row">
        <div class="label-wrapper col">
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            .value=${this.employee.firstName}
            @input=${this.changeFirstName}
          />
        </div>
        <div class="label-wrapper col">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            .value=${this.employee.lastName}
            @input=${this.changeLastName}
          />
        </div>
        <div class="label-wrapper col">
          <label>Date of Employment</label>
          <input
            type="text"
            placeholder="Date of Employment"
            .value=${this.employee.dateOfEmployment}
            @input=${this.changeDateOfEmployment}
          />
        </div>
        <div class="label-wrapper col">
          <label>Date of Birth</label>
          <input
            type="text"
            placeholder="Date of Birth"
            .value=${this.employee.dateOfBirth}
            @input=${this.changeDateOfBirth}
          />
        </div>
        <div class="label-wrapper col">
          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            .value=${this.employee.phone}
            @input=${this.changePhone}
          />
        </div>
        <div class="label-wrapper col">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            .value=${this.employee.email}
            @input=${this.changeEmail}
          />
        </div>
        <div class="label-wrapper col">
          <label>Department</label>
          <input
            type="text"
            placeholder="Department"
            .value=${this.employee.department}
            @input=${this.changeDepartment}
          />
        </div>
        <div class="label-wrapper col">
          <label>Position</label>
          <input
            type="text"
            placeholder="Position"
            .value=${this.employee.position}
            @input=${this.changePosition}
          />
        </div>
        <div class="actions">
          <button
            type="button"
            class="btn btn-secondary"
            @click=${this.onCancelClicked}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click=${this.onSaveClicked}
          >
            Save
          </button>
        </div>
      </div>
    `;
  }

  onSaveClicked() {
    if (!this.employee.id) {
      this.employee.id = new Date().getTime();
      this.factoryEmployeeList.push(this.employee);
    } else {
      const foundIndex = this.factoryEmployeeList.findIndex(
        (employee) => employee.id === this.employee.id
      );
      Object.assign(this.factoryEmployeeList[foundIndex], this.employee);
    }
    Router.go('/employee-list');
  }

  onCancelClicked() {
    Router.go('/employee-list');
  }

  changeFirstName($event) {
    this.employee.firstName = $event.target.value;
  }
  changeLastName($event) {
    this.employee.lastName = $event.target.value;
  }
  changeDateOfEmployment($event) {
    this.employee.dateOfEmployment = $event.target.value;
  }
  changePhone($event) {
    this.employee.phone = $event.target.value;
  }
  changeDateOfBirth($event) {
    this.employee.dateOfBirth = $event.target.value;
  }
  changeEmail($event) {
    this.employee.email = $event.target.value;
  }
  changeDepartment($event) {
    this.employee.department = $event.target.value;
  }
  changePosition($event) {
    this.employee.position = $event.target.value;
  }
  disconnectedCallback() {
    this.factorySelectedEmployee = null;
  }
}

window.customElements.define('app-employee-form', EmployeeForm);
