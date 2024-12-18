const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/routes/auth")

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.use("/api/auth", require("./routes/routes/auth"));
app.use("/api/register", require("./routes/Route/registration"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(dotenv.config());
app.use("/api/admin", require("./config/routes/admin"));
