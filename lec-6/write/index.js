const fs = require("fs");
fs.writeFile("../demo.txt","hello g27", function(err,data){
    if(err) return console.log(err); 
    console.log("success!!")
})


fs.writeFile("../demo1.txt","hello upasana", function(err,data){
    if(err) return console.log(err); 
    console.log("success 1!!")
})

fs.readFile("../demo.txt", "utf8", function (err, data1) {
    if (err) return console.log(err);

    fs.readFile("../demo1.txt", "utf8", function (err, data2) {
        if (err) return console.log(err);

        const mergedData = data1 + data2;

        fs.writeFile("../file1+2.txt", mergedData, function (err) {
            if (err) return console.log(err);
            console.log("data merged");
        });
    });
});
