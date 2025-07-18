import React from 'react'
import LatestJobsCards from './LatestJobsCards'
import { useSelector } from 'react-redux';
const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allJobs.length != 0
            ? allJobs?.slice(0, 6).map((job) => <LatestJobsCards  key={job._id} job={job} />)
            : <span>NO JOBS AVAILABLE</span>
        }

      </div>
    </div>
  )
}

export default LatestJobs
