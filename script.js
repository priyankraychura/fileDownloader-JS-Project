const fileInput = document.querySelector('input'),
    downloadBtn = document.querySelector('button');

function fetchFile(url) {
    fetch(url).then((res) => res.blob()).then((file) => {
        // URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement('a');
        // Passing tempUrl as href value of <a> tag
        aTag.href = tempUrl;
        // Passing file last nameand extension as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        // Adding <a> tag inside body
        document.body.append(aTag);
        aTag.click(); // Clicking <a> tag so the file download
        aTag.remove(); // Removing <a> tag once the file downloaded
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = 'Download File';
    }).catch(() => {
        // Catch method will call if any error comes during downloading
        downloadBtn.innerText = 'Download File';
        alert("Failed to download file!");
    })
}

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent from submiting

    downloadBtn.innerText = 'Downloading File...';
    fetchFile(fileInput.value);
});