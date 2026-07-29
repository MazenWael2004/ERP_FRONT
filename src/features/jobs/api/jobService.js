import { api } from "../../../shared/api/axios"




export const fetchJobs = async ()=>{
      const response = await api.get("/jobs");
      return response.data;
};

// ANY TYPE: FIX LATERR..
export const createJob = async (job)=>{
     const response = await api.post("/jobs",
        job
     );
};


export const getJobById = async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
};

export const updateJob = async (id, data) => {
  return api.patch(`/jobs/${id}`, data);
};

export const deleteJob = async (id)=>{
  return api.delete(`/jobs/${id}`)
};

// jobService.ts

export const checkJobExists = async (field,value) => {
  const response = await api.get("/jobs/check", {
    params: {
      field,
      value,
    },
  });

  return response.data;
};