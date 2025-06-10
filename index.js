import path from "path";
import express from "express"
import { fileURLToPath } from "url";

const app = express();
const port = 2000;
const s_Path=path.dirname(fileURLToPath(import.meta.url));

app.use("/resources",express.static(path.join(s_Path,"public")));
app.use(express.urlencoded({extended:true}));

function verify(req,res,next) {
  req.valid=req.body.myEmail==="abc@gmail.com"&&req.body.myPass==="000";
  next();
}

// app.use(verify);

app.get("/",(req,res) => {
  res.sendFile(path.join(s_Path,"public/main.html"));
})

app.post("/submit",verify,(req,res) => {

if(req.valid){
  res.send("<h1>Submission success!</h1>");
}  
else
res.redirect("/");
})



app.listen(port,() => {
  console.log(`port ${port} is listening...`);
})