export class TestResponseDto {
  testId: string;
  alias: string;
  isPublic: boolean;
  test_owner: string;
  modules: any[]; // Array of populated module details

  constructor(test: any) {
    this.testId = test._id.toString();
    this.alias = test.alias;
    this.isPublic = test.isPublic;
    this.test_owner = test.test_owner;
    this.modules = test.modules;
  }
}
