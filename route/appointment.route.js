const express = require("express");
const {AppointmentModel} =require("../model/appointment.model")
const AppointmentRouter = express.Router();

AppointmentRouter.get("/doctor", async (req, res) => {
    try {
        const { sort, department, search, page } = req.query;
        const filter = department ? { department } : {};
        const sortOption = sort === "asc" ? { salary: 1 } : sort === "desc" ? { salary: -1 } : {};
        const currentPage = parseInt(page) || 1;
        const perPage = 5;
        const skip = (currentPage - 1) * perPage;
        const searchQuery = search ? { firstName: { $regex: search, $options: "i" } } : {};

        const totalCount = await AppointmentModel.countDocuments({
            ...filter,
            ...searchQuery,
        });

        const doctor = await AppointmentModel.find({ ...filter, ...searchQuery, })
            .sort(sortOption)
            .skip(skip)
            .limit(perPage);

        res.status(200).send({
            doctor,
            totalCount,
            currentPage,
            totalPages: Math.ceil(totalCount / perPage),
        });
    } catch (error) {
        console.log({ "/doctorget": error.message })
        res.status(500).send({ msg: error.message })
    }
})

AppointmentRouter.post('/doctor', async (req, res) => {
    try {
        const { email } = req.body;
        const isDoctorExists = await AppointmentModel.findOne({ email });
        if (isDoctorExists) return res.status(400).send({ msg: "Doctor Already Exists" });

        const newDoctor = new AppointmentModel({ ...req.body });
        await newDoctor.save();
        res.status(201).send({ msg: "New Doctor Created" })
    } catch (error) {
        console.log({ "/doctor": error.message })
        res.status(500).send({ msg: error.message })
    }
})


AppointmentRouter.patch('/doctor/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        await AppointmentModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ msg: "doctor data updated successfully!" })
    } catch (error) {
        console.log({ "/doctorupdate": error.message })
        res.status(500).send({ msg: error.message })
    }
})


AppointmentRouter.delete('/doctor/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await AppointmentModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ msg: "Doctor deleted successfully!" })
    } catch (error) {
        console.log({ "/doctordelete": error.message })
        res.status(500).send({ msg: error.message })
    }
})



module.exports = {AppointmentRouter}