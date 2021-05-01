'use strict';
// rings
(() => {
  cnv1()
  cnv2()
  window.addEventListener('resize',function refresh(){
    cnv1();
    cnv2();
  },false)
  function cnv1(){
  const cnv = document.querySelector(`.canvas-under`);
  const ctx = cnv.getContext(`2d`);
  document.querySelector('body').style.overflow = 'hidden'
  function init() {
    cnv.width  = innerWidth;
    cnv.height = innerHeight;
  }
  init();
  document.querySelector('.btn-start').style.marginTop = `${innerHeight/2.5}px`

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
  }
  function cnv2(){

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
  }
  })();

// sound on button
document.querySelector('body').addEventListener('click', function (e){
  if(e.target.classList.contains('btn')){
      let audio = new Audio()
  audio.src = 'sound/button-sound.mp3'
  audio.play();
  }
}, false)




  function playGame(){
    let arrBtn = document.querySelectorAll('.btn');
    for(let i = 0; i<arrBtn.length;i++){
      arrBtn[i].style.cssText = 'opacity: 0; display: none';
    }
    let startDiv = document.querySelector('.start')
    startDiv.classList.remove('start'); 
    startDiv.classList.add('start-end');
    let heightDiv = innerHeight/2 ;
    startDiv.style.marginTop = `${heightDiv}px`
    setTimeout(() => {
      let div = document.querySelector('.start-end');
      div.style.width = "0"
      div.style.marginLeft = "50%"
      div.style.marginTop =  heightDiv + 'px';
    },1000);
    setTimeout(() => {
      startDiv.style.display = 'none'
    }, 2000);
    
    setTimeout(() => {
    let max;
    if(innerHeight> innerWidth){
      max =innerWidth - innerWidth*0.2;
    } else {
      max = innerHeight -innerHeight*0.2;
    }  
    let field = document.createElement('div');
    document.body.appendChild(field);
    field.classList.add('field')
    field.style.cssText = `
    position: absolute; 
    top: calc( 50% - ${max}px/2); 
    left: calc( 50% - ${max}px/2 );
    box-sizing: border-box;
    width: ${max}px; 
    height: ${max}px; 
    justify-content: space-between;
    margin: 0 auto;
    display: flex; 
    flex-wrap: wrap; 
    z-index: 3`

    for(let i = 1;i<=100; i++){
      let excel = document.createElement('div');
      field.appendChild(excel)
      excel.classList.add('excel')
      excel.style.cssText = `  
      box-sizing: border-box;
      background-color: rgba(173, 98, 98, 0.90);
      width: ${Math.floor(max/10 - max/100)}px;
      height: ${Math.floor(max/10 - max/100)}px;
      margin:  ${Math.floor(max/200)}px;
      padding: 5px;
      border: solid rgba(24, 4, 4, 0) 1px;
      z-index: 3;`
    }
    let excel = document.querySelectorAll('.excel')
    let x = 1,
        y = 10;

      for(let i = 0; i<excel.length; i++){
        if(x>10){
          x =1;
          y--;
        }
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        x++;
      }
    function startSnake(){
      let posX = Math.round(Math.random()*(10-3)+3)
      let posY = Math.round(Math.random()*(10-1)+1)
      return [posX, posY]
    }
    
    let coordinate = startSnake();
    let snakeBody = [document.querySelector('[posX = "' + coordinate[0] + '"][posY ="'+ coordinate[1]+'"]'),document.querySelector('[posX = "' + (coordinate[0]-1) + '"][posY ="'+ coordinate[1]+'"]'),
    document.querySelector('[posX = "' + (coordinate[0]-2) + '"][posY ="'+ coordinate[1]+'"]'),];
    for (let i = 0; i <snakeBody.length; i++){
      snakeBody[i].classList.add('snakeBody')
    }
    snakeBody[0].classList.add('snakeHead');

    let evil 

    function creatEvil(){
      function startEvil(){
        let posX = Math.floor(Math.random()*(10-1)+1)
        let posY = Math.floor(Math.random()*(10-1)+1)
        return [posX, posY]
      }

      let evilCoordinate = startEvil();
      evil = document.querySelector('[posX = "' + evilCoordinate[0] + '"][posY ="'+ evilCoordinate[1]+'"]')
        while(evil.classList.contains('snakeBody') || evil.classList.contains('snakeHead')
        || evil.classList.contains('evil')){
        let evilCoordinate = startEvil();
        evil = document.querySelector('[posX = "' + evilCoordinate[0] + '"][posY ="'+ evilCoordinate[1]+'"]')
      }
      evil.classList.add('evil');
      // console.log(evil)
    }
    creatEvil()
    let direction = "right";
    let steps = false;
    let input = document.createElement('input');
    document.body.appendChild(input)
    input.classList.add('input-score');
    input.setAttribute('readonly', true)


    let score = 0;
    input.value = `Your score: ${score}`
    function move() {
      let snakeCoordinate = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
      snakeBody[0].classList.remove('snakeHead');
      snakeBody[snakeBody.length-1].classList.remove('snakeBody');
      snakeBody.pop();

      if(direction == 'right'){
        if(snakeCoordinate[0]< 10) {
        snakeBody.unshift(document.querySelector('[posX = "' + 
        (+snakeCoordinate[0]+1) + '"][posY ="'+ snakeCoordinate[1]+'"]'));
          } else {
        snakeBody.unshift(document.querySelector('[posX = "1"][posY ="'+ 
        snakeCoordinate[1]+'"]'));
        }
      } else if (direction == 'left'){
        if(snakeCoordinate[0]> 1) {
          snakeBody.unshift(document.querySelector('[posX = "' + 
          (+snakeCoordinate[0]-1) + '"][posY ="'+ snakeCoordinate[1]+'"]'));
        }else {
          snakeBody.unshift(document.querySelector('[posX = "10"][posY ="'+ 
          snakeCoordinate[1]+'"]'));
        }
      } else if (direction == 'up'){
        if(snakeCoordinate[1]< 10) {
          snakeBody.unshift(document.querySelector('[posX = "' +
          snakeCoordinate[0] + '"][posY ="'+ (+ snakeCoordinate[1] +1)+'"]'));
        }else {
          snakeBody.unshift(document.querySelector('[posX = "'+ 
          snakeCoordinate[0]+'"][posY ="1"]'));
        }
      }else if (direction == 'down'){
        if(snakeCoordinate[1]> 1) {
          snakeBody.unshift(document.querySelector('[posX = "' + 
          snakeCoordinate[0] + '"][posY ="'+ (+ snakeCoordinate[1] -1)+'"]'));
        }else {
          snakeBody.unshift(document.querySelector('[posX = "'+ 
          snakeCoordinate[0]+'"][posY ="10"]'));
        }
      }


       if(snakeBody[0].classList.contains('evil')){
         snakeBody[0].classList.add('doomKill');
         setTimeout(()=>{
           for(let i=0; i<snakeBody.length; i++){
             snakeBody[i].classList.remove('doomKill')
           }
         }, 299)
        let audioShot = new Audio()
        audioShot.src = 'sound/gun-shot.mp3'
        audioShot.play();
        setTimeout(()=>{
          let audioReload = new Audio()
          audioReload.src = 'sound/gun-reload.mp3'
          audioReload.play();
        },500)
        evil.classList.remove('evil');
        let a = snakeBody[snakeBody.length-1].getAttribute('posX');
        let b = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "'+ a + '"][posY = "'+ b + '"]'));
        creatEvil();
        score++;
        input.value = `Your score: ${score}`
      } 

      
          
      if(snakeBody[0].classList.contains('snakeBody')){
        setTimeout(()=> {
          let audioDied = new Audio()
          audioDied.src = 'sound/died.mp3'
          audioDied.play();
          document.querySelector('.parent').style.zIndex = '7';
          document.querySelector('video').classList.add('video-start');
          let videoHeight = document.querySelector('video').style.height;
          // document.querySelector('video').style.top = `calc( 50% - (${parseInt(videoHeight)}/ 2 +'px') )`;
          console.log(document.querySelector('video').style.top)
          // document.querySelector('.btn-start').style.marginTop = `${innerHeight/2.5}px`
          document.querySelector('video').play();
        }, 200)
        
        clearInterval(interval)
        snakeBody[0].style.background = 'url("images/doom-died.png") center no-repeat'
        snakeBody[0].style.backgroundSize = 'cover'
        setTimeout(()=>{
          setTimeout(()=>{document.querySelector('.parent').style.zIndex = '1';},2000)
          document.querySelector('video').classList.remove('video-start');
          startDiv.classList.remove('start-end')
          startDiv.style.cssText = '';
          startDiv.classList.add('start')

          arrBtn = document.querySelectorAll('.btn');
          for(let i = 0; i<arrBtn.length;i++){
            arrBtn[i].classList.remove('btn');
            arrBtn[i].style.cssText = '';
            arrBtn[i].classList.add('btn')
          }
          document.querySelector('.btn-start').style.marginTop = `${innerHeight/2.5}px`
          field.remove()
        },11200)

 
      }

      snakeBody[0].classList.add('snakeHead');
      for (let i = 0; i <snakeBody.length; i++){
        snakeBody[i].classList.add('snakeBody')
      }
      steps = true;
    }
    let interval = setInterval(move, 300);

    window.addEventListener('keydown', function (e) {
      if(steps == true){
         if(e.keyCode == 37 && direction !== 'right'){
        direction = 'left';
        steps = false;
      }
      if(e.keyCode == 38 && direction !== 'down'){
        direction = 'up';
        steps = false;
      }
      if(e.keyCode == 39 && direction !== 'left'){
        direction = 'right';
        steps = false;
      }
      if(e.keyCode == 40 && direction !== 'up'){
        direction = 'down';
        steps = false;
      }
      }
    })
   }, 2000)

  }


  document.addEventListener('mousemove', function(){
    document.getElementById("my_audio").play();
  })
  document.getElementById("my_audio").addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
    }, false);

  document.querySelector('.start button').addEventListener('click', playGame
  )


