export const updateBookValidationSchema = {
  isbn: {
    optional: true,
    isString: { errorMessage: "isbn must be a string" },
    notEmpty: { errorMessage: "isbn cannot be empty" },
    trim: true,
  },
  authors: {
    optional: true,
    isString: { errorMessage: "authors must be a string" },
    notEmpty: { errorMessage: "authors cannot be empty" },
    trim: true,
  },

  publication_year: {
    optional: true,
    isString: { errorMessage: "publication_year must be a string" },
    notEmpty: { errorMessage: "publication_year cannot be empty" },
    trim: true,
  },

  original_title: {
    optional: true,
    isString: { errorMessage: "original_title must be a string" },
    notEmpty: { errorMessage: "original_title cannot be empty" },
    trim: true,
  },

  title: {
    optional: true,
    isString: { errorMessage: "title must be a string" },
    notEmpty: { errorMessage: "title cannot be empty" },
    trim: true,
  },

  language_code: {
    optional: true,
    isString: { errorMessage: "language_code must be a string" },
    notEmpty: { errorMessage: "language_code cannot be empty" },
    trim: true,
  },
  average_rating: {
    optional: true,
    isString: { errorMessage: "average_rating must be a string" },
    notEmpty: { errorMessage: "average_rating cannot be empty" },
    trim: true,
  },
  image_url: {
    optional: true,
    isString: { errorMessage: "image_url must be a string" },
    notEmpty: { errorMessage: "image_url cannot be empty" },
    trim: true,
  },
}
