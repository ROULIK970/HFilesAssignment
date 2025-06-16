import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())


//routes
import userRouter from "./routes/user.routes.js"
import medicalFileRouter from "./routes/medicalFiles.routes.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/files", medicalFileRouter);

export {app}