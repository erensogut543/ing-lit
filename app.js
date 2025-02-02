import {Router} from '@vaadin/router';
import {LitElement, html, css} from 'lit';
import './src/app/components/footer';
import './src/app/components/nav';
import './src/app/pages/dashboard';
import './src/app/pages/employee/employee-form';
import './src/app/pages/employee/employee-list';

export class App extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    .main-container {
      padding: 12px;
    }
    .content {
      padding: 12px 40px;
    }

    @media screen and (max-width: 576px) {
      .content {
        padding: 12px 24px;
      }
    }
  `;
  firstUpdated() {
    super.firstUpdated();
    const router = new Router(this.shadowRoot.querySelector('#outlet'));
    router.setRoutes([
      {path: '/', component: 'app-dashboard'},
      {path: '/employee-list', component: 'app-employee-list'},
      {path: '/employee-form', component: 'app-employee-form'},
      {path: '(.*)', redirect: '/'},
    ]);
  }
  render() {
    return html`
      <div class="main-container">
        <app-nav></app-nav>
        <div class="content" id="outlet"></div>
        <app-footer></app-footer>
      </div>
    `;
  }
}
customElements.define('ing-app', App);
