const fs = require("fs");

// Read demo.txt and demo1.txt and write to result.txt
fs.readFile("../demo.txt", "utf-8", function(err, data1) {
    if (err) return console.log(err);

    fs.readFile("../demo1.txt", "utf-8", function(err, data2) {
        if (err) return console.log(err);

        const result = data1+"\n"+ data2.trim;

        fs.writeFile("./result.txt", result, function(err) {
            if (err) return console.log(err);
            console.log("done");
        });
    });
});
