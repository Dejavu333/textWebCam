// String of characters to use for the ascii image
const density = "       .,;|/efkco0#_";

// Declare global variables for the video and asciiDiv elements
let video;
let asciiDiv;

function setup() {
  // Prevent canvas from being created
  noCanvas();

  // Create the video element
  video = createCapture(VIDEO);
  // Set the size of the video element
  video.size(100, 60);
  // Hide the video element
  video.hide();
  // Create the asciiDiv element
  asciiDiv = createDiv();
  // Set the style of the asciiDiv element make it center
  asciiDiv.style("text-align", "center");
  // Set the style of the asciiDiv element to monospace
  asciiDiv.style("font-family", "monospace");
  // Set the style of the asciiDiv element to white
  asciiDiv.style("color", "#00ff00");
  // Mirror the asciiDiv element
  asciiDiv.style("-webkit-transform", "scaleX(-1)");
}

function draw() {
  // Load the video pixels
  video.loadPixels();
  // Create an empty string to store the ascii image
  let asciiImage = "";
  // Loop through the video's height
  for (let j = 0; j < video.height; j++) {
    // Loop through the video's width
    for (let i = 0; i < video.width; i++) {
      // Calculate the pixel index
      const pixelIndex = (i + j * video.width) * 4;
      // Get the red, green, and blue values of the pixel
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      // Calculate the average of the red, green, and blue values
      const avg = (r + g + b) / 3;
      // Get the length of the density string
      const len = density.length;
      // Map the average value to a character index in the density string
      const charIndex = floor(map(avg, 0, 255, 0, len));
      // Get the character at the calculated index in the density string
      const c = density.charAt(charIndex);
      // Add the character to the ascii image string, with a non-breaking space if the character is a space
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    // Add a line break to the ascii image string
    asciiImage += "<br>";
  }
  // Set the html of the asciiDiv element to the ascii image string
  asciiDiv.html(asciiImage); 
}

