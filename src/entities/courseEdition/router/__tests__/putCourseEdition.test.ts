import request from "supertest";
import app from "../../../../server/app";
import { mockCourseEditionsFactory } from "../../factories/courseEditionsFactory";
import CourseEditionDto from "../../dto/courseEditionDto";
import CourseEdition from "../../model/CourseEdition";
import { CourseEditionEntity } from "../../CourseEditionEntity";
import { Types } from "mongoose";

afterEach(async () => {
  await CourseEdition.deleteMany();
});

describe("Given a PUT /course-editions/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated edition", async () => {
      const courseEdition = mockCourseEditionsFactory.createOne();

      await CourseEdition.create(courseEdition);

      const updatedCourseEdition: CourseEditionEntity = {
        ...courseEdition,
        name: courseEdition.name + "!!",
      };

      const response = await request(app)
        .put("/course-editions")
        .send(updatedCourseEdition)
        .expect(200);

      const responseBody = response.body as {
        updatedEdition: CourseEditionEntity;
      };

      expect(responseBody.updatedEdition).toEqual(
        expect.objectContaining(new CourseEditionDto(updatedCourseEdition)),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Edition not found", async () => {
      const courseEdition = mockCourseEditionsFactory.createOne();

      const response = await request(app)
        .put("/course-editions")
        .send(courseEdition)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Edition not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const courseEdition = mockCourseEditionsFactory.createOne();

      courseEdition._id = "invalid-id" as unknown as Types.ObjectId;

      const response = await request(app)
        .put("/course-editions")
        .send(courseEdition)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
