import {Router} from '@vaadin/router';
import {LitElement, html} from 'lit';

export class Dashboard extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
    // Even this is not reasonable to just show the employee list this line is added
    Router.go('/employee-list');
  }

  render() {
    return html``;
  }
}

window.customElements.define('app-dashboard', Dashboard);
