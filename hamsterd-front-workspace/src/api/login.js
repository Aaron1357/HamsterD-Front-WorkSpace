import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

export const login = async (data) => {
  const url = "member/signin";
  return await instance.post("member/signin", data);
};

export const addMember = async (member) => {
  console.log(member);
  return await instance.post("member", member, {
    headers: {
      "Content-Type": `application/json`,
    },
  });//
};

export const updateMember = async (member) => {
  // console.log(member.get("id"));

  return await instance.put("member", member);
};

export const deleteMember = async (id) => {
  console.log(id);
  return await instance.delete(`member/${id}`);
};
