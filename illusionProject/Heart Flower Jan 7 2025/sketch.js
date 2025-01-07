// ハート形状を描画する関数
function drawHeart(x, y, size) {
  fill(255, 0, 0); // 赤色で塗りつぶし
  noStroke(); // 枠線なし
  beginShape(); // 頂点の定義を開始

  for (let t = 0; t < TWO_PI; t += 0.1) { // 角度を0から2πまでループ
    // ハートの数式
    let xHeart = 16 * pow(sin(t), 3) * size * 0.05; 
    let yHeart = -(13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)) * size * 0.05; 
    vertex(x + xHeart, y + yHeart); // 頂点を設定
  }

  endShape(CLOSE); // 図形を閉じる
}

function setup() {
  createCanvas(400, 400); // キャンバスを400x400ピクセルで作成
  background(255); // 背景を白色に設定

  let centerX = width / 2; // キャンバスの中心X座標
  let centerY = height / 2; // キャンバスの中心Y座標
  let numCircles = 20; // 同心円の数
  let numHeartsPerCircle = 30; // 各同心円上に配置するハートの数
  let angleOffsetPerCircle = radians(5); // 各円ごとに角度をずらす量（ここで各同心円の角度を変更）

  let minSpacing = 1; // 最小の間隔
  let maxSpacing = 250; // 最大の間隔
  let exponent = 2; // 指数関数の指数部分を設定

  for (let j = 0; j < numCircles; j++) { // 各同心円について処理
    // 半径を指数関数的に設定（外側に行くほど間隔が広くなる）
    let radius = minSpacing + (maxSpacing - minSpacing) * pow(j / (numCircles - 1), exponent);
    
    let heartSize = map(pow(j, 2.5), 0, pow(numCircles - 1, 2.2), 0.5, 9); 
    // ハートのサイズを計算（小さい円ほど小さく）

    let baseAngleOffset = j * angleOffsetPerCircle; // 円ごとの角度ずらしを設定

    for (let i = 0; i < numHeartsPerCircle; i++) { // 同心円上の各ハートについて処理
      let angle = map(i, 0, numHeartsPerCircle, 0, TWO_PI) + baseAngleOffset; 
      // ハートの配置角度を計算（同心円上に均等配置しつつ、角度をずらす）

      let x = centerX + radius * cos(angle); // ハートのX座標を計算
      let y = centerY + radius * sin(angle); // ハートのY座標を計算

      // ハートの尖った部分を中心方向に向ける
      let heartAngle = angle + HALF_PI;

      push(); // 座標系を保存
      translate(x, y); // ハートの尖った部分を螺旋上の位置に移動
      rotate(heartAngle); // ハートを中心方向に向くよう回転
      drawHeart(0, 0, heartSize); // ハートを描画
      pop(); // 座標系を元に戻す
    }
  }
}
