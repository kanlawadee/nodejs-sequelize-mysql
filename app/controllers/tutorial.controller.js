const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => { 
    if(!req.body.title){
        res.status(400).send({
            message: "Content cannot be empty!"
        })
        return;
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500!!"
            })
        });
};

exports.findAll = (req, res) => { 
    const title = req.body.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;  //like แปลว่า เหมือน
     
    Tutorial.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
        
};

exports.findOne = (req, res) => {   
   const id = req.params.id;
   Tutorials.findByPk(id)
   .then(data =>{
        if(data){
            res.send(data);
        }else{
            res.status(404).send({
                message: "Error 404 " + id
            })
        }
   })
   .catch(error => {
        res.status(500).send({
            message: "Error 500 " + id
        });
   });             
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true }})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500"
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, {where: {id:id}}) //id ตัวหน้าห้ามเปลี่ยน
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Update successfuly"
                });
            }else{
                res.send({
                    message: "Update failed!"
                });
            }
        })
        .catch(error => {
            res.status(500).send({
                message: "Error updated"
            })
        })
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.destroy({ where: {id:id}})
    .then(num => {
        if(num == 1){
            res.send({
                message: "Deleted successfuly."
            })
        }else{
            res.send({
                message: "Deleted failed!"
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: "Error update"
        })
    });
        
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where:{},
            truncate: false
        })
        .then(num => {
            res.send({ message: "Deleted successfuly."})  
        })
        .catch(error => {
            res.status(500).send({
                message: "Error 500!!!"
            })
        });
};