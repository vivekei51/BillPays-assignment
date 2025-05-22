const express= require('express')
const router = express.Router();
const auth = require("../middleware/auth")
const {addBook,getBook,getBookById,searchBooks}=require("../controller/bookController")
const {addReview}=require("../controller/reviewController")

router.post("/",auth,addBook)
router.get("/",getBook);
router.get("/:id",getBookById);
router.post("/:id/reviews",auth,addReview);
router.get('/search', searchBooks);
module.exports=router