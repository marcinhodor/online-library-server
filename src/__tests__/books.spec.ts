import request from "supertest"
import createServer from "../utils/createServer"
import { signJWT } from "../utils/signJWT"

const app = createServer()

const token = signJWT("7b6aec46-9ccd-4a5a-abca-e40d7b6a01d0", "test@email.com")

describe("books", () => {
  //
  describe("GET /books route", () => {
    //
    describe("simple GET request", () => {
      it("should return 200 and an array of books", async () => {
        const res = await request(app).get("/books")

        expect(res.status).toEqual(200)
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              isbn: expect.any(String),
              authors: expect.any(String),
              publication_year: expect.any(String),
              original_title: expect.any(String),
              title: expect.any(String),
              language_code: expect.any(String),
              average_rating: expect.any(String),
              image_url: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.any(String),
            }),
          ])
        )
      })
    })
  })

  describe("GET /books/:id route", () => {
    //
    describe("given a valid id 888 and auth token provided", () => {
      it("should return 200 and one book of id 888", async () => {
        const res = await request(app)
          .get("/books/888")
          .set("Authorization", `Bearer ${token}`)

        expect(res.status).toEqual(200)
        expect(res.body).toEqual({
          id: 888,
          isbn: "439023483",
          authors: "Suzanne Collins",
          publication_year: "2008",
          original_title: "The Hunger Games",
          title: "The Hunger Games (The Hunger Games, #1)",
          language_code: "eng",
          average_rating: "4.34",
          image_url:
            "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
          created_at: "2024-01-13T07:41:52.428Z",
          updated_at: "2024-01-13T07:41:52.428Z",
        })
      })
    })

    describe("given no auth token provided", () => {
      it("should return 401", async () => {
        const res = await request(app).get("/books/888")
        expect(res.status).toEqual(401)
      })
    })

    describe("given invalid token provided", () => {
      it("should return 403", async () => {
        const res = await request(app)
          .get("/books/888")
          .set("Authorization", `Bearer XXX`)
        expect(res.status).toEqual(403)
      })
    })

    describe("given id not a string", () => {
      it("should return 400", async () => {
        const res = await request(app)
          .get("/books/XYZ")
          .set("Authorization", `Bearer ${token}`)
        expect(res.status).toEqual(400)
      })
    })

    describe("given id not found in db", () => {
      it("should return 404", async () => {
        const res = await request(app)
          .get("/books/999999")
          .set("Authorization", `Bearer ${token}`)
        expect(res.status).toEqual(404)
      })
    })
  })

  describe("GET /books/search route", () => {
    //
    describe("given a valid search term title='Hunger Games'", () => {
      it("should return 200 and an array of books", async () => {
        const res = await request(app).get("/books/search?search=Hunger Games")

        expect(res.status).toEqual(200)
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: 888,
              isbn: "439023483",
              authors: "Suzanne Collins",
              publication_year: "2008",
              original_title: "The Hunger Games",
              title: "The Hunger Games (The Hunger Games, #1)",
              language_code: "eng",
              average_rating: "4.34",
              image_url:
                "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
              created_at: "2024-01-13T07:41:52.428Z",
              updated_at: "2024-01-13T07:41:52.428Z",
            }),
          ])
        )
      })
    })
  })
})
