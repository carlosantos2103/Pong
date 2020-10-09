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
  var rangeTo = Kotlin.kotlin.ranges.rangeTo_38ydlf$;
  var equals = Kotlin.equals;
  var Math_0 = Math;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var Unit = Kotlin.kotlin.Unit;
  var getCallableRef = Kotlin.getCallableRef;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var throwCCE = Kotlin.throwCCE;
  Deflection.prototype = Object.create(Enum.prototype);
  Deflection.prototype.constructor = Deflection;
  MoveResult.prototype = Object.create(Enum.prototype);
  MoveResult.prototype.constructor = MoveResult;
  function Arena(human, computer, ball, width, height, running) {
    if (running === void 0)
      running = false;
    this.human = human;
    this.computer = computer;
    this.ball = ball;
    this.width = width;
    this.height = height;
    this.running = running;
  }
  Arena.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Arena',
    interfaces: []
  };
  Arena.prototype.component1 = function () {
    return this.human;
  };
  Arena.prototype.component2 = function () {
    return this.computer;
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
    return this.running;
  };
  Arena.prototype.copy_xruouw$ = function (human, computer, ball, width, height, running) {
    return new Arena(human === void 0 ? this.human : human, computer === void 0 ? this.computer : computer, ball === void 0 ? this.ball : ball, width === void 0 ? this.width : width, height === void 0 ? this.height : height, running === void 0 ? this.running : running);
  };
  Arena.prototype.toString = function () {
    return 'Arena(human=' + Kotlin.toString(this.human) + (', computer=' + Kotlin.toString(this.computer)) + (', ball=' + Kotlin.toString(this.ball)) + (', width=' + Kotlin.toString(this.width)) + (', height=' + Kotlin.toString(this.height)) + (', running=' + Kotlin.toString(this.running)) + ')';
  };
  Arena.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.human) | 0;
    result = result * 31 + Kotlin.hashCode(this.computer) | 0;
    result = result * 31 + Kotlin.hashCode(this.ball) | 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.running) | 0;
    return result;
  };
  Arena.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.human, other.human) && Kotlin.equals(this.computer, other.computer) && Kotlin.equals(this.ball, other.ball) && Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.running, other.running)))));
  };
  var MARGIN_Y;
  function initializeArena(width, height) {
    var ball = createStationaryBall(width, height);
    var batMargin = 15.0;
    var batWith = 7.0;
    var batHeight = 80.0;
    var human = new Player(new Bat(new Location(width - batMargin, height / 2.0), batWith, batHeight));
    var computer = new Player(new Bat(new Location(batMargin, height / 2.0), batWith, batHeight));
    return new Arena(human, computer, ball, width, height, false);
  }
  function getInitialVelocity() {
    var alpha = Random.Default.nextDouble_lu1900$(-math.PI / 5, math.PI / 5);
    var magnitude = 8.5;
    return new Velocity(magnitude * Math_0.cos(alpha), magnitude * Math_0.sin(alpha));
  }
  function isBatHittingBall(batEdge, ball, previousBallLocation) {
    var lBall = new Line(previousBallLocation, ball.center);
    var denominator = (batEdge.end.y - batEdge.start.y) * (lBall.end.x - lBall.start.x) - (batEdge.end.x - batEdge.start.x) * (lBall.end.y - lBall.start.y);
    var uA = ((batEdge.end.x - batEdge.start.x) * (lBall.start.y - batEdge.start.y) - (batEdge.end.y - batEdge.start.y) * (lBall.start.x - batEdge.start.x)) / denominator;
    var uB = ((lBall.end.x - lBall.start.x) * (lBall.start.y - batEdge.start.y) - (lBall.end.y - lBall.start.y) * (lBall.start.x - batEdge.start.x)) / denominator;
    return rangeTo(0.0, 1.0).contains_mef7kx$(uA) && rangeTo(0.0, 1.0).contains_mef7kx$(uB);
  }
  function deflectBall(arena) {
    var cont = arena.ball.velocity.dx > 0 ? arena.ball.center.y - arena.human.bat.location.y : arena.ball.center.y - arena.computer.bat.location.y;
    return new Ball(new Location(arena.ball.center.x + (arena.ball.velocity.dx < 0 ? arena.ball.radius : -arena.ball.radius), arena.ball.center.y), arena.ball.radius, new Velocity(-arena.ball.velocity.dx - Random.Default.nextDouble_lu1900$(0.0, 1.3), arena.ball.velocity.dy + cont * Random.Default.nextDouble_lu1900$(0.08, 0.18)), Deflection$BY_BAT_getInstance());
  }
  function maybeDeflectBall(arena, ball) {
    var tmp$;
    if (isBatHittingBall(getBatRightEdge(arena.computer.bat, arena.ball.radius), ball, arena.ball.center))
      tmp$ = deflectBall(arena);
    else if (isBatHittingBall(getBatLeftEdge(arena.human.bat, arena.ball.radius), ball, arena.ball.center))
      tmp$ = deflectBall(arena);
    else
      tmp$ = ball;
    return tmp$;
  }
  function doStep(arena, batLocation) {
    var humanBat = keepBatArenaInBounds(new Bat(batLocation, arena.human.bat.width, arena.human.bat.height), arena.height, MARGIN_Y);
    var computerBat = isBallMoving(arena.ball) ? keepBatInVerticalBounds(moveTowards(arena.computer.bat, arena.ball.center), arena.height, MARGIN_Y) : buildBatWith(arena.computer.bat, new Location(arena.computer.bat.location.x, arena.ball.center.y));
    var ball = arena.running ? maybeDeflectBall(arena, moveBall(arena.ball, arena.width, arena.height)) : arena.ball;
    var result = checkMoveResult(ball, arena.width);
    return new Arena(new Player(humanBat, equals(result, MoveResult$COMPUTER_LOSS_getInstance()) ? arena.human.score + 1 | 0 : arena.human.score), new Player(computerBat, equals(result, MoveResult$HUMAN_LOSS_getInstance()) ? arena.computer.score + 1 | 0 : arena.computer.score), !isBallInHorizontalBounds(ball, arena.width) ? createStationaryBall(arena.width, arena.height) : ball, arena.width, arena.height, arena.running);
  }
  function start(arena) {
    var tmp$;
    if (!isBallMoving(arena.ball))
      tmp$ = new Arena(arena.human, arena.computer, new Ball(arena.ball.center, arena.ball.radius, getInitialVelocity()), arena.width, arena.height, true);
    else
      tmp$ = new Arena(arena.human, arena.computer, arena.ball, arena.width, arena.height, !arena.running);
    return tmp$;
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
  function MoveResult(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function MoveResult_initFields() {
    MoveResult_initFields = function () {
    };
    MoveResult$HUMAN_LOSS_instance = new MoveResult('HUMAN_LOSS', 0);
    MoveResult$COMPUTER_LOSS_instance = new MoveResult('COMPUTER_LOSS', 1);
  }
  var MoveResult$HUMAN_LOSS_instance;
  function MoveResult$HUMAN_LOSS_getInstance() {
    MoveResult_initFields();
    return MoveResult$HUMAN_LOSS_instance;
  }
  var MoveResult$COMPUTER_LOSS_instance;
  function MoveResult$COMPUTER_LOSS_getInstance() {
    MoveResult_initFields();
    return MoveResult$COMPUTER_LOSS_instance;
  }
  MoveResult.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MoveResult',
    interfaces: [Enum]
  };
  function MoveResult$values() {
    return [MoveResult$HUMAN_LOSS_getInstance(), MoveResult$COMPUTER_LOSS_getInstance()];
  }
  MoveResult.values = MoveResult$values;
  function MoveResult$valueOf(name) {
    switch (name) {
      case 'HUMAN_LOSS':
        return MoveResult$HUMAN_LOSS_getInstance();
      case 'COMPUTER_LOSS':
        return MoveResult$COMPUTER_LOSS_getInstance();
      default:throwISE('No enum constant MoveResult.' + name);
    }
  }
  MoveResult.valueOf_61zpoe$ = MoveResult$valueOf;
  function createStationaryBall(width, height) {
    return new Ball(new Location(width / 2.0, height / 2.0), 5.0, new Velocity(0.0, 0.0), Deflection$RESTART_getInstance());
  }
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
  function checkMoveResult(ball, width) {
    if (ball.center.x + ball.radius >= width - X_MARGIN)
      return MoveResult$HUMAN_LOSS_getInstance();
    else if (ball.center.x - ball.radius <= X_MARGIN)
      return MoveResult$COMPUTER_LOSS_getInstance();
    else
      return null;
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
  var BAT_SPEED;
  function getBatLeftEdge(bat, ballRadius) {
    return new Line(new Location(bat.location.x - bat.width / 2.0, bat.location.y - bat.height / 2.0 - ballRadius), new Location(bat.location.x - bat.width / 2.0, bat.location.y + bat.height / 2.0 + ballRadius));
  }
  function getBatRightEdge(bat, ballRadius) {
    return new Line(new Location(bat.location.x + bat.width / 2.0, bat.location.y - bat.height / 2.0 - ballRadius), new Location(bat.location.x + bat.width / 2.0, bat.location.y + bat.height / 2.0 + ballRadius));
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
  function buildBatWith(bat, newLocation) {
    return new Bat(newLocation, bat.width, bat.height);
  }
  function keepBatInVerticalBounds(bat, height, margin) {
    return isBatWithinBounds(bat, height, margin) ? bat : placeBatWithinBounds(bat, height, margin);
  }
  function moveTowards(bat, destination) {
    var maxDY = destination.y - bat.location.y;
    var actualDY = Math_0.sign(maxDY) * BAT_SPEED;
    var velocity = new Velocity(0.0, actualDY > 0 ? Math_0.min(actualDY, maxDY) : Math_0.max(maxDY, actualDY));
    return buildBatWith(bat, add(bat.location, velocity));
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
      closure$batLocation.v = new Location(closure$arena.v.human.bat.location.x, it.clientY - 90.0);
      return true;
    };
  }
  function main$lambda$lambda_0(closure$arena) {
    return function (it) {
      closure$arena.v = start(closure$arena.v);
      return true;
    };
  }
  function main$lambda$animationStep(closure$arena, closure$batLocation, closure$context) {
    return function () {
      closure$arena.v = doStep(closure$arena.v, closure$batLocation.v);
      maybePlaySound(closure$arena.v);
      drawArena(closure$arena.v, closure$context);
    };
  }
  function main$lambda(it) {
    var context = initializeCanvasContext(700, 420);
    var arena = {v: initializeArena(700, 420)};
    var batLocation = {v: arena.v.human.bat.location};
    window.onmousemove = main$lambda$lambda(arena, batLocation);
    context.canvas.onclick = main$lambda$lambda_0(arena);
    var animationStep = main$lambda$animationStep(arena, batLocation, context);
    return window.setInterval(getCallableRef('animationStep', function () {
      return animationStep(), Unit;
    }), 16);
  }
  function main() {
    window.onload = main$lambda;
  }
  function Player(bat, score) {
    if (score === void 0)
      score = 0;
    this.bat = bat;
    this.score = score;
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  Player.prototype.component1 = function () {
    return this.bat;
  };
  Player.prototype.component2 = function () {
    return this.score;
  };
  Player.prototype.copy_d681h5$ = function (bat, score) {
    return new Player(bat === void 0 ? this.bat : bat, score === void 0 ? this.score : score);
  };
  Player.prototype.toString = function () {
    return 'Player(bat=' + Kotlin.toString(this.bat) + (', score=' + Kotlin.toString(this.score)) + ')';
  };
  Player.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.bat) | 0;
    result = result * 31 + Kotlin.hashCode(this.score) | 0;
    return result;
  };
  Player.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.bat, other.bat) && Kotlin.equals(this.score, other.score)))));
  };
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
  function maybePlaySound(arena) {
    var tmp$;
    if (arena.running) {
      tmp$ = arena.ball.deflection;
      if (equals(tmp$, Deflection$BY_BAT_getInstance()))
        Sounds_getInstance().batHit.play();
      else if (equals(tmp$, Deflection$DEFAULT_getInstance()))
        Sounds_getInstance().defaultHit.play();
      else if (equals(tmp$, Deflection$RESTART_getInstance()))
        Sounds_getInstance().pointHit.play();
    }}
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
    context.lineTo(context.canvas.width / 2.0, context.canvas.height - margin);
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
    context.fillText(arena.computer.score.toString() + '        ' + arena.human.score.toString(), context.canvas.width / 2.0, 45.0, 200.0);
  }
  function drawArena(arena, context) {
    drawBackground(context);
    drawBat(arena.human.bat, context);
    drawBat(arena.computer.bat, context);
    drawBall(arena.ball, context);
    drawScore(arena, context);
  }
  _.Arena = Arena;
  Object.defineProperty(_, 'MARGIN_Y', {
    get: function () {
      return MARGIN_Y;
    }
  });
  _.initializeArena_vux9f0$ = initializeArena;
  _.isBatHittingBall_a1bnx2$ = isBatHittingBall;
  _.deflectBall_11tko7$ = deflectBall;
  _.maybeDeflectBall_tyckp0$ = maybeDeflectBall;
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
  Object.defineProperty(MoveResult, 'HUMAN_LOSS', {
    get: MoveResult$HUMAN_LOSS_getInstance
  });
  Object.defineProperty(MoveResult, 'COMPUTER_LOSS', {
    get: MoveResult$COMPUTER_LOSS_getInstance
  });
  _.MoveResult = MoveResult;
  _.createStationaryBall_vux9f0$ = createStationaryBall;
  _.isBallMoving_187q7$ = isBallMoving;
  _.isBallInHorizontalBounds_8d7b1t$ = isBallInHorizontalBounds;
  _.moveBall_vktrcz$ = moveBall;
  _.checkMoveResult_kjdbzl$ = checkMoveResult;
  _.Bat = Bat;
  _.getBatLeftEdge_f3r8qh$ = getBatLeftEdge;
  _.getBatRightEdge_f3r8qh$ = getBatRightEdge;
  _.keepBatArenaInBounds_4if5p5$ = keepBatArenaInBounds;
  _.buildBatWith_2ehqr0$ = buildBatWith;
  _.keepBatInVerticalBounds_4if5p5$ = keepBatInVerticalBounds;
  _.moveTowards_2ehqr0$ = moveTowards;
  _.Location = Location;
  _.Velocity = Velocity;
  _.add_bk32fg$ = add;
  _.Line = Line;
  _.main = main;
  _.Player = Player;
  _.maybePlaySound_11tko7$ = maybePlaySound;
  _.initializeCanvasContext_vux9f0$ = initializeCanvasContext;
  _.drawBackground_f69bme$ = drawBackground;
  _.drawBat_84wou7$ = drawBat;
  _.drawBall_k9q4if$ = drawBall;
  _.drawScore_jwa8pb$ = drawScore;
  _.drawArena_jwa8pb$ = drawArena;
  MARGIN_Y = 10.0;
  X_MARGIN = 7.0;
  Y_MARGIN = 7.0;
  BAT_SPEED = 5.5;
  arenaWidth = 700;
  arenaHeight = 420;
  main();
  Kotlin.defineModule('Pong', _);
  return _;
}));

//# sourceMappingURL=Pong.js.map
