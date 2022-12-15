const express=require('express');
const mongoose=require('mongoose');
const { ppid } = require('process');
const app=express(); //make obj of express
//midleware fun post method recieve data from font end to backend;
app.use(express.json());
//route then rq,res
let users=[
  {
    'name':'yogesh',
    'id':1
  },
  {
    'name':'abhishek',
    'id':1
  }
];
const UserRouter=express.Router();
const authRouter=express.Router();
//base router,router to use
app.use('/users',UserRouter);
app.use('/auth',authRouter);
authRouter
  .route('/signup')
  .get(getsignup)
  .post(submitform)
function getsignup(req,res)
{
  res.sendFile('/Users/yogeshgoyal/Desktop/frontend/Backend/html/formsubmit.html');
}
const db_link='mongodb+srv://admin:XIMUceyVSUeNtVul@cluster0.hqy4rlr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  console.log('db connected')
})
.catch(function(err){
  console.log(err);
})

const userschema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,  
    required:true,
    minLength:8
  },
  confirmpassword:{
    type:String,  
    required:true,
    minLength:8
  }
});
const usermodel=mongoose.model('usermodel',userschema);
function submitform(req,res)
{

  let obj=req.body
  let obj1=obj.nm;
  let obj2=obj.em;
  let obj3=obj.pass;
  let users={
    name: obj1,
    email: obj2,
    password: obj3,
    confirmpassword: obj3
  };
  (async function createuser(){
    let data=await usermodel.create(users)
    console.log(data);
  })()
  console.log('backend',obj);
  res.sendFile('/Users/yogeshgoyal/Desktop/frontend/Backend/html/thanks.html');
  res.send(
    {
      message:"user signed up",
      data:obj
    }
  )

};
UserRouter
  .route('/')
  .get(getUser)
  .patch(updateUser)
  .delete(DeleteUser)
  .post(postUser);

UserRouter.route('/:username').get(getUserbyusername);
async function getUser(req,res){
  let data=await usermodel.find({name:'abhishek'}); //to fetch data
  console.log(data);
  res.send("data recieved");
}
function updateUser(req,res){
    let datatobeupdated=req.body;
    for(key in datatobeupdated)
    {
      users.push(datatobeupdated);
    }
    res.send("data updated succesfully")
    console.log(users);
}
function postUser(req,res)
{
    
    res.send({
      message:"data recived succesfully",
      user:req.body
    });
}
function DeleteUser(req,res){
    users=[];
  res.send("user deleted");
}
function getUserbyusername(req,res)
{
    console.log(req.params.username);
    res.send("user id recieved");
}
app.get('/',(req,res)=>{
console.log("request is being made from browser to server");
res.sendFile('/Users/yogeshgoyal/Desktop/frontend/Backend/html/index.html');
});
app.get('/about-us',(req,res)=>{
    res.redirect('/');
})
app.listen(3000,()=>{
  console.log("server listening on port 3000");
app.use((req,res)=>{
    res.send("not found");
  })
  
});
