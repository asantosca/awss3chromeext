const pre = '<a href="https://s3.console.aws.amazon.com/s3/home?region=us-east-1&prefix=';
const post = '&showversions=false">'

var s3s = [];
var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) { // 3 is text
            var text = node.nodeValue;
            var match = text.match(/(((s3\:\/\/))(\S+))/gi);
            if (Boolean(match)) {
                while(match.length) {
                    // add the s3:// found here to the final loop
                    s3s.push(match.shift());
                } 
            }
        }
    }
}

console.log("here");

// replace in the body of the document
if (Boolean(s3s)) {
    // for each of these parts that match s3://*
    for (var k = 0; k < s3s.length; k ++) {

        // remove the "s3://"
        var strNoS3 = s3s[k].replace('s3://','');
        var repl = pre + strNoS3 + post + s3s[k] + "</a>";

        document.body.innerHTML = document.body.innerHTML.replace(s3s[k], repl);
    }
}
