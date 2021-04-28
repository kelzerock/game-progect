(() => {
  const cnv = document.querySelector(`.canvas-under`);
  const ctx = cnv.getContext(`2d`);
  document.querySelector('body').style.overflow = 'hidden'
  function init() {
    cnv.width  = innerWidth;
    cnv.height = innerHeight;
  }
  init();

  const numberOfRings     = 3;
  const ringRadiusOffset  = 7;
  const ringRadius        = innerWidth / 4;
  const waveOffset        = 15;
  const colors            = [`#771111`, `#bb1111`, `#ff1111`];
  let startAngle          = 0;

  function updateRings() {
    for (let i = 0; i < numberOfRings; i++) {
      let radius = i * ringRadiusOffset + ringRadius;
      let offsetAngle = i * waveOffset * Math.PI / 180;
      drawRing(radius, colors[i], offsetAngle);
    }

    startAngle >= 360? startAngle = 0 : startAngle++;
  }

  let centerX = cnv.width  / 2;
  let centerY = cnv.height / 2;

  const maxWavesAmplitude = 17;
  const numberOfWaves     = 7;

  function drawRing(radius, color, offsetAngle) {
    ctx.strokeStyle = color;
    ctx.lineWidth   = 9;

    ctx.beginPath();
    
    for (let j = -180; j < 180; j++) {
      let currentAngle  = (j + startAngle) * Math.PI / 180;
      let displacement  = 0;
      let now = Math.abs(j);

      if (now > 70) {
        displacement = (now - 70) / 70;
      }

      if (displacement >= 1) {
        displacement = 1;
      }

      let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
      let x = centerX + Math.cos(currentAngle) * waveAmplitude;
      let y = centerY + Math.sin(currentAngle) * waveAmplitude;
      j > -180? ctx.lineTo(x, y) : ctx.moveTo(x, y);

    }
    ctx.closePath();
    ctx.stroke();
  }

  function loop() {
    cnv.width |= 0;
    updateRings();
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener(`resize`, init);

})();

(() => {
 
  const cnv = document.querySelector(`.canvas-over`);
  const ctx = cnv.getContext(`2d`);
  document.querySelector('body').style.overflow = 'hidden'

  function init() {
    cnv.width  = innerWidth;
    cnv.height = innerHeight;
  }
  init();

  const numberOfRings     = 3;
  const ringRadiusOffset  = innerWidth / 43;
  const ringRadius        = innerWidth / 3;
  const waveOffset        = 120;
  const colors            = [`#77111140`, `#bb111140`, `#ff111140`];
  let startAngle          = 180;

  function updateRings() {
    for (let i = 0; i < numberOfRings; i++) {
      let radius = i * ringRadiusOffset + ringRadius;
      let offsetAngle = i * waveOffset * Math.PI / 180;
      drawRing(radius, colors[i], offsetAngle);
    }

    startAngle >= 360? startAngle = 0 : startAngle++;
  }

  let centerX = cnv.width  / 2;
  let centerY = cnv.height / 2;

  const maxWavesAmplitude = 17;
  const numberOfWaves     = 7;

  function drawRing(radius, color, offsetAngle) {
    ctx.strokeStyle = color;
    ctx.lineWidth   = innerWidth/50;

    ctx.beginPath();
    
    for (let j = -180; j < 180; j++) {
      let currentAngle  = (j + startAngle) * Math.PI / 180;
      let displacement  = 0;
      let now = Math.abs(j);

      if (now > 70) {
        displacement = (now - 70) / 70;
      }

      if (displacement >= 1) {
        displacement = 1;
      }

      let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
      let x = centerX + Math.cos(currentAngle) * waveAmplitude;
      let y = centerY + Math.sin(currentAngle) * waveAmplitude;
      j > -180? ctx.lineTo(x, y) : ctx.moveTo(x, y);

    }
    ctx.closePath();
    ctx.stroke();
  }

  function loop() {
    cnv.width |= 0;
    updateRings();
    requestAnimationFrame(loop);
  }
  loop();

  window.addEventListener(`resize`, init);

})();


  document.addEventListener('mousemove', function(){
    document.getElementById("my_audio").play();
  })


  document.getElementById("my_audio").addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
    }, false);

  document.querySelector('.start button').addEventListener('click', function(){
    let audio = new Audio()
    audio.src = 'sound/button-sound.mp3'
    audio.play();
    setTimeout(() => {
      let audio = new Audio()
      audio.src = 'sound/close-screen.mp3'
      audio.play();
    }, 1000);
    document.querySelector('.start h1').style.cssText = 'opacity: 0'
    document.querySelector('.start button').style.cssText = 'opacity: 0'
    
    let startDiv = document.querySelector('.start')
    startDiv.classList.remove('start'); 
    startDiv.classList.add('start-end'); 
    setTimeout(() => {
      startDiv.style.cssText =  'width: 0; margin-left: 50%'
    }, 1000);
    setTimeout(() => {
      startDiv.style.display = 'none'
    }, 2000);




    const canvas = document.getElementById("game");
    canvas.style.cssText = "z-index: 3";
    const ctx = canvas.getContext("2d");
    
    const ground = new Image();
    ground.src = "images/ground.png";
    
    const foodImg = new Image();
    foodImg.src = "images/food.png";
    
    let box = 32;
    
    let score = 0;
    
    let food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
    
    let snake = [];
    snake[0] = {
      x: 9 * box,
      y: 10 * box
    };
    
    document.addEventListener("keydown", direction);
    
    let dir;
    
    function direction(event) {
      if(event.keyCode == 37 && dir != "right")
        dir = "left";
      else if(event.keyCode == 38 && dir != "down")
        dir = "up";
      else if(event.keyCode == 39 && dir != "left")
        dir = "right";
      else if(event.keyCode == 40 && dir != "up")
        dir = "down";
    }
    
    function eatTail(head, arr) {
      for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
          clearInterval(game);
      }
    }
    
    function drawGame() {
      ctx.drawImage(ground, 0, 0);
    
      ctx.drawImage(foodImg, food.x, food.y);
    
      for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }
    
      ctx.fillStyle = "white";
      ctx.font = "50px Arial";
      ctx.fillText(score, box * 2.5, box * 1.7);
    
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;
    
      if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
          x: Math.floor((Math.random() * 17 + 1)) * box,
          y: Math.floor((Math.random() * 15 + 3)) * box,
        };
      } else
        snake.pop();
    
      if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17)
        clearInterval(game);
    
      if(dir == "left") snakeX -= box;
      if(dir == "right") snakeX += box;
      if(dir == "up") snakeY -= box;
      if(dir == "down") snakeY += box;
    
      let newHead = {
        x: snakeX,
        y: snakeY
      };
    
      eatTail(newHead, snake);
    
      snake.unshift(newHead);
    }
    
    let game = setInterval(drawGame, 300);






  })


