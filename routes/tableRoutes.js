const express=require('express');
const { addTable, getTables, updateTable } = require('../controllers/tableController');
const router=express.Router();


router.route("/").post(addTable); 
router.route("/").get(getTables);
router.route("/:id").put(updateTable); 

module.exports=router; 