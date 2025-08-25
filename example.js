import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const form = new FormData();
form.append("file", fs.createReadStream("./test.jpg"));

axios.post("http://localhost:3000/upload", form, {
  headers: form.getHeaders()
}).then(res => {
  console.log(res.data);
}).catch(err => {
  console.error(err);
});
