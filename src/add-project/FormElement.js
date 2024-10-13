class FormElement {
  constructor(label, type, name) {
    this.label = label;
    this.type = type;
    this.name = name;
    this.input = null;
  }

  create() {
    const formElement = document.createElement("div");
    formElement.setAttribute("class", "form-element");

    const elementLabel = document.createElement("label");
    elementLabel.setAttribute("for", this.name);
    elementLabel.innerText = this.label;

    const elementInput = document.createElement("input");
    elementInput.setAttribute("id", this.name);
    elementInput.setAttribute("name", this.name);
    elementInput.setAttribute("type", this.type);
    this.input = elementInput;

    formElement.appendChild(elementLabel);
    formElement.appendChild(elementInput);

    return formElement;
  }
}

export default FormElement;
