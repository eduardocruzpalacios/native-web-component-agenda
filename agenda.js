const template = document.createElement('template');

template.innerHTML = `
<style>
    :host {
        display: block;
        font-color: #14202E;
        font-family: sans-serif;
        max-width: 400px;
    }

    h1 {
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
</style>

<h1>Agenda</h1>

<form>
    <fieldset>
    <legend>New contact:</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Name" required>
    <label for="phone">Phone number:</label><br>
    <input type="tel" id="phone" name="phone" placeholder="0123456789" required>
    <input type="submit" id="submit" value="+">
    </fieldset>
</form>

<ul id="contacts"></ul>
`;

class Agenda extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this._contacts = [];

        this.$contactList = this._shadowRoot.querySelector('ul');
        console.log(this.$contactList);

        this.$inputName = this._shadowRoot.getElementById('name');
        this.$inputPhone = this._shadowRoot.getElementById('phone');

        this.$submitButton = this._shadowRoot.getElementById('submit');
        this.$submitButton.addEventListener('click', this._addContact.bind(this));

        this._renderContactList();
    }

    _addContact() {
        console.log('called');
        if (this.$inputName.value.length > 0 && this.$inputPhone.value.length > 0) {
            console.log('init');
            this._contacts.push({ name: this.$inputName.value, phone: this.$inputPhone.value, isEmergencyContact: false })
            this._renderContactList();
            this.$inputName.value = '';
            this.$inputPhone.value = '';
        }
    }

    _renderContactList() {
        this.$contactList.innerHTML = '';

        this._contacts.forEach((contact, index) => {
            let $contactItem = document.createElement('article');
            $contactItem.innerHTML = contact.name + ': ' + contact.phone;
            this.$contactList.appendChild($contactItem);
        });
    }

    set contacts(value) {
        this._contacts = value;
        this._renderContactList();
    }

    get contacts() {
        return this._contacts;
    }
}

document.querySelector('agenda-app')._contacts = [
    { name: "John Doe", phone: "600111222", isEmergencyContact: true },
    { name: "Random guy", phone: "699777773", isEmergencyContact: false }
];

window.customElements.define('agenda-app', Agenda);