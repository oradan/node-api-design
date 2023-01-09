import { Router } from "express";
import { checkIfExistInBody, validateRequest } from "./modules/validation-middlewares"
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product"

const router = Router()

/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post("/product",
  checkIfExistInBody('name').isString().withMessage('Please enter a valid name'),
  checkIfExistInBody('description').isString().withMessage('Please enter a valid description'),
  validateRequest,
  createProduct);

router.put("/product/:id",
  checkIfExistInBody('name').isString().withMessage('Please enter a valid name'),
  checkIfExistInBody('description').isString().withMessage('Please enter a valid description'),
  validateRequest,
  updateProduct);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", (req, res) => { });

router.get("/update/:id", (req, res) => { });

router.post("/update",
  checkIfExistInBody('title').isString().withMessage('Please enter a valid title'),
  checkIfExistInBody('body').isString().withMessage('Please enter a valid title'),
  validateRequest,
  (req, res) => {
    res.status(200).json({ message: "Update was added" })
  });

router.put("/update/:id",
  checkIfExistInBody('title').isString().withMessage('Please enter a valid title'),
  checkIfExistInBody('body').isString().withMessage('Please enter a valid title'),
  validateRequest,
  (req, res) => {
    res.status(200).json({ message: "Update was updated" })
  });

router.delete("/update/:id", (req, res) => { });

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => { });

router.get("/updatepoint/:id", (req, res) => { });

router.post("/updatepoint", 
checkIfExistInBody('name').isString().withMessage('Please enter a valid name'),
checkIfExistInBody('description').isString().withMessage('Please enter a valid description'),
validateRequest,
(req, res) => { 
  res.status(200).json({ message: "Updatepoint was added" })
});

router.put("/updatepoint/:id", 
checkIfExistInBody('name').isString().withMessage('Please enter a valid name'),
checkIfExistInBody('description').isString().withMessage('Please enter a valid description'),
validateRequest,
(req, res) => { 
  res.status(200).json({ message: "Updatepoint was updated" })
});

router.delete("/updatepoint/:id", (req, res) => { });

export default router;

