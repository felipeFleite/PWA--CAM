if('serviceWorker' in navigator){
    window.addEventListener('load', async () => {
        try{
            let reg
            reg = await navigator.serviceWorker.register('/sw.js', {type:"module"})

            console.log('Service WOrker Registrada', reg)
        }catch (err){
            console.log('Service WOrker falhou', err)
        }
    })
}



// capturando os elementos em tela
const cameraView = document.querySelector("#camera--view");
const cameraOutput = document.querySelector("#camera--output");
const cameraSensor = document.querySelector("#camera--sensor");
let cameraInvert = document.querySelector("#camera--invert");
cameraInvert = true
const cameraTrigger = document.querySelector("#camera--trigger");

var constraints = { video: { facingMode: "user" }, audio: false };

cameraInvert.onclick = function () {
if(cameraInvert == true){
cameraInvert = false
var constraints = { video: { facingMode: "enviroment" }, audio: false };
}else{
    cameraInvert = true
    var constraints = { video: { facingMode: "enviroment" }, audio: false }
}
}


// Estabelecendo o acesso a câmera e inicializando a visualização
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            let track = stream.getTracks()[0];
            cameraView.srcObject = stream
        })
        .catch(function (error) {
            console.error("Ocorreu um Erro.", error);
        });
}

// Função para tirar foto
cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

// carrega imagem de câmera quando a janela carregar
window.addEventListener("load", cameraStart, false);
