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


window.onload = function() {
  document.getElementById("my_audio").currentTime = 0;
  document.getElementById("my_audio").play();
}
// audio.addEventListener('ended', function() {
//   this.currentTime = 0;
//   this.play();
//   }, false);


// document.addEventListener('DOMContentLoaded', function() {
//   let audio = document.querySelector('audio');
//   console.log(audio)
//   audio.currentTime = 0;
//   audio.play();
//   audio.addEventListener('ended', function() {
//     this.currentTime = 0;
//     this.play();
//     }, false);
// })