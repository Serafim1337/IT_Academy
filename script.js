function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
  const colors = [
    "",
    "красный",
    "оранжевый",
    "жёлтый",
    "зелёный",
    "голубой",
    "синий",
    "фиолетовый",
  ];

  console.log("цветов: " + colorsCount);

  const used = {};

  for (let i = 1; i <= colorsCount; i++) {
    let n = randomDiap(1, 7);
    let colorName = colors[n];

    while (colorName in used) {
      //если цвет уже использован, в цикле получаем новый случайный цвет и проверяем
      n = randomDiap(1, 7);
      colorName = colors[n];
    }

    used[colorName] = true; //если цвет не был использован, то запоминаем его и выводим
    console.log(colorName);
  }
}

mood(3);
