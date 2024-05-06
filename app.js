const express=require("express");
const bodyParser=require("body-parser");
const ab=express();
const https=require("https");
const { argv } = require("process");
ab.use(bodyParser.urlencoded({extended:true}));

// ab.use(express.static("./"));
ab.use(express.static("./"));

ab.get("/",function(req,res)
{
   res.sendFile(__dirname+"/index.html");     
 
});
ab.get("/blog",function(req,res)
{
   res.sendFile(__dirname+"/blog.html");     
  
});
ab.post("/blog",function (req,res) {

    const fname=req.body.firstname;
    const lname=req.body.lastname;
    const email1=req.body.email;
    var data={

        members:[
            {
            email_address:email1,
            status:"subscribed",
            merge_fields:
            {                      
                FNAME:fname,
                 LNAME:lname
            }
        }
    ]
    };
    const jsondata=JSON.stringify(data);
    const url='https://us21.api.mailchimp.com/3.0/lists/e6ce76bd1d';
    const options=
    {
        method:"POST",
        auth:"dhruv:8e86fd4c40f0ff4ab614d790c79c7427-us21"
    }
  const request=  https.request(url,options,function(response)
        {  
            const a=response.statusCode;
            console.log(a);

            if(a===200)
            {
                res.sendFile(__dirname+"/success.html");
                
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
               response.on("data",function(data)
               {
                   console.log(JSON.parse(data));
               })
           
          
    })
    request.write(jsondata);
    request.end();
  });
  ab.post("/failure",function(req,res)
  {
      res.redirect("/");
  })
ab.listen(process.env.PORT || 3000,function(req,res)
{
    console.log("server is running");
    // res.sendFile(__dirname+"/index.html");     
});



//api key:9bcc525c392899aea74c13c5ece46ec8-us13
//list id:983181c55d

//e6ce76bd1d