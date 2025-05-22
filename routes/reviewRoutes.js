const express = require("express")
const router = express.Router();
const auth = require("../middleware/auth")
const {updateReview,deleteReview}=require("../controller/reviewController")
router.put("/:id",auth,updateReview);
router.delete("/:id",auth,deleteReview)
module.exports = router 