const template = document.createElement('template');

template.innerHTML = `
<style>
    :host {
        display: block;
        font-color: #14202E;
        font-family: sans-serif;
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
    <input type="tel" id="phone" name="phone" placeholder="6XXYYYXXX" pattern="^\+?(6\d{2}|7[1-9]\d{1})\d{6}$" required>
    <input type="submit" value="+">
    </fieldset>
</form>

<ul id="contacts"></ul>
`;

class Agenda extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('agenda-app', Agenda);