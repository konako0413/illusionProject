function setup() {
  createCanvas(400, 400); // 400x400ピクセルのキャンバスを作成
  background(255); // キャンバスを白で塗りつぶす
  stroke(0); // 線の色を黒に設定
  noFill(); // 塗りつぶしなしに設定
  
  let centerX = width / 2; // キャンバスの中心X座標
  let centerY = height / 2; // キャンバスの中心Y座標
  let numSpirals = 40; // 螺旋線の本数
  let numCircles = 20; // 同心円の数
  let offset = 50; // はみ出したい距離

// 1-6の範囲での最終半径を計算して保持
let lastRadius1to6 = map(pow(5, 1), 0, pow(5, 1), 1, 10);

for (let j = 0; j < numCircles; j++) {
  let radius;
  let weight;

  if (j < 6) { // 1から6までの円
    radius = map(pow(j, 1), 0, pow(5, 1), 1, 10); // 半径の増加率を小さく
    weight = map(pow(j, 1), 0, pow(5, 1), 0.1, 0.5); // 線の太さを0.1から0.5に
  } else { // 7から20までの円
    // `1-6`の最後の円の半径に少し足して、重ならないように開始
    radius = map(pow(j, 5), pow(7, 5), pow(numCircles - 1, 5), lastRadius1to6 + 2, width / 2 + offset);
    weight = map(pow(j, 5), pow(7, 5), pow(numCircles - 1, 5), 0.2, 9); // 線の太さを0.8から9に
  }

  strokeWeight(weight);
  ellipse(width / 2, height / 2, radius * 2, radius * 2); // 円を描画
}

  // 等角螺旋を描画
  for (let i = 0; i < numSpirals; i++) {
    let angleOffset = map(i, 0, numSpirals, 0, TWO_PI); // 螺旋線の角度を均等に設定
    let angle = angleOffset; // 現在の角度
    let radius = 10; // 螺旋の開始半径
    let xPrev = centerX; // 前の点のX座標
    let yPrev = centerY; // 前の点のY座標

    for (let r = radius; r < width; r += 5) { // 半径を5ピクセルずつ増加
      // 螺旋の次の点を計算
      let x = centerX + r * cos(-angle); 
      let y = centerY + r * sin(-angle);
      
      strokeWeight(map(r, radius, width, 0.1, 4)); // 半径に応じて線の太さを設定(外側は太く)
      line(xPrev, yPrev, x, y); // 前の点から現在の点まで線を描画

      xPrev = x; // 前の点を更新
      yPrev = y; // 前の点を更新
      angle += radians(45) / numSpirals; // 等間隔で角度を増加
    }
  }
}
