const createHttpError = require('http-errors');
const Table = require("./../models/tableModel");
const mongoose = require("mongoose");

const addTable = async (req, res, next) => {

    try {
        const { tableNo, seats } = req.body;
        if (!tableNo) {
            const error = createHttpError(400, "Please Provide table No!");
            return next(error);
        }

        const isTablePresent = await Table.findOne({ tableNo });

        if (isTablePresent) {
            const error = createHttpError(400, "Table Already Exists!");
            return next(error);
        }

        const newTable = new Table({ tableNo, seats })
        await newTable.save();

        res.status(201).json({ success: true, mesaage: "Table Added Successfully!", data: newTable })

    }
    catch (error) {
        next(error);
    }
}

const getTables = async (req, res, next) => {

    try {
        const table = await Table.find().populate({
            path: "currentOrder",
            select: "customerDetails"
        });


        if (!table) {
            const error = createHttpError(404, "Table Not Fonund!");
            return next(error);
        }
        res.status(200).json({ success: true, data: table });
    } catch (error) {

    }


}



const updateTable = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = createHttpError(404, "Invalid ID!");
            return next(error);
        }

        const { status, orderId } = req.body;

        const table = await Table.findByIdAndUpdate(
            id,
            { status, currentOrder: orderId },
            { new: true }
        );

        if (!table) {
            return next(createHttpError(404, "Table Not Found!"));
        }

        return res.status(200).json({
            success: true,
            message: "Table updated successfully",
            data: table
        });

    } catch (error) {
        return next(error);
    }
};

module.exports = { addTable, getTables, updateTable }