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

var constraints = { video: { facingMode: "enviroment" }, audio: false };

// capturando os elementos em tela
const cameraView = document.querySelector("#camera--view");
const cameraOutput = document.querySelector("#camera--output");
const cameraSensor = document.querySelector("#camera--sensor");
const cameraTrigger = document.querySelector("#camera--trigger");

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
