import { api } from "../../../shared/api/axios";


export const fetchRoles = async ()=>{
        const response = await api.get("/roles");
        return response.data;
};

