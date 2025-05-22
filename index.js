const express = require('express');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRoutes');
const connectDB = require('./utils/validators')
const bookRoutes = require('./routes/bookRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
dotenv.config();
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    return res.send("book app is runing")
})
app.use('/api/auth', authRoute);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/books',bookRoutes)
const PORT = process.env.PORT
connectDB();
app.listen(PORT||4000, () => {
    console.log(`Server running on port ${PORT}`); 
})

