const NewsTable = require('../models/latestNew');



addNews = async(req,res)=>{
    if(req.data.user.role === "admin"){
    const news = new NewsTable(
        {
            date: req.body.date,
            news: req.body.news
        }
    );
    try {
        const savedNews = await news.save();
        res.status(200).json({ status: 200 });
    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 400 });
    }
}
else{
    res.status(400).json({ status: 401 });
}
}

getNews = async(req,res)=>{
    try{
    const news = await NewsTable.find();
    res.status(200).json({ status: 200, latestnewsdata: news });
    }
    catch(error){
        res.status(400).json({ status: 400 });
    }
}





module.exports={
    addNews,
    getNews
}