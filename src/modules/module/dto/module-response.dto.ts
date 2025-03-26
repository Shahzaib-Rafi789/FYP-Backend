export class ModuleResponseDto {
  moduleId: string;
  module_type: string;
  parts: string[]; // Array of populated part details

  constructor(module: any) {
    this.moduleId = module._id.toString();
    this.module_type = module.module_type;
    this.parts = module.parts;
  }
}
