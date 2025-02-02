import {LitElement, html, css} from 'lit';

export class Nav extends LitElement {
  static get properties() {
    return {};
  }

  static styles = css`
    .nav-container {
      border: 1px solid #ffffff;
      border-radius: 5px;
      background-color: #ffffff;
      height: 20px;
      padding: 12px;
      display: flex;
    }
    .links {
      margin-left: auto;
      display: flex;
      gap: 8px;
      color: #f60;
      font-weight: bold;
      font-size: 12px;
      align-items: center;
      img {
        width: 18px;
      }
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      span {
        font-weight: bold;
        font-size: 14px;
      }
      img {
        width: 20px;
      }
    }
    .nav-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 5px;
    }
    a {
      color: #f60;
      text-decoration: none;
    }
  `;

  render() {
    return html`
      <div class="nav-container">
        <div class="logo">
          <img src="./src/app/assets/images/logo.png" />
          <span>ING</span>
        </div>
        <div class="links">
          <a class="nav-item" href="/employee-list">
            <img src="./src/app/assets/images/user-icon.png" />
            <span> Employees</span>
          </a>
          <a class="nav-item" href="/employee-form">
            <img src="./src/app/assets/images/plus-icon.png" />
            <span> Add new</span>
          </a>
        </div>
      </div>
    `;
  }
}

window.customElements.define('app-nav', Nav);
