const template = document.createElement('template');

template.innerHTML = `
<style>
    :host {
        display: block;
        font-family: sans-serif;
    }

    .isEmergency {
        color: red;
    }

    button {
        border: none;
        cursor: pointer;
    }
</style>

<li>
    <input type="checkbox">
    <label id="name"></label>
    <label id="phone"></label>
    <button>❌</button>
</li>
`;

export class Contact extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$item = this._shadowRoot.querySelector('li');
        this.$checkbox = this._shadowRoot.querySelector('input');
        this.$textName = this._shadowRoot.getElementById('name');
        this.$textPhone = this._shadowRoot.getElementById('phone');
        this.$deleteButton = this._shadowRoot.querySelector('button');

        this.$deleteButton.addEventListener('click', e => {
            this.dispatchEvent(new CustomEvent('onDelete', { detail: this.index }));
        });

        this.$checkbox.addEventListener('click', e => {
            this.dispatchEvent(new CustomEvent('onToggle', { detail: this.index }));
        });
    }

    connectedCallback() {
        if (!this.hasAttribute('name')) {
            this.setAttribute('name', 'placeholder');
        }

        if (!this.hasAttribute('phone')) {
            this.setAttribute('phone', 'placeholder');
        }

        this._renderContactItem();
    }

    _renderContactItem() {
        if (this.hasAttribute('emergency')) {
            this.$item.classList.add('isEmergency');
            this.$checkbox.setAttribute('checked', '');
        } else {
            this.$item.classList.remove('isEmergency');
            this.$checkbox.removeAttribute('checked');
        }
        console.log(this._name);
        console.log(this._phone);
        this.$textName.innerHTML = this._name;
        this.$textPhone.innerHTML = this._phone;
    }

    static get observedAttributes() {
        return ['name', 'phone', 'emergency'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'name':
                this._name = newValue;
                break;
            case 'phone':
                this._phone = newValue;
                break;
            case 'emergency':
                this._emergency = this.hasAttribute('emergency');
                break;
        }
    }

    get emergency() {
        return this.hasAttribute('emergency');
    }

    set emergency(val) {
        if (val) {
            this.setAttribute('emergency', '');
        } else {
            this.removeAttribute('emergency');
        }
    }
}

window.customElements.define('contact-item', Contact);