import request from "supertest";
import app from "../../../../server/app";
import CourseEdition from "../../model/CourseEdition";
import { createMockCourseEditions } from "../../factories/courseEditionsFactory";
import { CourseEditionEntity } from "../../CourseEditionEntity";
import CourseEditionDto from "../../dto/courseEditionDto";

afterEach(async () => {
  await CourseEdition.deleteMany();
});

describe("Given a GET /course-editions endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two course editions", async () => {
      const courseEditions = createMockCourseEditions(2);

      for await (const courseEdition of courseEditions) {
        await CourseEdition.create(courseEdition);
      }

      const response = await request(app).get("/course-editions").expect(200);

      const responseBody: {
        editions: CourseEditionEntity[];
      } = response.body;

      courseEditions.forEach((courseEdition, index) => {
        expect(responseBody.editions[index]).toEqual(
          expect.objectContaining(new CourseEditionDto(courseEdition)),
        );
      });
    });
  });
});
