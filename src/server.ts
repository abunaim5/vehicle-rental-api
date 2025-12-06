import app from "./app"
import config from "./config"

const port = config.port;

app.listen(port, () => {
  console.log(`Vehicle rental server listening on port ${port}`);
});
