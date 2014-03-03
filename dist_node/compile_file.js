/*
 * THIS FILE IS AUTO GENERATED from 'lib/compile_file.kep'
 * DO NOT EDIT
*/
"use strict";
var path = require("path"),
    fs = require("fs"),
    __o = require("./compile"),
    compile = __o["compile"],
    compileFile, KHEPRI_EXT = /^\.kep$/i;
(compileFile = (function(inFile, outFile, header, options, ok, error) {
    return fs.realpath(inFile, (function(err, resolvedPath) {
        if (err) throw err;
        if (fs.lstatSync(resolvedPath)
            .isDirectory()) return fs.readdir(resolvedPath, (function(err, files) {
            files.forEach((function(file) {
                var subPath = path.join(inFile, file);
                if (fs.lstatSync(subPath)
                    .isDirectory()) {
                    return compileFile(subPath, (outFile && path.join(outFile, file)),
                        header, options, ok, error);
                }
                if (path.extname(file)
                    .match(KHEPRI_EXT)) return compileFile(subPath, (outFile && path.join(
                        outFile, (path.basename(file, ".kep") + ".js"))), header,
                    options, ok, error);
            }));
        }));
        fs.readFile(resolvedPath, "utf8", (function(err, data) {
            if (err) throw err;
            if (outFile) process.stdout.write((((("Khepri'" + inFile) + "' to:'") + outFile) +
                "'"));
            compile(data, header, options, (function(data) {
                return ok(data, inFile, outFile);
            }), (function(data) {
                return error(data, inFile, outFile);
            }));
        }));
    }));
}));
(exports.compileFile = compileFile);