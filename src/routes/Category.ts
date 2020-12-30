import express from "express";
import { SELECT_QUERY } from "../utils/queries";

let router = express.Router();

let MODULE_ROUTE = "/category/";

router.get(MODULE_ROUTE + "list", (req, res) => {
  SELECT_QUERY("SELECT * FROM category", res);
});

module.exports = router;
