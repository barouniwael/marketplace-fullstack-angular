//---------------- module import------------------//
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const { cookieJwtAuth } = require("./middelware/auth");
const { ObjectId } = require("mongodb");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/marketplace");

//-------------------create express app----------------//
const app = express();

const User = require("./models/user");
const Product = require("./models/product");
const Category = require("./models/category");
const Order = require("./models/order");
const Comment = require("./models/comment");
const Message = require("./models/message");
const { async } = require("rxjs/internal/scheduler/async");

// send json res
app.use(bodyParser.json());
app.use(cookieParser());
// get obj from req
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*","http://localhost:4200");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, DELETE, OPTIONS, PATCH, PUT"
//   );
//   next();
// });
////multer
// path configuration
app.use("/images", express.static(path.join("backend/images")));
//define media type
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",

};

const configStorage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});
//------------------- traitement ----------------//

//signup

app.post("/signup", (req, res) => {
  console.log("BL signup");
  console.log(req.body);

  bcrypt.hash(req.body.pwd, 10).then((pwdcrypted) => {
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      pwd: pwdcrypted,
      phone: req.body.phone,
      adress: req.body.adress,
      isAdmin: req.body.isAdmin,
    });
    user.save((err, doc) => {
      if (err) {
        if (err.errors.phone) {
          res.json({ msg: "phone alerdy exist" });
        } else if (err.errors.email) {
          res.json({ msg: "email alerdy exist" });
        }
      } else {
        res.json({ doc: doc });
      }
    });
  });
});

//login
app.post("/login", async (req, res) => {
  let user;

   await User.findOne({ phone: req.body.phone })
    .then((doc) => {
      if (!doc) {
        res.json({ msg: "please check phone" });

      }
      user = doc;
   
      return bcrypt.compare(req.body.pwd, doc.pwd);
    })
    .then((pwdComparedPwd) => {
      if (pwdComparedPwd) {
        let userToSend = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user._id,
          isAdmin: user.isAdmin,
        };
        const token = jwt.sign(userToSend, "process.env.MY_SECRET", {
          expiresIn: "1h",
        });

        return res.cookie("token", JSON.stringify(token), {
            maxAge: 10000000,
            httpOnly: false,
          })
          .json({
            message: "welcome",
            user: userToSend,
            expireIn:200,
            token:token,
          });
      } else {
        res.json({ message: "Please check PWD" });
      }
    });
});

//addproduct
app.post ("/addproduct",  multer({ storage: configStorage }).single("img"),async (req, res) => {
  console.log("addproduct", req.body);
  console.log("file",req.file);
  let url = req.protocol + "://" + req.get("host");
  let product = new Product({
    category: req.body.category,
    name: req.body.name,
    price: req.body.price,
    time: req.body.time,
    userId: req.body.user,
    status: req.body.status,
    img: url + "/images/" + req.file.filename,
  });
   await product.save((err, doc) => {
    if (err) {
      res.json({ msg: "errot with DB" });
    } else {
      res.json({ msg: "product added", product: doc });
    }
  });
});

//get my products
app.post("/mesannonces", (req, res) => {
  console.log("bl my prodcuys");
  var hd = req.headers['authorization']
  let split = hd.split(' ')
  console.log("header",split[1]);
  let user = req.body.id;

  User.findById(user).then((data) => {
    if (data.isAdmin) {
      Product.find().then((products) => {
        res.json({ products: products });
      });
    } else {
      Product.find({ userId: user }).then((products) => {
        res.json({ products: products });
      });
    }
  });
});

//get all products
app.get("/allproducts", (req, res) => {
  Product.find().then((products) => {
    let pdt = products.filter((product)=>product.status =="enabled")
    res.json({ products: pdt });
  });
});

//get all products admin
app.get("/allproductsTab",cookieJwtAuth, (req, res) => {
    Product.find().then((products) => {
     
      res.json({ products: products});
    });
  });
//add category

app.post("/addcategory", (req, res) => {
  console.log("bl add category");
  let category = new Category({
    category: req.body.category,
  });
  category.save((err, doc) => {
    if (err) {
      res.json({ msg: "error adding category" });
    } else {
      res.json({ msg: "category added", category: doc });
    }
  });
});

//get all categories
app.get("/getallcategories", (req, res) => {
  Category.find().then((data) => {
    res.json({ categories: data });
  });
});

//order reservation
app.post("/order", (req, res) => {
  let order = new Order({
    productId: ObjectId(req.body.productId),
    userId: ObjectId(req.body.userId),
  });
  order.save((err, result) => {
    if (err) {
      res.json({ msg: "error while ordering" });
    }
    if (result) {
      res.json({
        msg: "order added with success",
      });
    }
  });
});
//getProductsById
app.get("/getproduct/:id", (req, res) => {
  let id = req.params.id;
  Product.findOne({ _id: id }).then((doc) => {
    res.json({ doc: doc });
  });
});

