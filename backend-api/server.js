require("dotenv").config();
const app = require("./src/app");
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", (error) => {
  if (error) {
    console.error(`Error starting server: ${error}`);
    throw error;
  }
  console.log(`Server is running on port ${port}.`);
});
