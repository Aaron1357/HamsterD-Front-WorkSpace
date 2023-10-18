import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

// export const login = async (member) => {
//   // console.log("api의 id : " + member.idValue);
//   // console.log("api의 password : " + member.passwordValue);
//   console.log(member);
//   const url = "member/signup";
//   const result = await instance.post(url, member);
//   console.log(result.data);

//   return result.data;
//   // return await instance.get("member", member);

//   //
// };

export const login = async (data) => {
  console.log(data);
  const url = "member/signin";
  return await instance.post("member/signin", data);
};

export const addMember = async (member) => {
  console.log(member);
  return await instance.post("member", member, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

export const updateMember = async (member) => {
  console.log("들어온 아이디 값 : " + member.id);

  return await instance.put("member", member);
};

export const deleteMember = async (id) => {
  console.log(id);
  return await instance.delete(`member/${id}`);
};
