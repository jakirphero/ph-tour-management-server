import { Server } from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_KEY);
        console.log("connect to DB");
        server = app.listen(envVars.PORT, () => {
            console.log(`server is listen on port ${envVars.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();

//if error stop the server
process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection detected... server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
});
process.on("uncaughtException", (err) => {
    console.log("uncaught exception detected... server shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
});

process.on("SIGTERM", () => {
    console.log("Sigterm signal... server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
});

process.on("SIGINT", () => {
    console.log("SIGINT signal recieved... server shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
});

//---------------unhandleRejection----error

// Promise.reject(new Error("i forget to catch this promise"))

//-----------------uncaught exception error
// throw new Error("i forget to handle this local error")