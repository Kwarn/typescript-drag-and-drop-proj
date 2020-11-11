/// <reference path="component-base.ts"/>
/// <reference path="../decorators/autobind-decorator.ts"/>
/// <reference path="../utility/validation.ts"/>
/// <reference path="../store/project-state.ts"/>

// ProjectInput Class

namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');
      this.titleInputElement = this.element.querySelector(
        '#title'
      )! as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        '#description'
      )! as HTMLInputElement;

      this.peopleInputElement = this.element.querySelector(
        '#people'
      )! as HTMLInputElement;
      this.configure();
    }

    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = +this.peopleInputElement.value;

      const titleValidatable: Validateable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validateable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidatable: Validateable = {
        value: enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Please fill out all fields');
        return;
      } else {
        return [enteredTitle, enteredDescription, enteredPeople];
      }
    }

    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }

    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }
  }
}
