import { api } from "../../../shared/api/axios"




export const fetchJobs = async ()=>{
      const response = await api.get("/jobs");
      return response.data;
};

// ANY TYPE: FIX LATERR..
export const createJob = async (job:any)=>{
     const response = await api.post("/jobs",
        job
     );
};