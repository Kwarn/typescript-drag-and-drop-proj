namespace App {
  export enum ProjectStatus {
    ACTIVE, // 0
    FINSIHED, // 1
  }

  // --- Project Class ---

  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}
