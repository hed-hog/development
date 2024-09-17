"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDirectory = validateDirectory;
const fs_1 = require("fs");
const path_1 = require("path");
function validateDirectory(dirPath) {
    if ((0, fs_1.existsSync)(dirPath)) {
        return true;
    }
    const parentDir = (0, path_1.dirname)(dirPath);
    (0, fs_1.mkdirSync)(dirPath, { recursive: true });
    if ((0, fs_1.existsSync)(parentDir)) {
        return true;
    }
    else {
        return false;
    }
}
