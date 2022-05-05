import { Student } from "../../models/index.js";


//Add Coach
export const addStudent = async (payload = {}, role) => {
    payload.role = role;
    let student = new Student(payload);
    return student.save();
};


//Find Student Id
export const findStudentById = async (condition = {}) => await Student.findOne(condition).exec();

