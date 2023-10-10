import axios from "axios";

const instance = axios.create({

    baseURL: "http://localhost:8080/hamsterd/",
});

export const login = async (formData) => {
 return await instance.get("member", formData);

 

 
};

