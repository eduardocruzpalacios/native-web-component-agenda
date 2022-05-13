const template = document.createElement('template');

template.innerHTML = `
<style>
</style>

<li>
    <input type="checkbox">
    <label></label>
    <label></label>
    <button>❌</button>
</li>
`;

class Contact extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.document.define('contact-item', Contact);