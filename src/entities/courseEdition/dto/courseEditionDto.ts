import { CourseEditionEntity } from "../CourseEditionEntity";

class CourseEditionDto {
  name: string;
  date: string;

  constructor(courseEdition: CourseEditionEntity) {
    this.name = courseEdition.name;
    this.date = courseEdition.date.toISOString();
  }
}

export default CourseEditionDto;
