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
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Math_0 = Math;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var rangeTo = Kotlin.kotlin.ranges.rangeTo_38ydlf$;
  var Unit = Kotlin.kotlin.Unit;
  var equals = Kotlin.equals;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  Deflection.prototype = Object.create(Enum.prototype);
  Deflection.prototype.constructor = Deflection;
  function Arena(bat, batBot, ball, width, height, score, scoreBot) {
    this.bat = bat;
    this.batBot = batBot;
    this.ball = ball;
    this.width = width;
    this.height = height;
    this.score = score;
    this.scoreBot = scoreBot;
  }
  Arena.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Arena',
    interfaces: []
  };
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
    var batBot = new Bat(new Location(15.0, ball.center.y), 7.0, 80.0);
    return new Arena(bat, batBot, ball, width, height, 0, 0);
  }
  function getInitialVelocity() {
    var alpha = Random.Default.nextDouble_lu1900$(-math.PI / 5, math.PI / 5);
    var magnitude = 9.0;
    return new Velocity(magnitude * Math_0.cos(alpha), magnitude * Math_0.sin(alpha));
  }
  function doStep(arena, batLocation) {
    var bat = keepBatArenaInBounds(new Bat(batLocation, 6.5, 80.0), arena.height, 6.0);
    var batBot = keepBatArenaInBounds(new Bat(new Location(15.0, arena.ball.center.y), 6.5, 80.0), arena.height, 6.0);
    var startBall = new Ball(new Location(arena.width / 2.0, arena.height / 2.0), arena.ball.radius, new Velocity(0.0, 0.0), Deflection$RESTART_getInstance());
    var ball = moveBall(arena.ball, arena.width, arena.height);
    var newBall = isBatHittingBall(ball, bat, batBot, arena.ball.center) ? deflectBall(arena) : ball;
    println(isBatHittingBall(ball, bat, batBot, arena.ball.center));
    return new Arena(bat, batBot, !isBallInHorizontalBounds(newBall, arena.width) ? startBall : newBall, arena.width, arena.height, isLoss(newBall, arena.width) ? arena.score + 1 | 0 : arena.score, isBotLoss(newBall, arena.width) ? arena.scoreBot + 1 | 0 : arena.scoreBot);
  }
  function start(arena) {
    return isBallMoving(arena.ball) ? arena : new Arena(arena.bat, arena.batBot, new Ball(arena.ball.center, arena.ball.radius, getInitialVelocity()), arena.width, arena.height, arena.score, arena.scoreBot);
  }
  var X_MARGIN;
  var Y_MARGIN;
  function Ball(center, radius, velocity, deflection) {
    if (deflection === void 0)
      deflection = null;
    this.center = center;
    this.radius = radius;
    this.velocity = velocity;
    this.deflection = deflection;
  }
  Ball.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Ball',
    interfaces: []
  };
  Ball.prototype.component1 = function () {
    return this.center;
  };
  Ball.prototype.component2 = function () {
    return this.radius;
  };
  Ball.prototype.component3 = function () {
    return this.velocity;
  };
  Ball.prototype.component4 = function () {
    return this.deflection;
  };
  Ball.prototype.copy_4tvqv8$ = function (center, radius, velocity, deflection) {
    return new Ball(center === void 0 ? this.center : center, radius === void 0 ? this.radius : radius, velocity === void 0 ? this.velocity : velocity, deflection === void 0 ? this.deflection : deflection);
  };
  Ball.prototype.toString = function () {
    return 'Ball(center=' + Kotlin.toString(this.center) + (', radius=' + Kotlin.toString(this.radius)) + (', velocity=' + Kotlin.toString(this.velocity)) + (', deflection=' + Kotlin.toString(this.deflection)) + ')';
  };
  Ball.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.center) | 0;
    result = result * 31 + Kotlin.hashCode(this.radius) | 0;
    result = result * 31 + Kotlin.hashCode(this.velocity) | 0;
    result = result * 31 + Kotlin.hashCode(this.deflection) | 0;
    return result;
  };
  Ball.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.center, other.center) && Kotlin.equals(this.radius, other.radius) && Kotlin.equals(this.velocity, other.velocity) && Kotlin.equals(this.deflection, other.deflection)))));
  };
  function Deflection(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function Deflection_initFields() {
    Deflection_initFields = function () {
    };
    Deflection$BY_BAT_instance = new Deflection('BY_BAT', 0);
    Deflection$DEFAULT_instance = new Deflection('DEFAULT', 1);
    Deflection$RESTART_instance = new Deflection('RESTART', 2);
  }
  var Deflection$BY_BAT_instance;
  function Deflection$BY_BAT_getInstance() {
    Deflection_initFields();
    return Deflection$BY_BAT_instance;
  }
  var Deflection$DEFAULT_instance;
  function Deflection$DEFAULT_getInstance() {
    Deflection_initFields();
    return Deflection$DEFAULT_instance;
  }
  var Deflection$RESTART_instance;
  function Deflection$RESTART_getInstance() {
    Deflection_initFields();
    return Deflection$RESTART_instance;
  }
  Deflection.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Deflection',
    interfaces: [Enum]
  };
  function Deflection$values() {
    return [Deflection$BY_BAT_getInstance(), Deflection$DEFAULT_getInstance(), Deflection$RESTART_getInstance()];
  }
  Deflection.values = Deflection$values;
  function Deflection$valueOf(name) {
    switch (name) {
      case 'BY_BAT':
        return Deflection$BY_BAT_getInstance();
      case 'DEFAULT':
        return Deflection$DEFAULT_getInstance();
      case 'RESTART':
        return Deflection$RESTART_getInstance();
      default:throwISE('No enum constant Deflection.' + name);
    }
  }
  Deflection.valueOf_61zpoe$ = Deflection$valueOf;
  function isBallMoving(ball) {
    return ball.velocity.dx !== 0.0 || ball.velocity.dy !== 0.0;
  }
  function isBallInHorizontalBounds(ball, width) {
    return ball.center.x - ball.radius > X_MARGIN && ball.center.x + ball.radius < width - X_MARGIN;
  }
  function isBallInVerticalBounds(ball, height) {
    return ball.center.y - ball.radius >= Y_MARGIN && ball.center.y + ball.radius <= height - Y_MARGIN;
  }
  function moveBall(ball, width, height) {
    var newBall = new Ball(add(ball.center, ball.velocity), ball.radius, ball.velocity);
    if (isBallInVerticalBounds(newBall, height))
      return newBall;
    var tmp$;
    if (newBall.velocity.dx < 0) {
      var a = X_MARGIN + newBall.radius;
      var b = newBall.center.x;
      tmp$ = Math_0.max(a, b);
    } else {
      var a_0 = width - X_MARGIN - newBall.radius;
      var b_0 = newBall.center.x;
      tmp$ = Math_0.min(a_0, b_0);
    }
    var tmp$_0;
    if (newBall.velocity.dy < 0) {
      var a_1 = Y_MARGIN + newBall.radius;
      var b_1 = newBall.center.y;
      tmp$_0 = Math_0.max(a_1, b_1);
    } else {
      var a_2 = height - Y_MARGIN - newBall.radius;
      var b_2 = newBall.center.y;
      tmp$_0 = Math_0.min(a_2, b_2);
    }
    return new Ball(new Location(tmp$, tmp$_0), newBall.radius, new Velocity(newBall.velocity.dx, -newBall.velocity.dy), Deflection$DEFAULT_getInstance());
  }
  function isLoss(ball, width) {
    return ball.center.x + ball.radius >= width - X_MARGIN;
  }
  function isBotLoss(ball, width) {
    return ball.center.x + ball.radius <= X_MARGIN;
  }
  function Bat(location, width, height) {
    this.location = location;
    this.width = width;
    this.height = height;
  }
  Bat.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Bat',
    interfaces: []
  };
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
  function isBatHittingBall(ball, bat, batBot, previousBallLocation) {
    var lBall = new Line(previousBallLocation, ball.center);
    var lBat = new Line(new Location(getBatLeftEdge(bat), bat.location.y - bat.height / 2.0 - ball.radius), new Location(getBatLeftEdge(bat), bat.location.y + bat.height / 2.0 + ball.radius));
    var lBatBot = new Line(new Location(getBatRightEdge(batBot), batBot.location.y - batBot.height / 2.0 - ball.radius), new Location(getBatRightEdge(batBot), batBot.location.y + batBot.height / 2.0 + ball.radius));
    var denominator = (lBat.end.y - lBat.start.y) * (lBall.end.x - lBall.start.x) - (lBat.end.x - lBat.start.x) * (lBall.end.y - lBall.start.y);
    var uA = ((lBat.end.x - lBat.start.x) * (lBall.start.y - lBat.start.y) - (lBat.end.y - lBat.start.y) * (lBall.start.x - lBat.start.x)) / denominator;
    var uB = ((lBall.end.x - lBall.start.x) * (lBall.start.y - lBat.start.y) - (lBall.end.y - lBall.start.y) * (lBall.start.x - lBat.start.x)) / denominator;
    var denominatorBot = (lBatBot.end.y - lBatBot.start.y) * (lBall.end.x - lBall.start.x) - (lBatBot.end.x - lBatBot.start.x) * (lBall.end.y - lBall.start.y);
    var uABot = ((lBatBot.end.x - lBatBot.start.x) * (lBall.start.y - lBatBot.start.y) - (lBatBot.end.y - lBatBot.start.y) * (lBall.start.x - lBatBot.start.x)) / denominatorBot;
    var uBBot = ((lBall.end.x - lBall.start.x) * (lBall.start.y - lBatBot.start.y) - (lBall.end.y - lBall.start.y) * (lBall.start.x - lBatBot.start.x)) / denominatorBot;
    return rangeTo(0.0, 1.0).contains_mef7kx$(uA) && rangeTo(0.0, 1.0).contains_mef7kx$(uB) || (rangeTo(0.0, 1.0).contains_mef7kx$(uABot) && rangeTo(0.0, 1.0).contains_mef7kx$(uBBot));
  }
  function deflectBall(arena) {
    var cont = arena.ball.center.x > arena.width / 2.0 ? arena.ball.center.y - arena.bat.location.y : arena.ball.center.y - arena.batBot.location.y;
    return new Ball(new Location(arena.ball.center.x, arena.ball.center.y), arena.ball.radius, new Velocity(-arena.ball.velocity.dx - Random.Default.nextDouble_lu1900$(0.0, 1.3), arena.ball.velocity.dy + cont * Random.Default.nextDouble_lu1900$(0.08, 0.18)), Deflection$BY_BAT_getInstance());
  }
  function Location(x, y) {
    this.x = x;
    this.y = y;
  }
  Location.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Location',
    interfaces: []
  };
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
  Velocity.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Velocity',
    interfaces: []
  };
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
  function Line(start, end) {
    this.start = start;
    this.end = end;
  }
  Line.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Line',
    interfaces: []
  };
  Line.prototype.component1 = function () {
    return this.start;
  };
  Line.prototype.component2 = function () {
    return this.end;
  };
  Line.prototype.copy_fexq2c$ = function (start, end) {
    return new Line(start === void 0 ? this.start : start, end === void 0 ? this.end : end);
  };
  Line.prototype.toString = function () {
    return 'Line(start=' + Kotlin.toString(this.start) + (', end=' + Kotlin.toString(this.end)) + ')';
  };
  Line.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.start) | 0;
    result = result * 31 + Kotlin.hashCode(this.end) | 0;
    return result;
  };
  Line.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.start, other.start) && Kotlin.equals(this.end, other.end)))));
  };
  var arenaWidth;
  var arenaHeight;
  function main$lambda$lambda(closure$arena, closure$batLocation) {
    return function (it) {
      closure$batLocation.v = new Location(closure$arena.v.bat.location.x, it.clientY);
      return true;
    };
  }
  function main$lambda$lambda_0(closure$arena) {
    return function (it) {
      closure$arena.v = start(closure$arena.v);
      return true;
    };
  }
  function main$lambda$lambda_1(closure$arena, closure$batLocation, closure$context) {
    return function () {
      closure$arena.v = doStep(closure$arena.v, closure$batLocation.v);
      maybePlaySound(closure$arena.v);
      drawArena(closure$arena.v, closure$context);
      return Unit;
    };
  }
  function main$lambda(it) {
    var arena = {v: initializeArena(800, 500)};
    var batLocation = {v: arena.v.bat.location};
    window.onmousemove = main$lambda$lambda(arena, batLocation);
    var context = initializeCanvasContext(800, 500);
    context.canvas.onclick = main$lambda$lambda_0(arena);
    return window.setInterval(main$lambda$lambda_1(arena, batLocation, context), 16);
  }
  function main() {
    window.onload = main$lambda;
  }
  function maybePlaySound(arena) {
    var tmp$;
    tmp$ = arena.ball.deflection;
    if (equals(tmp$, Deflection$BY_BAT_getInstance()))
      Sounds_getInstance().batHit.play();
    else if (equals(tmp$, Deflection$DEFAULT_getInstance()))
      Sounds_getInstance().defaultHit.play();
    else if (equals(tmp$, Deflection$RESTART_getInstance()))
      Sounds_getInstance().pointHit.play();
  }
  function Sounds() {
    Sounds_instance = this;
    this.batHit = new Audio('bat_hit_1.wav');
    this.defaultHit = new Audio('hit.wav');
    this.pointHit = new Audio('is_loss.wav');
  }
  Sounds.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Sounds',
    interfaces: []
  };
  var Sounds_instance = null;
  function Sounds_getInstance() {
    if (Sounds_instance === null) {
      new Sounds();
    }return Sounds_instance;
  }
  function initializeCanvasContext(width, height) {
    var tmp$, tmp$_0, tmp$_1;
    var canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute('class', 'arena');
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
  _.doStep_5hh52y$ = doStep;
  _.start_11tko7$ = start;
  Object.defineProperty(_, 'X_MARGIN', {
    get: function () {
      return X_MARGIN;
    }
  });
  Object.defineProperty(_, 'Y_MARGIN', {
    get: function () {
      return Y_MARGIN;
    }
  });
  _.Ball = Ball;
  Object.defineProperty(Deflection, 'BY_BAT', {
    get: Deflection$BY_BAT_getInstance
  });
  Object.defineProperty(Deflection, 'DEFAULT', {
    get: Deflection$DEFAULT_getInstance
  });
  Object.defineProperty(Deflection, 'RESTART', {
    get: Deflection$RESTART_getInstance
  });
  _.Deflection = Deflection;
  _.isBallMoving_187q7$ = isBallMoving;
  _.isBallInHorizontalBounds_8d7b1t$ = isBallInHorizontalBounds;
  _.moveBall_vktrcz$ = moveBall;
  _.isLoss_kjdbzl$ = isLoss;
  _.isBotLoss_kjdbzl$ = isBotLoss;
  _.Bat = Bat;
  _.keepBatArenaInBounds_4if5p5$ = keepBatArenaInBounds;
  _.isBatHittingBall_ahjhf4$ = isBatHittingBall;
  _.deflectBall_11tko7$ = deflectBall;
  _.Location = Location;
  _.Velocity = Velocity;
  _.add_bk32fg$ = add;
  _.Line = Line;
  _.main = main;
  _.maybePlaySound_11tko7$ = maybePlaySound;
  _.initializeCanvasContext_vux9f0$ = initializeCanvasContext;
  _.drawBackground_f69bme$ = drawBackground;
  _.drawBat_84wou7$ = drawBat;
  _.drawBall_k9q4if$ = drawBall;
  _.drawScore_jwa8pb$ = drawScore;
  _.drawArena_jwa8pb$ = drawArena;
  X_MARGIN = 5.0;
  Y_MARGIN = 7.0;
  arenaWidth = 800;
  arenaHeight = 500;
  main();
  Kotlin.defineModule('Pong', _);
  return _;
}));

//# sourceMappingURL=Pong.js.map