import "dotenv/config";
import server from "./app.js";

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
