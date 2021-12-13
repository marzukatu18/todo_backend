import dotenv from 'dotenv';
import express from 'express';
import  mongoose  from 'mongoose';
import TodoModel from'./schemas/todo_schema.js'

dotenv.config();
const app =express();
app.use(express.json());
const db = process.env.DB_URL;
const PORT = process.env.PORT|| 3000

mongoose.connect(db,{
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to mongoDB succefully')}).catch((err)=>{
    console.log(err)
})


// get all todos
app.get('/todos', async(req,res)=>{
    try {
        const todos =await TodoModel.find({});
        return res.status(200).json({
            status:true,
            message:'Todos fetched successfully',
            data:todos
        })
    } catch (error) {
        console.log('something went wrong',error);
        response.status(400).send('Failed to fetch todos',error)
        
    }
})

app.post('/todos',async(req,res)=>{
    try {
        const newTodo = await TodoModel.create({...req.body});
         res.status(201).json({
             status:true,
             message:"Todo created successfully",
             data: newTodo
         })
    } catch (error) {
        console.log('Something went wrong', error);
        //res.status(400).send('Failed to fetch todos',error)
    }
})

app.delete('/todos/:id',async(req,res)=>{
    try {
        const{id} = req.params;
        const deleteTodo = await TodoModel.findByIdAndDelete(id);
        return res.status(201).json({
            message:"Todo deleted successfully",
            
        })
    } catch (error) {
        console.log('Something went wrong',error);
        
    }
})

app.patch('/todos/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const{status}=req.body;
        const UpdateTodo=await TodoModel.updateOne({status:status}).where({_id:id})
        return res.status(201).json({
            status:true,
            message:'Todo updated successfully',
            data:UpdateTodo
        })
    } catch (error) {
        console.log('Something went wrong')
    }
})


app.listen(PORT)