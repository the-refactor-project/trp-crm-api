import request from "supertest";
import app from "../../../../server/app";
import { createMockCourseEditions } from "../../factories/courseEditionsFactory";
import CourseEditionDto from "../../dto/courseEditionDto";
import CourseEdition from "../../model/CourseEdition";
import { CourseEditionEntity } from "../../CourseEditionEntity";

afterEach(async () => {
  await CourseEdition.deleteMany();
});

describe("Given a GET /course-editions/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the edition", async () => {
      const courseEdition = createMockCourseEditions(1)[0];

      await CourseEdition.create(courseEdition);

      const response = await request(app)
        .get(`/course-editions/${courseEdition._id}`)
        .expect(200);

      const responseBody = response.body as {
        edition: CourseEditionEntity;
      };

      expect(responseBody.edition).toEqual(
        expect.objectContaining(new CourseEditionDto(courseEdition)),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Edition not found", async () => {
      const courseEdition = createMockCourseEditions(1)[0];

      const response = await request(app)
        .get(`/course-editions/${courseEdition._id}`)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Edition not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const invalidId = "invalid-id";

      const response = await request(app)
        .get(`/course-editions/${invalidId}`)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
