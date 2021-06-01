var isCharacter = false;
var isBackground = false;

var imgCharacter = null;
var imgBackground = null;

// Upload Character
function loadCharacter() {
    var fileInput = document.getElementById("loadCharacter");
    var canvas = document.getElementById("character");
    imgCharacter = new SimpleImage(fileInput);
    imgCharacter.drawTo(canvas);
    isCharacter = true;
}

// Upload Background
function loadBackground() {
    var fileInput = document.getElementById("loadBackground");
    var canvas = document.getElementById("background");
    imgBackground = new SimpleImage(fileInput);
    imgBackground.drawTo(canvas);
    isBackground = true;
}

// Remove green background and add new background to a new image
function merge() {
    if (!isCharacter || !isBackground) {
        alert("You need to insert both images. Than press 'Merge Images' button!");
    } else {
        var imgResult = document.getElementById("result");

        var resultImage = new SimpleImage(imgCharacter.width, imgCharacter.height);

        for (var pixel of imgCharacter.values()) {
            if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
                var x = pixel.getX();
                var y = pixel.getY();
                var newPixel = imgBackground.getPixel(x, y);
                resultImage.setPixel(x, y, newPixel);
            } else {
                resultImage.setPixel(pixel.getX(), pixel.getY(), pixel);
            }
        }

        resultImage.drawTo(imgResult);
    }
}

// Save Image
async function save(el) {
    var canvas = document.getElementById('result');
    const imageURI = canvas.toDataURL("image/jpg");
    el.href = imageURI;
};