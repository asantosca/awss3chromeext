const prefix = '<a href="https://s3.console.aws.amazon.com/s3/object/';
const awsregion = '?region=us-east-1&prefix=';
const suffix = '&showversions=false">'

var elements = document.getElementsByTagName('*');

var s3match = [];
var s3repl = [];

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) { // text type
            var text = node.nodeValue;
            var match = text.match(/(s3\:\/\/)(.*[a-z0-9]\.)*[a-z0-9]*/gi);
            if (match) {
                for (var k = 0; k < match.length; k++) {
                    // remove the "s3://"
                    var strNoS3 = match[k].replace('s3://','');
                    // get bucket name
                    var pieces = strNoS3.replace('/','|').split('|')
                    var repl = prefix + pieces[0] + awsregion + pieces[1] + suffix + match[k] + "</a>";
        
                    found = false;
                    for(var l = 0; l < s3match.length; l++) {
                        if (s3match[l] == match[k]) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        s3match.push(match[k]);
                        s3repl.push(repl);
                    } 
                }
            }
        }
    }
}

var text = document.body.innerHTML;
for (var k = 0; k < s3match.length; k++) {
    // text = text.replace(s3match[k], s3repl[k]);
    text = text.replace(new RegExp(s3match[k], 'g'), s3repl[k]);
}
document.body.innerHTML = text;
