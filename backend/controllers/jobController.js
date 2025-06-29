import { Job } from "../models/jobModel.js";
import mongoose from "mongoose";

//admin will post
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: 'Job created Successfully', job,
            success: true
        })
    }
    catch (error) {
        console.log('ERROR', error);
    }
}

//for_student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim() || "";

    let query = {};

    if (keyword) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};


//For_Student

export const getJobById = async (req, res) => {
  const jobId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Job ID",
    });
  }

  try {
    const job = await Job.findById(jobId).populate("applications");
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


//will fetch the total job created by admin
export const getAdminJobs = async (req,res) =>{
     try{
        const adminId = req.id;
        const jobs = await Job.find({created_by : adminId}).populate({
          path : 'company',
          createdAt : -1
        });
        if(jobs.length == 0){
            return res.status(404).json({
                message :"Jobs not found",
                success : false
            })
        };
        return res.status(200).json({
             jobs,
             success :true
        })
     }
     catch(error){
        console.log('ERROR' , error);
     }
}