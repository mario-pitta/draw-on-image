console.log('hello!');
var ctx;
var img = document.getElementById('img');
var canvas = document.getElementById('canvas');
canvas.style.border = '1px solid ';
var isDrawing = false;
var imgW = img.style.width;
var imgH = img.style.height;
var coords = { x: '', y: '' };
inputFile = document.getElementById('inputFile');
var sizes = getSizes();
window.addEventListener('resize', (e) => {
  sizes = getSizes();
  console.log('resize')
});
function changeFile(e) {
  if (e) {
    let files = e.target.files;
    file = files[0];

    let filePath = window.URL.createObjectURL(file);
    img.src = filePath;

    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => {
      ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 300, 150);
    }, 80);

    createListeners();
  }
}

function createListeners() {
  canvas.addEventListener('mousedown', (event) => {
    console.log(event);
    isDrawing = true;
    desenharNoCanva(event);
  });
  canvas.addEventListener('mousemove', (event) => {
    // getPosition(event);
    desenharNoCanva(event);
  });
  canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;
    getPosition(event);
  });
  canvas.addEventListener('mouseout', (event) => {
    getPosition(event);
  });
}

function getSizes() {
  var body = document.getElementsByTagName('body').item(0);
  var main = document.getElementsByClassName('main').item(0);
  var h2 = document.getElementsByTagName('h2').item(0);
  var inputDiv = document.getElementsByClassName('inputDiv').item(0);
  var container = document.getElementsByClassName('container').item(0);

  let bodySizes = { x: body.clientWidth, y: body.clientHeight };
  let mainSizes = { x: main.clientWidth, y: main.clientHeight };
  let inputDivSizes = { x: inputDiv.clientWidth, y: inputDiv.clientHeight };
  let containerSizes = { x: container.clientWidth, y: container.clientHeight };
  let h2Sizes = { x: h2.clientWidth, y: h2.clientHeight };

  return (sizes = {
    bodySizes,
    mainSizes,
    inputDivSizes,
    containerSizes,
    h2Sizes,
  });
}

function getPosition(e) {
  sumHeigths = sizes.inputDivSizes.y - sizes.h2Sizes.y;

  coords.x = e.clientX - canvas.offsetLeft;
  coords.y = e.clientY - canvas.offsetTop - sumHeigths;
}

function desenharNoCanva(e) {
  if (isDrawing) {
    getPosition(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.fillRect(coords.x, coords.y, 2, 2);
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.closePath();
    // salvarImage();
  }
}

function salvarImage() {
  console.log(canvas);
  console.log(ctx);
  var base64 = canvas.toDataURL();
  console.log(base64);
  img.src = base64;
}
