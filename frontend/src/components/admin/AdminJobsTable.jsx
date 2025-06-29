import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
    const { allAdminJobs ,searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        if (!Array.isArray(allAdminJobs)) {
            setFilterJobs([]);
            return;
        }
        const filterJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filterJobs);

    }, [allAdminJobs, searchJobByText])


    return (
        <div>
            <Table>
                <TableCaption>A List of your posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">
                                YOU HAVE NOT POSTED ANY JOB YET
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage
                                            src={job.logo}
                                            alt="Job Logo"
                                        />
                                    </Avatar>
                                    <span>{job?.company?.name}</span> 
                                </TableCell>
                                <TableCell>{job?.title}</TableCell>  
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={() => navigate(`/admin/companies/${job._id}`)}>
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>
                                            
                                            <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer">
                                                <Eye/>
                                                 <span>Applicant</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>

                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
