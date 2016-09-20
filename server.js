var express = require("express"),
    app = express(),
    multer = require("multer"),
    storage = multer.memoryStorage(),    // file is stored in buffer rather
    upload = multer({storage: storage}); // than populated on disk

app.use(express.static(__dirname + "/views"));

app.post("/", upload.single("upload"), function(req, res) {
    if (req.file) {
	var output = {
	    size: req.file.size,
	    name: req.file.originalname
	};
    } else {
	var output = {
	    error: "No file submitted"
	};
    }
    res.json(output);
    res.end();
});

app.listen(process.env.PORT || 80);
