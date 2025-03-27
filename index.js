import 'dotenv/config';
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.get('/',(req,res) => {
    res.send('Hello VOiD');
    res.end();
})

app.get('/about',(req,res) => {
    res.send('This is about page');
    res.end();
})

app.get('/contact',(req,res) => {
    res.send('This is contact page');
    res.end();
})

let teasData = []
let newId = 1;

app.post('/teas',(req,res)=>{
    const {name,price} = req.body;
    const newTea = {id:newId++,name,price}
    teasData.push(newTea);
    res.status(201).send(newTea);
})

app.get('/teas',(req,res)=>{
    res.status(200).send(teasData);
})

app.get('/teas/:id',(req,res)=>{
    const tea = teasData.find(tea => tea.id === parseInt(req.params.id));
    if(!tea){
        res.status(404).send('The tea with the given ID was not found');
        return;
    }
    res.status(200).send(tea);
})

app.put('/teas/:id',(req,res)=>{
    const tea = teasData.find(tea => tea.id === parseInt(req.params.id));
    if(!tea){
        res.status(404).send('The tea with the given ID was not found');
    }

    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

app.delete('/teas/:id',(req,res)=>{
    const index = teasData.findIndex(tea => tea.id === parseInt(req.params.id));
    if(index == -1){
        return res.status(404).send('The tea was not found');
    }
    teasData.splice(index,1);
    return res.status(204).send('Deleted');
    }
)

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})
