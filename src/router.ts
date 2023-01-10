import { Router } from "express";
import { body, validationResult } from 'express-validator';
import { checkIfExistInBody, validateRequest, validateProductId } from "./modules/validation-middlewares"
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product"
import { createUpdate, deleteUpdate, getAllUpdates, getUpdateById, updateUpdate } from "./handlers/update"

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

router.get("/update", getAllUpdates);

router.get("/update/:id", getUpdateById);

router.post("/update",
  checkIfExistInBody('title').isString().withMessage('Please enter a valid title'),
  checkIfExistInBody('body').isString().withMessage('Please enter a valid title'),
  checkIfExistInBody('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  checkIfExistInBody('productId').isString().withMessage('Please enter a valid ProductId'),
  body('version', "Please provide a valid version").optional().isString(),
  validateRequest,
  validateProductId,
  createUpdate);

router.put("/update/:id",
  checkIfExistInBody('title').isString().withMessage('Please enter a valid title'),
  checkIfExistInBody('body').isString().withMessage('Please enter a valid title'),
  checkIfExistInBody('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version', "Please provide a valid version").optional().isString(),
  validateRequest,
  validateProductId,
  updateUpdate);

router.delete("/update/:id", deleteUpdate);

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

