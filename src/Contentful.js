const contentful = require("contentful");

export default contentful.createClient({
  space: process.env.REACT_APP_API_KEY,
  accessToken: process.env.REACT_APP_API_ACCESS_TOKEN
});
