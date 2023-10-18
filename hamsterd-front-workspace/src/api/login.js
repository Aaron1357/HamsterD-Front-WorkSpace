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

  //
};

export const addMember = async (member) => {
  return await instance.post("member", member);
};
