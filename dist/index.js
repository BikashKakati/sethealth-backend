"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const db_1 = __importDefault(require("./db"));
const express = require("express");
const app = express();
const port = config_1.serverPort;
console.log(config_1.mongodbUrl);
(0, db_1.default)(config_1.mongodbUrl);
app.get("/", (req, res) => {
    res.send("");
});
app.listen(port, () => {
    console.log(`server started on ${port}`);
});
