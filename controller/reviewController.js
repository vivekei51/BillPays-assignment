const Review = require("../models/Review");
const addReview = async(req,res)=>
{
    const existing = await Review.findOne({book:req.params.id,user:req.user.id})
    if(existing) return res.status(400).json({message:"you already reviewed this book"})
    const review = new Review({...req.body,book:req.params.id,user:req.user.id})
    await review.save();
    res.status(201).json(review)
}
const updateReview = async(req,res)=>
{
    const review = await Review.findById(req.params.id)
    if(!review||review.user.toString()!==req.user.id)
        return res.status(403).json({message:"Not authorized"});
    object.assign(review,req.body)
    await review.save();
    res.status(200).json(review)
};
const deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id)
        return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted" });
};

module.exports= {addReview,updateReview,deleteReview}