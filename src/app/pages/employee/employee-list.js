import {LitElement, html, css} from 'lit';
import {SingletonFactory} from './singleton-employee-list';
import {Router} from '@vaadin/router';

export class EmployeeList extends LitElement {
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
    table {
      background-color: #ffffff;
      border: 1px solid transparent;
      border-radius: 3px;
      font-size: 12px;
      td,
      th {
        padding: 16px 12px;
        img {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
      }
      th {
        color: #f60;
      }
    }
  `;

  static get properties() {
    return {
      factoryEmployeeList: {},
    };
  }

  get factoryEmployeeList() {
    return SingletonFactory.getInstance().employeeList;
  }

  set factoryEmployeeList(val) {
    SingletonFactory.getInstance().employeeList = val;
  }

  constructor() {
    super();
    const dummyEmployeeList = [
      {
        id: 1,
        firstName: 'Eren',
        lastName: 'Söğüt',
        dateOfEmployment: '01/03/2025',
        dateOfBirth: '01/01/1995',
        phone: '+(90) 544 492 24 37',
        email: 'eren.sogut@outlook.com',
        department: 'Software Development',
        position: 'Senior',
      },
      {
        id: 2,
        firstName: 'Eren',
        lastName: 'Söğüt',
        dateOfEmployment: '01/03/2025',
        dateOfBirth: '01/01/1995',
        phone: '+(90) 544 492 24 37',
        email: 'eren.sogut@outlook.com',
        department: 'Software Development',
        position: 'Senior',
      },
    ];
    if (!this.factoryEmployeeList.length) {
      this.factoryEmployeeList = dummyEmployeeList;
    }
  }

  render() {
    return html`
      <div class="list-header">
        <span class="title">Employee List</span>
        <div class="actions"></div>
      </div>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.getTableData()}
        </tbody>
      </table>
    `;
  }

  getTableData() {
    return this.factoryEmployeeList.length
      ? this.factoryEmployeeList.map(
          (employee) => html`
            <tr>
              <td><input type="checkbox" /></td>
              <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
              <td>${employee.dateOfEmployment}</td>
              <td>${employee.dateOfBirth}</td>
              <td>${employee.phone}</td>
              <td>${employee.email}</td>
              <td>${employee.department}</td>
              <td>${employee.position}</td>
              <td>
                <img
                  src="./src/app/assets/images/update.png"
                  @click=${() => this.onUpdateClicked(employee)}
                />
                <img
                  src="./src/app/assets/images/trash.png"
                  @click=${() => this.onRemoveClicked(employee.id)}
                />
              </td>
            </tr>
          `
        )
      : html`
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>There is not any employee record.</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        `;
  }

  onUpdateClicked(employee) {
    SingletonFactory.getInstance().selectedEmployee = employee;
    Router.go('/employee-form');
  }
  onRemoveClicked(employeeId) {
    const foundIndex = this.factoryEmployeeList.findIndex(
      (emp) => emp.id === employeeId
    );
    this.factoryEmployeeList.splice(foundIndex, 1);
    this.factoryEmployeeList = [...this.factoryEmployeeList];
  }
}

window.customElements.define('app-employee-list', EmployeeList);