//get my cart order by id
app.get("/order/:id", (req, res) => {
  console.log("order by id");
  let id = req.params.id;

  Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "orders",
      },
    },
  ]).then((data) => {
    let datas = data.filter((order) => order.userId == id);
    res.json({ data: datas });
  });
});

//delete order by id
app.delete("/order/:id", (req, res) => {
  console.log("dalete order by id");
  let id = req.params.id;
  Order.deleteOne({ _id: id }).then((result) => {
    if (result.deletedCount == 1) {
      res.json({ msg: `order with id:${id} deleted with sucess` });
    } else {
      res.json({ msg: "erro while deleting order" });
    }
  });
});
//deleteproduct

app.delete("/deleteproduct/:id", (req, res) => {
    console.log("delete bproduct by id");
  let id = req.params.id;
  Product.deleteOne({ _id: id }).then((result) => {
    if (result.deletedCount == 1) {
      res.json({ msg: `product with id:${id} deleted with sucess` });
    } else {
      res.json({ msg: "erro while deleting product" });
    }
  });
});

//editmyproduct
app.put("/editmyproduct",  multer({ storage: configStorage }).single("img"),(req, res) => {
  let newobj = req.body;
  let id = req.body.id;
  console.log(("id",id));
  let url = req.protocol + "://" + req.get("host");
  newobj.img = url + "/images/" + req.file.filename,

  
 
//   console.log("file",req.file);
  Product.updateOne({ _id: id}, newobj).then((result) => {
    console.log("result",result);
    if (result.modifiedCount == 1) {
      res.json({ msg: "product modified" });
    } else {
      res.json({ msg: "can't update product" });
    }
  });
});

//allow product admin
app.put("/allowproduct", (req,res)=>{
    console.log("allow");
    let id = req.body.id;
   console.log("id",id)
  Product.updateOne({ _id: id  },  { $set: { "status": "enabled"} },   ).then((res)=>{
  res.json({status:"enabled"})
  })

 
})
//get order tab
app.get("/orderstab/:id", (req, res) => {
  let userId = req.params.id;
  Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "products",
      },
    },
      
    {  $lookup:{
        from:"users",
        localField:"userId",
        foreignField:"_id",
        as:"user"
      }
    },
  ]).then((result) => {
  
    User.findOne({ _id: userId }).then((user) => {
      
      if (user.isAdmin) {
        res.json({ data: result });
      }else{
        let data = result.filter((product) => product.products[0].userId == userId);

        res.json({ data: data });
      }
    });
  
  });
});


//get 6 last product
app.get("/homeproducts",(req,res)=>{
    console.log("bl home product");
  Product.find({status:"enabled"}).sort({_id:-1}).limit(6).then((product) => {
    res.json({doc:product})
  });
   
})



// add comments
app.post("/comments",(req,res)=>{
    let comment =  new Comment({
        user:req.body.name,
        subject:req.body.subject,
        body:req.body.comment,
        productId: ObjectId (req.body.productId),
    })
comment.save((err,doc)=>
{
    if (err) {
        res.json({msg:"error saving comment"});
        
    }else {
        res.json({msg:"success saving comment",comment:doc});
    }
})
})

//get comments
app.get("/getcomments/:id",(req,res)=>{
    console.log("bl get comments");
    let id = req.params.id;
    Comment.find({productId:id}).then((comments)=>{
        res.json({comments:comments});
    })
})


// post message
app.post("/messages",async (req,res)=>{
    console.log("post message",req.body.productId);
     var targetId=await Product.findOne ({_id:req.body.productId});
 userId = (( targetId.userId).toString()); 
 let message= new Message({
     message: req.body.message,
     senderId: ObjectId(req.body.senderId),
     targetId: ObjectId(userId),
     productId:req.body.productId,

    })
    message.save((err,doc)=>{
    if (err) {
         res.json({msg:"error saving message"})
     } else {
           res.json({msg:"message envoyé"})
       }
     })
})

//get messages
 app.get("/getmessages/:id", (req,res)=>{
    console.log(("get messages"));
    let targetId = req.params.id;
  
    Message.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
          
        {  $lookup:{
            from:"users",
            localField:"senderId",
            foreignField:"_id",
            as:"user"
          }
        },
    ]).then(async (data)=>{

      
       await User.findOne({_id:data[0].user[0]._id}).then((user)=>{
   
   
          if (user.isAdmin) {
           res.json({message:data})
          }  else{
           let tab =      data.filter((elt)=> {return elt.targetId == targetId});

            res.json({message:tab})
           }
        })
 
        
    })
    
})


//get all users
app.get("/getusers",(req,res)=>{
    User.find().then(data=> res.json({users:data}))
})
//delete userby Id
app.delete("/deleteuser/:id",(req,res)=>{
    let id = req.params.id;
    User.deleteOne({_id:id}).then((result)=>{
        if (result.deletedCount == 1) {
            res.json({
              msg: `user with id:${id} deleted with sucess`,
              idseleted: true,
            });
          } else {
            res.json({ msg: "erro while deleting user", isDeleted: false });
          }
    })
})
//------------exportation du app-------------//

module.exports = app;



