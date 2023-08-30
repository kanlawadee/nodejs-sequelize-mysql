const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); //เรียกใช้งาน json

app.use(express.urlencoded({extended: true}));  //รับค่าจากฟอร์ม

const db = require ("./app/model");
db.sequelize.sync()
    .then(() => {
        console.log("Synced DB");
    })
    .catch(() => {
        console.log("Failed to sync DB");
    });

//เข้าเบาร์เซอร์ ใส่ URL http://localhost:8080 
app.get("/", (req, res)=>{
    res.json({message: "Welcome to default route"});
});

// http://localhost:8080/api/tutorials
require("./app/routes/tutorial.routes.js")(app);

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});