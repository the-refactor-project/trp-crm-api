import request from "supertest";
import { Types } from "mongoose";
import app from "../../../../server/app";
import { mockCoursesFactory } from "../../factories/coursesFactory";
import Course from "../../model/Course";
import { CourseEntity } from "../../CourseEntity";

afterEach(async () => {
  await Course.deleteMany();
});

describe("Given a PUT /courses/:id endpoint", () => {
  describe("When it receives a request with an existing id", () => {
    test("Then it should respond with 200 and the updated course", async () => {
      const course = mockCoursesFactory.createOne();
      const updatedCourseName = course.name + "!!";

      await Course.create(course);

      const updatedCourse: CourseEntity = {
        ...course,
        name: updatedCourseName,
      };

      const response = await request(app)
        .put("/courses")
        .send(updatedCourse)
        .expect(200);

      const responseBody = response.body as {
        updatedCourse: CourseEntity;
      };

      expect(responseBody.updatedCourse).toEqual(
        expect.objectContaining({ name: updatedCourseName }),
      );
    });
  });

  describe("When it receives a request with a non existing id", () => {
    test("Then it should respond with 404 and a 'Course not found", async () => {
      const course = mockCoursesFactory.createOne();

      const response = await request(app)
        .put("/courses")
        .send(course)
        .expect(404);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Course not found");
    });
  });

  describe("When it receives a request with an invalid id", () => {
    test("Then it should respond with 400 and a 'Invalid id' error", async () => {
      const course = mockCoursesFactory.createOne();

      course._id = "invalid-id" as unknown as Types.ObjectId;

      const response = await request(app)
        .put("/courses")
        .send(course)
        .expect(400);

      const responseBody: {
        error: string;
      } = response.body;

      expect(responseBody.error).toBe("Invalid id");
    });
  });
});
