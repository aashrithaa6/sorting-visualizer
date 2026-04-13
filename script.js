let arr = [];
let steps = [];
let currentStep = 0;

function generateArray() {
  arr = [];
  steps = [];
  currentStep = 0;

  for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100) + 10);
  }
  drawArray(arr);
}

function drawArray(array) {
  const container = document.getElementById("array");
  container.innerHTML = "";

  array.forEach(val => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = val * 2 + "px";
    container.appendChild(bar);
  });
}

// Save steps
function saveStep(a) {
  steps.push([...a]);
}

// Bubble Sort
function bubbleSort(a) {
  let arr = [...a];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        saveStep(arr);
      }
    }
  }
}

// Selection Sort
function selectionSort(a) {
  let arr = [...a];
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    saveStep(arr);
  }
}

// Insertion Sort
function insertionSort(a) {
  let arr = [...a];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      saveStep(arr);
    }
    arr[j + 1] = key;
    saveStep(arr);
  }
}

function startSort(type) {
  steps = [];
  currentStep = 0;

  if (type === "bubble") bubbleSort(arr);
  if (type === "selection") selectionSort(arr);
  if (type === "insertion") insertionSort(arr);

  animate();
}

// Animation
function animate() {
  if (currentStep >= steps.length) return;

  drawArray(steps[currentStep]);
  currentStep++;

  let speed = document.getElementById("speed").value;
  setTimeout(animate, speed);
}

// Step controls
function nextStep() {
  if (currentStep < steps.length) {
    drawArray(steps[currentStep]);
    currentStep++;
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    drawArray(steps[currentStep]);
  }
}

// Init
generateArray();
