(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'Pong'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Pong'.");
    }root.Pong = factory(typeof Pong === 'undefined' ? {} : Pong, kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Random = Kotlin.kotlin.random.Random;
  var math = Kotlin.kotlin.math;
  var Math_0 = Math;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  function Arena(bat, batBot, ball, width, height, score, scoreBot) {
    this.bat = bat;
    this.batBot = batBot;
    this.ball = ball;
    this.width = width;
    this.height = height;
    this.score = score;
    this.scoreBot = scoreBot;
  }
  Arena.$metadata$ = {kind: Kind_CLASS, simpleName: 'Arena', interfaces: []};
  Arena.prototype.component1 = function () {
    return this.bat;
  };
  Arena.prototype.component2 = function () {
    return this.batBot;
  };
  Arena.prototype.component3 = function () {
    return this.ball;
  };
  Arena.prototype.component4 = function () {
    return this.width;
  };
  Arena.prototype.component5 = function () {
    return this.height;
  };
  Arena.prototype.component6 = function () {
    return this.score;
  };
  Arena.prototype.component7 = function () {
    return this.scoreBot;
  };
  Arena.prototype.copy_7wl0vn$ = function (bat, batBot, ball, width, height, score, scoreBot) {
    return new Arena(bat === void 0 ? this.bat : bat, batBot === void 0 ? this.batBot : batBot, ball === void 0 ? this.ball : ball, width === void 0 ? this.width : width, height === void 0 ? this.height : height, score === void 0 ? this.score : score, scoreBot === void 0 ? this.scoreBot : scoreBot);
  };
  Arena.prototype.toString = function () {
    return 'Arena(bat=' + Kotlin.toString(this.bat) + (', batBot=' + Kotlin.toString(this.batBot)) + (', ball=' + Kotlin.toString(this.ball)) + (', width=' + Kotlin.toString(this.width)) + (', height=' + Kotlin.toString(this.height)) + (', score=' + Kotlin.toString(this.score)) + (', scoreBot=' + Kotlin.toString(this.scoreBot)) + ')';
  };
  Arena.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.bat) | 0;
    result = result * 31 + Kotlin.hashCode(this.batBot) | 0;
    result = result * 31 + Kotlin.hashCode(this.ball) | 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.score) | 0;
    result = result * 31 + Kotlin.hashCode(this.scoreBot) | 0;
    return result;
  };
  Arena.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.bat, other.bat) && Kotlin.equals(this.batBot, other.batBot) && Kotlin.equals(this.ball, other.ball) && Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.score, other.score) && Kotlin.equals(this.scoreBot, other.scoreBot)))));
  };
  function initializeArena(width, height) {
    var ball = new Ball(new Location(width / 2.0, height / 2.0), 5.0, new Velocity(0.0, 0.0));
    var bat = new Bat(new Location(width - 15.0, height / 2.0), 7.0, 80.0);
    var batBot = new Bat(new Location(15.0, ball.center.y), 6.5, 80.0);
    return new Arena(bat, batBot, ball, width, height, 0, 0);
  }
  function getInitialVelocity() {
    var alpha = Random.Default.nextDouble_lu1900$(-math.PI / 5, math.PI / 5);
    var magnitude = 10.0;
    return new Velocity(magnitude * Math_0.cos(alpha), magnitude * Math_0.sin(alpha));
  }
  function doStep(arena, batLocation) {
    var bat = keepBatArenaInBounds(new Bat(batLocation, 6.5, 80.0), arena.height, 6.0);
    var batBot = keepBatArenaInBounds(new Bat(new Location(15.0, arena.ball.center.y), 6.5, 80.0), arena.height, 6.0);
    var ball = moveBall(arena.ball, arena.width, arena.height);
    var startBall = new Ball(new Location(arena.width / 2.0, arena.height / 2.0), ball.radius, new Velocity(0.0, 0.0));
    return new Arena(bat, batBot, isBatHittingBall(ball, bat, batBot) ? deflectBall(arena) : !isBallInHorizontalBounds(ball, arena.width) ? startBall : ball, arena.width, arena.height, isLoss(ball, arena.width) ? arena.score + 1 | 0 : arena.score, isBotLoss(ball, arena.width) ? arena.scoreBot + 1 | 0 : arena.scoreBot);
  }
  function start(arena) {
    return isBallMoving(arena.ball) ? arena : new Arena(arena.bat, arena.batBot, new Ball(arena.ball.center, arena.ball.radius, getInitialVelocity()), arena.width, arena.height, arena.score, arena.scoreBot);
  }
  function Ball(center, radius, velocity) {
    this.center = center;
    this.radius = radius;
    this.velocity = velocity;
  }
  Ball.$metadata$ = {kind: Kind_CLASS, simpleName: 'Ball', interfaces: []};
  Ball.prototype.component1 = function () {
    return this.center;
  };
  Ball.prototype.component2 = function () {
    return this.radius;
  };
  Ball.prototype.component3 = function () {
    return this.velocity;
  };
  Ball.prototype.copy_1ma3mm$ = function (center, radius, velocity) {
    return new Ball(center === void 0 ? this.center : center, radius === void 0 ? this.radius : radius, velocity === void 0 ? this.velocity : velocity);
  };
  Ball.prototype.toString = function () {
    return 'Ball(center=' + Kotlin.toString(this.center) + (', radius=' + Kotlin.toString(this.radius)) + (', velocity=' + Kotlin.toString(this.velocity)) + ')';
  };
  Ball.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.center) | 0;
    result = result * 31 + Kotlin.hashCode(this.radius) | 0;
    result = result * 31 + Kotlin.hashCode(this.velocity) | 0;
    return result;
  };
  Ball.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.center, other.center) && Kotlin.equals(this.radius, other.radius) && Kotlin.equals(this.velocity, other.velocity)))));
  };
  function isBallMoving(ball) {
    return ball.velocity.dx !== 0.0 || ball.velocity.dy !== 0.0;
  }
  function isBallInHorizontalBounds(ball, width) {
    return ball.center.x - ball.radius > 0.0 && ball.center.x + ball.radius < width;
  }
  function isBallInVerticalBounds(ball, height) {
    return ball.center.y - ball.radius >= 7.0 && ball.center.y + ball.radius <= height - 7.0;
  }
  function moveBall(ball, width, height) {
    var newBall = new Ball(add(ball.center, ball.velocity), ball.radius, ball.velocity);
    var tmp$;
    if (!isBallInVerticalBounds(newBall, height)) {
      var tmp$_0;
      if (newBall.velocity.dx < 0) {
        var a = 0.0 + newBall.radius;
        var b = newBall.center.x;
        tmp$_0 = Math_0.max(a, b);
      } else {
        var a_0 = width - newBall.radius;
        var b_0 = newBall.center.x;
        tmp$_0 = Math_0.min(a_0, b_0);
      }
      var tmp$_1;
      if (newBall.velocity.dy < 0) {
        var a_1 = 7.0 + newBall.radius;
        var b_1 = newBall.center.y;
        tmp$_1 = Math_0.max(a_1, b_1);
      } else {
        var a_2 = height - 7.0 - newBall.radius;
        var b_2 = newBall.center.y;
        tmp$_1 = Math_0.min(a_2, b_2);
      }
      tmp$ = new Ball(new Location(tmp$_0, tmp$_1), newBall.radius, new Velocity(newBall.velocity.dx, -newBall.velocity.dy));
    } else
      tmp$ = newBall;
    return tmp$;
  }
  function isLoss(ball, width) {
    return ball.center.x + ball.radius >= width;
  }
  function isBotLoss(ball, width) {
    return ball.center.x + ball.radius <= 0.0;
  }
  function Bat(location, width, height) {
    this.location = location;
    this.width = width;
    this.height = height;
  }
  Bat.$metadata$ = {kind: Kind_CLASS, simpleName: 'Bat', interfaces: []};
  Bat.prototype.component1 = function () {
    return this.location;
  };
  Bat.prototype.component2 = function () {
    return this.width;
  };
  Bat.prototype.component3 = function () {
    return this.height;
  };
  Bat.prototype.copy_w616d5$ = function (location, width, height) {
    return new Bat(location === void 0 ? this.location : location, width === void 0 ? this.width : width, height === void 0 ? this.height : height);
  };
  Bat.prototype.toString = function () {
    return 'Bat(location=' + Kotlin.toString(this.location) + (', width=' + Kotlin.toString(this.width)) + (', height=' + Kotlin.toString(this.height)) + ')';
  };
  Bat.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.location) | 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    return result;
  };
  Bat.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.location, other.location) && Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height)))));
  };
  function getBatLeftEdge(bat) {
    return bat.location.x - bat.width / 2;
  }
  function getBatRightEdge(bat) {
    return bat.location.x + bat.width / 2;
  }
  function isBatWithinBounds(bat, arenaHeight, margin) {
    return bat.location.y - bat.height / 2.0 - margin >= 0.0 && bat.location.y + bat.height / 2.0 + margin <= arenaHeight;
  }
  function placeBatWithinBounds(bat, arenaHeight, margin) {
    return new Bat(new Location(bat.location.x, bat.location.y - bat.height / 2.0 - margin < 0.0 ? bat.height / 2.0 + margin : arenaHeight - bat.height / 2.0 - margin), bat.width, bat.height);
  }
  function keepBatArenaInBounds(bat, arenaHeight, margin) {
    return isBatWithinBounds(bat, arenaHeight, margin) ? bat : placeBatWithinBounds(bat, arenaHeight, margin);
  }
  function isBallWithinBatVerticalBounds(ball, bat) {
    return ball.center.y + ball.radius / 2 > bat.location.y - bat.height / 2 && ball.center.y - ball.radius / 2 < bat.location.y + bat.height / 2;
  }
  function isBatIntersectingBall(bat, ball) {
    return ball.velocity.dx > 0 ? getBatLeftEdge(bat) >= ball.center.x - ball.radius && getBatLeftEdge(bat) <= ball.center.x + ball.radius : getBatRightEdge(bat) >= ball.center.x - ball.radius && getBatLeftEdge(bat) <= ball.center.x + ball.radius;
  }
  function isBatHittingBall(ball, bat, batBot) {
    return isBallWithinBatVerticalBounds(ball, bat) && isBatIntersectingBall(bat, ball) || (isBallWithinBatVerticalBounds(ball, batBot) && isBatIntersectingBall(batBot, ball));
  }
  function deflectBall(arena) {
    var cont = arena.ball.center.x > arena.width / 2.0 ? arena.ball.center.y - arena.bat.location.y : arena.ball.center.y - arena.batBot.location.y;
    return new Ball(new Location(arena.ball.center.x, arena.ball.center.y), arena.ball.radius, new Velocity(-arena.ball.velocity.dx - Random.Default.nextDouble_lu1900$(0.0, 1.3), -arena.ball.velocity.dy - -cont * Random.Default.nextDouble_lu1900$(0.08, 0.18)));
  }
  function Location(x, y) {
    this.x = x;
    this.y = y;
  }
  Location.$metadata$ = {kind: Kind_CLASS, simpleName: 'Location', interfaces: []};
  Location.prototype.component1 = function () {
    return this.x;
  };
  Location.prototype.component2 = function () {
    return this.y;
  };
  Location.prototype.copy_lu1900$ = function (x, y) {
    return new Location(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Location.prototype.toString = function () {
    return 'Location(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Location.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Location.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function Velocity(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
  Velocity.$metadata$ = {kind: Kind_CLASS, simpleName: 'Velocity', interfaces: []};
  Velocity.prototype.component1 = function () {
    return this.dx;
  };
  Velocity.prototype.component2 = function () {
    return this.dy;
  };
  Velocity.prototype.copy_lu1900$ = function (dx, dy) {
    return new Velocity(dx === void 0 ? this.dx : dx, dy === void 0 ? this.dy : dy);
  };
  Velocity.prototype.toString = function () {
    return 'Velocity(dx=' + Kotlin.toString(this.dx) + (', dy=' + Kotlin.toString(this.dy)) + ')';
  };
  Velocity.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.dx) | 0;
    result = result * 31 + Kotlin.hashCode(this.dy) | 0;
    return result;
  };
  Velocity.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.dx, other.dx) && Kotlin.equals(this.dy, other.dy)))));
  };
  function add(location, velocity) {
    return new Location(location.x + velocity.dx, location.y + velocity.dy);
  }
  var arenaWidth;
  var arenaHeight;
  function main$lambda$lambda(closure$arena, closure$batLocation) {
    return function (it) {
      closure$batLocation.v = new Location(closure$arena.v.bat.location.x, it.clientY);
      return true;
    };
  }
  function main$lambda$lambda_0(closure$context, closure$arena) {
    return function (it) {
      if (it.clientY < closure$context.canvas.height && it.clientX < closure$context.canvas.width)
        closure$arena.v = start(closure$arena.v);
      return true;
    };
  }
  function main$lambda$lambda_1(closure$arena, closure$batLocation, closure$context) {
    return function () {
      closure$arena.v = doStep(closure$arena.v, closure$batLocation.v);
      drawArena(closure$arena.v, closure$context);
      return Unit;
    };
  }
  function main$lambda(it) {
    var arena = {v: initializeArena(800, 500)};
    var batLocation = {v: arena.v.bat.location};
    window.onmousemove = main$lambda$lambda(arena, batLocation);
    var context = initializeCanvasContext(800, 500);
    window.onclick = main$lambda$lambda_0(context, arena);
    return window.setInterval(main$lambda$lambda_1(arena, batLocation, context), 16);
  }
  function main() {
    window.onload = main$lambda;
  }
  function initializeCanvasContext(width, height) {
    var tmp$, tmp$_0, tmp$_1;
    var canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    canvas.width = width;
    canvas.height = height;
    (tmp$_0 = document.body) != null ? tmp$_0.appendChild(canvas) : null;
    return Kotlin.isType(tmp$_1 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_1 : throwCCE();
  }
  function drawBackground(context) {
    var margin = 15.0;
    context.fillStyle = '#333300';
    context.fillRect(0.0, 0.0, context.canvas.width, context.canvas.height);
    context.beginPath();
    context.strokeStyle = '#666600';
    context.lineWidth = 3.0;
    context.setLineDash([3.0, 8.0]);
    context.moveTo(context.canvas.width / 2.0, margin);
    context.lineTo(context.canvas.width / 2.0, context.canvas.height - margin / 2.0);
    context.stroke();
  }
  function drawBat(bat, context) {
    context.fillStyle = '#b9b946';
    context.fillRect(bat.location.x - bat.width / 2, bat.location.y - bat.height / 2, bat.width, bat.height);
  }
  function drawBall(ball, context) {
    context.fillStyle = '#ffffcc';
    context.beginPath();
    context.arc(ball.center.x, ball.center.y, ball.radius, 0.0, 2 * math.PI);
    context.fill();
  }
  function drawScore(arena, context) {
    context.fillStyle = '#B3B3B3';
    context.font = '25pt verdana';
    context.textAlign = 'center';
    context.fillText(arena.score.toString() + '        ' + arena.scoreBot.toString(), context.canvas.width / 2.0, 45.0, 200.0);
  }
  function drawArena(arena, context) {
    drawBackground(context);
    drawBat(arena.bat, context);
    drawBat(arena.batBot, context);
    drawBall(arena.ball, context);
    drawScore(arena, context);
  }
  _.Arena = Arena;
  _.initializeArena_vux9f0$ = initializeArena;
  _.getInitialVelocity = getInitialVelocity;
  _.doStep_5hh52y$ = doStep;
  _.start_11tko7$ = start;
  _.Ball = Ball;
  _.isBallMoving_187q7$ = isBallMoving;
  _.isBallInHorizontalBounds_8d7b1t$ = isBallInHorizontalBounds;
  _.isBallInVerticalBounds_8d7b1t$ = isBallInVerticalBounds;
  _.moveBall_vktrcz$ = moveBall;
  _.isLoss_kjdbzl$ = isLoss;
  _.isBotLoss_kjdbzl$ = isBotLoss;
  _.Bat = Bat;
  _.getBatLeftEdge_1fcl$ = getBatLeftEdge;
  _.getBatRightEdge_1fcl$ = getBatRightEdge;
  _.isBatWithinBounds_4if5p5$ = isBatWithinBounds;
  _.placeBatWithinBounds_4if5p5$ = placeBatWithinBounds;
  _.keepBatArenaInBounds_4if5p5$ = keepBatArenaInBounds;
  _.isBallWithinBatVerticalBounds_umnbq0$ = isBallWithinBatVerticalBounds;
  _.isBatIntersectingBall_rt2hl6$ = isBatIntersectingBall;
  _.isBatHittingBall_cb2vjl$ = isBatHittingBall;
  _.deflectBall_11tko7$ = deflectBall;
  _.Location = Location;
  _.Velocity = Velocity;
  _.add_bk32fg$ = add;
  _.main = main;
  _.initializeCanvasContext_vux9f0$ = initializeCanvasContext;
  _.drawBackground_f69bme$ = drawBackground;
  _.drawBat_84wou7$ = drawBat;
  _.drawBall_k9q4if$ = drawBall;
  _.drawScore_jwa8pb$ = drawScore;
  _.drawArena_jwa8pb$ = drawArena;
  arenaWidth = 800;
  arenaHeight = 500;
  main();
  return _;
}));

//# sourceMappingURL=Pong.js.map