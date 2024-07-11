const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json"); // Import generated spec

const app = express();

// Serve the Swagger UI at a specific route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //so in search bar type: localhost:3000/api-docs

// Other routes and middleware
// app.use("/api", apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
