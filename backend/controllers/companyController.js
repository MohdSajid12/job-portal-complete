import { Company } from "../models/companyModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already Registered",
                success: false
            })
        };

        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(201).json({
            message: "company is registered successfully",
            company: company,
            success: true
        })
    }
    catch (error) {
        console.log('Error', error);
    }
}


export const getCompnay = async (req, res) => {
    try {
        const userId = req.id;    //lodged in userID
        const companies = await Company.find({ userId });   //this will return an array
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                status: false
            })
        }

        return res.status(200).json({
            companies,
            success : true
        });
    }
    catch (error) {
        console.log('ERROR', error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    }
    catch (error) {
        console.log('ERROR', error);
    }
}

export const updateCompany = async (req,res) =>{
      try{
         const {name , description ,website , location} = req.body;
         const file = req.file;
         let fileUri;
         let cloudResponse;
         let logo;
         if(file)
         {
            fileUri= getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
         }
         const updateData = {name , description , website , location,logo};
         const company = await Company.findByIdAndUpdate(req.params.id , updateData , {new :true});
         
         if(!company){
             return res.status(404).json({
                 message : "Company not found",
                 success: false
             })
         }

         return res.status(200).json({
             message : "Company infromation updated Successfully",
             success : true
         })
      }catch(error){
        console.log('ERROR',error);
      } 

}