const Book = require('../models/Book')
const Review=require('../models/Review')
const addBook = async(req,res)=>
{
    try {
        const book = await new Book({...req.body,createdBy:req.user.id})
        await book.save()
        res.status(201).json(book)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getBook = async(req,res)=>
{
    const {author,genre,page=1,limit=10}=req.query
    const filter = {};
    if(author) filter.author=author
    if(genre) filter.genre =genre
    const books = await Book.find(filter)
    .skip((page-1)*limit)
    .limit(Number(limit))
    res.status(200).json(books);

}
const getBookById = async(req,res)=>
{
    const book = await Book.findById(req.params.id);
    const reviews = await Review.find({book:book._id}).populate("user","username");
    const avgRating = reviews.length?reviews.reduce((sum,r)=>sum+r.rating,0):0
    res.status(200).json({book,avgRating,reviews})
}

const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query 'q' is required" });
    }

    const regex = new RegExp(q, 'i'); // 'i' for case-insensitive

    const books = await Book.find({
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } }
      ]
    });

    res.status(200).json({ results: books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports={addBook,getBook,getBookById, searchBooks}