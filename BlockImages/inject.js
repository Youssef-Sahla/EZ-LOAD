function setAttributes(attributeName, attributeValue, file) {
    //Specify which nodes you want in a variable.
    //When search with xpath on the src attribute, the src will be what it orignally was which can be a relative path to page which its displayed in.
    //Which is why I just search for the filename, we do another check later. 
    var Xpath = "//*[contains(@src,'" + file + "')]";
    //Get all nodes from document with the src attribute, this way it filters threw the HTML for images.
    //Specify the document node at which the document should be evaluated.
    //Specifiy namespaceresolver, use Null for HTML documents.
    //Snapshot nodes do not change with documentation mutations, like blocking the pictures for example.
    //Create new Xpath object by specifiying null.
    alltags = document.evaluate(Xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //
    //Loop through all nodes(snapshots).
    for (i = 0; i < alltags.snapshotLength; i++) {
        //Check if snapshotItem has the same srcURL as the clicked Image.
        if (alltags.snapshotItem(i)
                .src == srcUrl) {
            //The snapshots src will be the rendered url.
            var img = alltags.snapshotItem(i);
            img.originalSrc = img.src;

            //Check is URL has querystring            
            if (filename.indexOf('?') >= 0) {
                //If true add next to old querystring our own.
                rand = "&imagereloadrand=" + (new Date())
                        .getTime();
            } else {
                //If false add new querystring.
                rand = "?" + (new Date())
                        .getTime();
            }
            //By adding random querystring to the URL, the browser doesnt try to get blocked and converted
            //picture from cache and just reloads the image from original source.
            alltags.snapshotItem(i)
                    .setAttribute(attributeName, attributeValue + rand);
        }
    }
}
//Get filename from source url 
var filename = srcUrl.substring(srcUrl.lastIndexOf("/") + 1, srcUrl.length);
//If location = image clicked set location to image source 
if (document.location == srcUrl)
    document.location = srcUrl;
//Else get image attributes with xPath nodes
else
    setAttributes("src", srcUrl, filename);