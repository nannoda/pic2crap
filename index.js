"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/index.ts
  var require_src = __commonJS({
    "src/index.ts"(exports) {
      console.log("index.ts");
      var rootDiv = document.getElementById("root");
      var image_selecttor = document.createElement("input");
      var canvas = document.createElement("canvas");
      image_selecttor.type = "file";
      image_selecttor.accept = "image/*";
      canvas.width = 200;
      canvas.height = 200;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 200, 200);
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, 100, 100);
      ctx.fillStyle = "green";
      ctx.fillRect(100, 100, 100, 100);
      var addNoiseBtn = document.createElement("button");
      addNoiseBtn.innerText = "Add Noise";
      addNoiseBtn.onclick = () => {
        const noiseCanvas = document.createElement("canvas");
        noiseCanvas.width = canvas.width;
        noiseCanvas.height = canvas.height;
        const noiseCtx = noiseCanvas.getContext("2d");
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
        ctx.drawImage(noiseCanvas, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      };
      var jpgCompressBtn = document.createElement("button");
      jpgCompressBtn.innerText = "JPG Compress";
      jpgCompressBtn.onclick = () => {
        const tmpImg = document.createElement("img");
        tmpImg.src = canvas.toDataURL("image/jpeg", 0.1);
        tmpImg.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(tmpImg, 0, 0, canvas.width, canvas.height);
        };
      };
      image_selecttor.onchange = (e) => __async(exports, null, function* () {
        if (!e.target) {
          return;
        }
        const target = e.target;
        if (!target.files) {
          return;
        }
        const file = target.files[0];
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        const loaded_image = yield new Promise(
          (resolve, reject) => {
            img.onload = () => {
              resolve(img);
            };
          }
        );
        canvas.width = loaded_image.width;
        canvas.height = loaded_image.height;
        ctx.drawImage(loaded_image, 0, 0, loaded_image.width, loaded_image.height);
      });
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
        rootDiv.appendChild(jpgCompressBtn);
        rootDiv.appendChild(document.createElement("br"));
        rootDiv.appendChild(canvas);
        resetCanvas();
      }
      function main() {
        return __async(this, null, function* () {
          resetRoot();
        });
      }
      main().then(() => console.log("main done"));
    }
  });
  require_src();
})();
//# sourceMappingURL=index.js.map
