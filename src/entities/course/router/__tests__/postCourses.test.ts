import request from "supertest";
import app from "../../../../server/app";
import { CourseEntity, CourseEntityData } from "../../CourseEntity";
import { createMockCourseDatas } from "../../factories/coursesFactory";

describe("Given a POST /courses endpoint", () => {
  describe("When it receives a request with a new courses's data", () => {
    test("Then it should respond with 201 and the new course", async () => {
      const newCourseData = createMockCourseDatas(1)[0];

      const response = await request(app)
        .post("/courses")
        .send(newCourseData)
        .expect(201);

      const responseBody: {
        course: CourseEntity;
      } = response.body;

      expect(responseBody.course).toEqual(
        expect.objectContaining(newCourseData),
      );
    });
  });

  describe("When it receives a request with a new course's data without name", () => {
    test("Then it should respond with 400 and a 'Missing data' error", async () => {
      const newCourseData = createMockCourseDatas(1)[0];

      const wrongNewCourseData: Partial<CourseEntityData> = {
        ...newCourseData,
      };

      delete wrongNewCourseData.name;

      const response = await request(app)
        .post("/courses")
        .send(wrongNewCourseData)
        .expect(400);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe("Missing or wrong data");
    });
  });
});
