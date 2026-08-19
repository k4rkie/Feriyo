import "dotenv/config";
import httpServer from "./app.js";

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
