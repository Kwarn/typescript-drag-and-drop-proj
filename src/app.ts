// / <reference path="models/drag-drop-interfaces.ts" />
// / <reference path="models/project-model.ts" />
// / <reference path="./store/project-state.ts" />
// / <reference path="./utility/validation.ts" />
// / <reference path="./decorators/autobind-decorator.ts" />
// / <reference path="./components/component-base.ts" />
// / <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-input.ts" />

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
