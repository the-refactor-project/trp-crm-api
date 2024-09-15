import request from "supertest";
import app from "../../../../server/app";
import { mockCourseEditionsFactory } from "../../factories/courseEditionsFactory";
import CourseEditionDto from "../../dto/courseEditionDto";
import {
  CourseEditionEntity,
  CourseEditionEntityData,
} from "../../CourseEditionEntity";

describe("Given a POST /course-editions endpoint", () => {
  describe("When it receives a request with a new edition's data", () => {
    test("Then it should respond with 201 and the new edition", async () => {
      const newCourseEditionData =
        mockCourseEditionsFactory.createOneItemData();

      const response = await request(app)
        .post("/course-editions")
        .send(newCourseEditionData)
        .expect(201);

      const responseBody: {
        edition: CourseEditionEntity;
      } = response.body;

      expect(responseBody.edition).toEqual(
        expect.objectContaining(
          new CourseEditionDto(newCourseEditionData as CourseEditionEntity),
        ),
      );
    });
  });

  describe("When it receives a request with a new edition's data without name", () => {
    test("Then it should respond with 400 and a 'Missing data' error", async () => {
      const newCourseEditionData =
        mockCourseEditionsFactory.createOneItemData();

      const wrongNewCourseEditionData: Partial<CourseEditionEntityData> = {
        ...newCourseEditionData,
      };

      delete wrongNewCourseEditionData.name;

      const response = await request(app)
        .post("/course-editions")
        .send(wrongNewCourseEditionData)
        .expect(400);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe("Missing or wrong data");
    });
  });
});
