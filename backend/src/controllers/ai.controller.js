import aiService from '../services/ai.service.js';
export const getReview = async(req, res)=>{
    const code = req.body.code;

    if(!code){
        return res.status(400).send("No Code is Provided");
    }

    const response = await aiService(code);

    res.send(response);
}