console.log("index.ts");
const rootDiv = document.getElementById("root") as HTMLDivElement;


const image_selecttor = document.createElement("input");
const canvas = document.createElement("canvas");

image_selecttor.type = "file";
image_selecttor.accept = "image/*";

canvas.width = 200;
canvas.height = 200;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
ctx.fillStyle = "red";
ctx.fillRect(0, 0, 200, 200);
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 100, 100);
ctx.fillStyle = "green";
ctx.fillRect(100, 100, 100, 100);


const addNoiseBtn = document.createElement("button");
addNoiseBtn.innerText = "Add Noise";
addNoiseBtn.onclick = () => {
    const noiseCanvas = document.createElement("canvas");
    noiseCanvas.width = canvas.width;
    noiseCanvas.height = canvas.height;
    const noiseCtx = noiseCanvas.getContext("2d") as CanvasRenderingContext2D;
    noiseCtx.clearRect(0, 0, noiseCanvas.width, noiseCanvas.height);
    const imageData = noiseCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = 10;
    }
    noiseCtx.putImageData(imageData, 0, 0);
    ctx.save();
    // ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(noiseCanvas, 0, 0, canvas.width, canvas.height);
    ctx.restore();
}

const jpgCompressBtn = document.createElement("button");
jpgCompressBtn.innerText = "JPG Compress";
jpgCompressBtn.onclick = () => {
    const tmpImg = document.createElement("img");
    tmpImg.src = canvas.toDataURL("image/jpeg", 0.1);
    tmpImg.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tmpImg, 0, 0, canvas.width, canvas.height);
    }
}

image_selecttor.onchange = async (e) => {
    if (!e.target) {
        return;
    }
    const target = e.target as HTMLInputElement;
    if (!target.files) {
        return;
    }
    const file = target.files[0] as File;
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    const loaded_image = await new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => {
            resolve(img);
        }
    }
    );
    canvas.width = loaded_image.width;
    canvas.height = loaded_image.height;
    ctx.drawImage(loaded_image, 0, 0, loaded_image.width, loaded_image.height);
}

function resetCanvas() {
    canvas.style.width = "400px";
    canvas.width = 200;
    canvas.height = 200;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = "green";
    ctx.fillRect(100, 100, 100, 100);
}

function resetRoot() {
    while (rootDiv.firstChild) {
        rootDiv.removeChild(rootDiv.firstChild);
    }
    rootDiv.appendChild(document.createElement("br"));
    rootDiv.appendChild(image_selecttor);
    rootDiv.appendChild(document.createElement("br"));
    rootDiv.appendChild(addNoiseBtn);
    rootDiv.appendChild(jpgCompressBtn)
    rootDiv.appendChild(document.createElement("br"));
    rootDiv.appendChild(canvas);
    resetCanvas();
}

async function onImageSelect(e: Event) {
    if (!e.target) {
        return;
    }
    const target = e.target as HTMLInputElement;
    if (!target.files) {
        return;
    }
    const file = target.files[0] as File;
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        ctx.drawImage(img, 0, 0, 200, 200);
    }
}

async function main() {

    
    
    // rootDiv.appendChild(document.createElement("br"));
    // rootDiv.appendChild(canvas);
    resetRoot();




}
main().then(() => console.log("main done"));
