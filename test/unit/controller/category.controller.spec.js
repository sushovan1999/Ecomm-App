const { mockRequest, mockResponse } = require("./../interceptor");
const db = require("./../../../model");
const categoryController = require("./../../../controller/category.controller");

describe("Category Controller", () => {
  let req, res;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  let allCategories = [
    {
      id: 1,
      name: "Fashion",
    },
    {
      id: 2,
      name: "Books",
    },
  ];

  let singleCategory = {
    id: 1,
    name: "Fashion",
  };

  let updateCategory = {};

  it("should test the getAllCategories method", async () => {
    const spy = jest.spyOn(db.category, "findAll").mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          resolve(allCategories);
        })
    );
    await categoryController.getAllCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(allCategories);
  });

  it("should test the error for getAllCategories", async () => {
    const spy = jest.spyOn(db.category, "findAll").mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject({
            message: "Some internal error occured",
          });
        })
    );
    await categoryController.getAllCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Some internal error occured",
    });
  });

  it("should test getCategoryId method", async () => {
    const spy = jest.spyOn(db.category, "findAll").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve(singleCategory);
      });
    });
    req.params.categoryId = 1;
    await categoryController.getCategoryById(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(singleCategory);
  });

  it("should test addNewCategory method", async () => {
    const spy = jest.spyOn(db.category, "create").mockImplementation(() => {
      new Promise((resolve, reject) => {
        resolve("New category added");
      });
    });
    await categoryController.addNewCategory(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("New category added");
  });

  it("should test deleteCategoryById method", async () => {
    const spy = jest.spyOn(db.category, "destroy").mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve("category deleted");
      });
    });
    req.params.categoryId = 1;
    await categoryController.deleteCategoryById(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("category deleted");
  });

  // it("should test updateCategoryById method", async () => {
  //   const spy = jest.spyOn(db.category, "update").mockImplementation(() => {
  //     return new Promise((resolve, reject) => {
  //       resolve("category deleted");
  //     });
  //   });
  //   req.params.categoryId = 1;
  //   await categoryController.updateCategoryById(req, res);

  //   expect(spy).toHaveBeenCalled();
  //   expect(res.status).toHaveBeenCalledWith(200);
  //   expect(res.send).toHaveBeenCalledWith("category deleted");
  // });
});
