import './contact.js';

const template = document.createElement('template');

template.innerHTML = `
<style>
    :host {
        display: block;
        font-color: #14202E;
        font-family: sans-serif;
        max-width: 500px;
    }

    h2,
    h3 {
        text-align: center;
    }

    form {
        background-color: #88A9C3;
        border-radius: 5px;
        padding: 20px;
    }

    fieldset {
        border-color: #091235;
    }
      
    legend {
        background-color: #091235;
        color: white;
        padding: 5px 10px;
    }
      
    input[type=text], input[type=tel] {
        border: 1px solid #14202E;
        border-radius: 4px;
        box-sizing: border-box;
        display: block;
        margin: 8px 0;
        padding: 12px 20px;
        width: 100%;
    }

    input[type=submit] {
        background-color: #2B4257;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        margin: 8px 0;
        padding: 14px 20px;
        width: 100%;
    }

    input[type=submit]:hover {
        background-color: #091235;
    }

    ul {
        background-color: #091235;
        list-style: none;
    }
</style>

<h2>Agenda</h2>

<form>
    <fieldset>
    <legend>Add a new contact:</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Name" required>
    <label for="phone">Phone number:</label><br>
    <input type="tel" id="phone" name="phone" placeholder="0123456789" required>
    <input type="submit" id="submit" value="+">
    </fieldset>
</form>

<h3>Contact list</h3>

<small>* Checked ones are emergency contacts</small>

<ul id="contacts"></ul>
`;

class Agenda extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._contacts = [];

        document.querySelector('agenda-app')._contacts = [
            { name: 'John Doe', phone: '600111222', isEmergencyContact: true },
            { name: 'Random guy', phone: '699777773', isEmergencyContact: false },
        ];

        this.$contactList = this._shadowRoot.querySelector('ul');

        this.$inputName = this._shadowRoot.getElementById('name');
        this.$inputPhone = this._shadowRoot.getElementById('phone');

        this.$submitButton = this._shadowRoot.getElementById('submit');
        this.$submitButton.addEventListener('click', this._addContact.bind(this));
    }

    _addContact() {
        if (this.$inputName.value.length > 0 && this.$inputPhone.value.length > 0) {
            this._contacts.push({
                name: this.$inputName.value,
                phone: this.$inputPhone.value,
                isEmergencyContact: false,
            });
            this._renderContactList();
            this.$inputName.value = '';
            this.$inputPhone.value = '';
        }
    }

    connectedCallback() {
        this._renderContactList();
    }

    _renderContactList() {
        this.$contactList.innerHTML = '';

        this._contacts.forEach((contact, index) => {
            let $contactItem = document.createElement('contact-item');

            $contactItem.setAttribute('name', contact.name);
            $contactItem.setAttribute('phone', contact.phone);
            if (contact.isEmergencyContact) {
                $contactItem.setAttribute('emergency', '');
            }
            $contactItem.setAttribute('index', index);

            $contactItem.addEventListener('onDelete', this._deleteContact.bind(this));
            $contactItem.addEventListener(
                'onToggle',
                this._toggleIsEmergencyContact.bind(this)
            );

            this.$contactList.appendChild($contactItem);
        });
    }

    _deleteContact(e) {
        this._contacts.splice(e.detail, 1);
        this._renderContactList();
    }

    _toggleIsEmergencyContact(e) {
        const contact = this._contacts[e.detail];
        this._contacts[e.detail] = Object.assign({}, contact, {
            isEmergencyContact: !contact.isEmergencyContact,
        });
        this._renderContactList();
    }

    set contacts(value) {
        this._contacts = value;
        this._renderContactList();
    }

    get contacts() {
        return this._contacts;
    }
}

window.customElements.define('agenda-app', Agenda);
