import { connect } from "mongoose";
const ConnectionDb = () => {
  const Url = String(process.env.URL_MONGO);
  connect(Url)
    .then(() => {
      console.log("Mongo Connection Successfully URL: ", Url);
    })
    .catch((err) => {
      console.log(err);
    });
};
export default ConnectionDb;
