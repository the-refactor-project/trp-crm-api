import request from "supertest";
import app from "../../../../server/app";
import Course from "../../model/Course";
import { CourseEntity } from "../../CourseEntity";
import { createMockCourses } from "../../factories/coursesFactory";

afterEach(async () => {
  await Course.deleteMany();
});

describe("Given a GET /courses endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with 200 and two courses", async () => {
      const courses = createMockCourses(2);

      for await (const course of courses) {
        await Course.create(course);
      }

      const response = await request(app).get("/courses").expect(200);

      const responseBody: {
        courses: CourseEntity[];
      } = response.body;

      courses.forEach((course, index) => {
        expect(responseBody.courses[index]).toEqual(
          expect.objectContaining(course),
        );
      });
    });
  });
});
