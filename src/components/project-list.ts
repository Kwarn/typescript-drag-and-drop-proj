/// <reference path="component-base.ts"/>
/// <reference path="../decorators/autobind-decorator.ts"/>
/// <reference path="../models/drag-drop-interfaces.ts"/>
/// <reference path="../store/project-state.ts"/>
/// <reference path="../models/project-model.ts"/>

// --- ProjectList Class ---
namespace App {
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DropTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.assignedProjects = [];
      this.configure();
      this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        // by default dropping is not allowed
        event.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
      }
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.remove('droppable');
    }

    @autobind
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer?.getData('text/plain')!;
      projectState.moveProject(
        projectId,
        this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINSIHED
      );
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const releventProjects = projects.filter(prj => {
          if (this.type === 'active') {
            return prj.status === ProjectStatus.ACTIVE;
          } else {
            return prj.status === ProjectStatus.FINSIHED;
          }
        });
        this.assignedProjects = releventProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent =
        this.type.toLocaleUpperCase() + ' PROJECTS';
    }
    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      )! as HTMLUListElement;
      // this will rerender all projects, for the size of this app it's fine
      // alternative is to check against DOM which would be expensive
      listEl.innerHTML = '';
      for (const projectItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
      }
    }
  }
}
