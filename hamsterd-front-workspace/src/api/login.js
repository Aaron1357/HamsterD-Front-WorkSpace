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
  return await instance.post("member", member, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
