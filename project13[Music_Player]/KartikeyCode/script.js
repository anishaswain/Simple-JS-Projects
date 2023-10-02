// Get DOM elements
const fileInput = document.getElementById('fileInput');
const submitBtn = document.getElementById('submit');
const audio = document.getElementById('audioPlayer');

function OnButtonClick(){
    const selectedFile = fileInput.files[0];
    const audioURL = URL.createObjectURL(selectedFile);
    audio.src=audioURL;
}

