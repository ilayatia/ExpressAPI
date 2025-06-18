const obj = require('./classes.js')
const express = require("express");

const storage = new obj.InMemorySharedStorage()

storage.create("users",{id:2,firstname:"ilay",lastname:"atia",email:"ilay@atia.com",passowrd:"1234",age : 19 ,createdAt : Date.now(),tests :{pro:"tip"}})  
storage.create("tests")

const app = express();
const port = 3000;
app.use(express.json())

app.get("/api/:resource", (req, res) => {
    if (storage.collections[req.params.resource]){
      res.json(storage.collections[req.params.resource]);
    }
    else{
      res.status(404).json({ message: 'resourse not found' });
    }
});
app.post("/api/:resource" , (req,res) =>{            
    const data = req.body
    data.createdAt = Date.now() //added date
    data.tests = new obj.InMemorySharedStorage()
    storage.add(req.params.resource,data)
    res.send(req.body)
})
app.get("/api/:resource/:id/tests", (req, res) => {
    const id = parseInt(req.params.id)
    res.json(storage.find(req.params.resource,(user)=>user.id == id)[0].tests)
});

app.listen(port, () => {
  console.log(`app listening on http://127.0.0.1:${port}`);
});
