const pre = '<a href="https://s3.console.aws.amazon.com/s3/object/';
const region = '?region=us-east-1&prefix=';
const post = '&showversions=false">'

var s3s = [];

// if this page has elements
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
                    // add the arrays that match "s3://*" to the final array
                    s3s.push(match.shift());
                } 
            }
        }
    }
}

// if the page is only source
if (elements.length == 0) {
    // read the page as source and parse it
    s3s = document.body.innerHTML.match(/(((s3\:\/\/))(\S+))/gi);
}

// replace in the body of the document
if (Boolean(s3s)) {

    // for each of these parts that match s3://*
    for (var k = 0; k < s3s.length; k ++) {

        // remove the "s3://"
        var strNoS3 = s3s[k].replace('s3://','');
        // get bucket name
        var pieces = strNoS3.replace('/','|').split('|')
        var repl = pre + pieces[0] + region + pieces[1] + post + s3s[k] + "</a>";

        // add the to the document as a link
        document.body.innerHTML = document.body.innerHTML.replace(s3s[k], repl);
    }
}
