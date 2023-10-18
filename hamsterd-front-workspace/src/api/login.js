import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

export const login = async (member) => {
  //   console.log("api의 id : " + formData.get("id"));
  //   console.log("api의 password : " + formData.get("password"));
  // console.log(member.idValue);
  const url = `member/${member.idValue}/${member.passwordValue}`;
  const result = await instance.get(url);
  console.log(result.data);

  return result;
  // return await instance.get("member", member);

<<<<<<< HEAD
  //
=======
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
  // console.log(member.get("id"));

  return await instance.put("member", member);
};

export const deleteMember = async (id) => {
  console.log(id);
  return await instance.delete(`member/${id}`);
>>>>>>> parent of 8be18ff (멤버관리(delete 오류 수정 필요))
};
