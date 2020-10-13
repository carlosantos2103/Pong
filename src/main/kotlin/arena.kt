import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin
import kotlin.random.Random

/**Defines the representation of the game's arena.
 * @property human          The human's player.
 * @property computer       The computer's player.
 * @property ball           The ball.
 * @property width          The width of the arena.
 * @property height         The height of the arena.
 * @property running        The arena status.
 */
data class Arena(
        val human: Player,
        val computer: Player,
        val ball: Ball,
        val width: Int,
        val height: Int,
        val level: Level = Level.NORMAL,
        var running: Boolean = false
)

/**
 * Defines the Level wanted by the player
 */
enum class Level { EASY, NORMAL, HARD }

const val MARGIN_Y = 10.0

/**
 * Creates an arena instance with the specified dimension.
 * @param width     The width of the arena.
 * @param height    The height of the arena.
 * @return The newly created arena instance.
 */
fun initializeArena(width: Int, height: Int): Arena {
    val ball = createStationaryBall(width, height)
    val batMargin = 15.0
    val batWith = 7.0
    val batHeight = 80.0

    val human = Player(Bat(Location(width - batMargin, height / 2.0), batWith, batHeight))
    val computer = Player(Bat(Location(batMargin, height / 2.0), batWith, batHeight))

    return Arena(human, computer, ball, width, height, Level.NORMAL, false)
}

/**
 * Generates the initial ball velocity.
 */
private fun getInitialVelocity(): Velocity {
    val alpha = Random.nextDouble(-PI / 5, PI / 5)
    val magnitude = 8.5
    return Velocity(magnitude * cos(alpha), magnitude * sin(alpha))
}

/**
 * Checks whether the bat is hitting the ball.
 * @param ball          The ball instance.
 * @param batEdge       The bat's edge instance.
 */
fun isBatHittingBall(batEdge: Line, ball: Ball, previousBallLocation: Location): Boolean{
    val lBall = Line(previousBallLocation, ball.center)

    val denominator = (batEdge.end.y - batEdge.start.y) * (lBall.end.x - lBall.start.x) - (batEdge.end.x - batEdge.start.x) * (lBall.end.y - lBall.start.y)
    val uA = ((batEdge.end.x - batEdge.start.x) * (lBall.start.y - batEdge.start.y) - (batEdge.end.y - batEdge.start.y) * (lBall.start.x - batEdge.start.x)) /
            denominator
    val uB = ((lBall.end.x - lBall.start.x) * (lBall.start.y - batEdge.start.y) - (lBall.end.y - lBall.start.y) * (lBall.start.x - batEdge.start.x)) /
            denominator

    return (uA in 0.0..1.0 && uB in 0.0..1.0)
}

/**
 * Defelects the ball in the bat
 * @param arena   The arena instance.
 */
fun deflectBall(arena: Arena) : Ball{
    val cont = if (arena.ball.velocity.dx > 0)
        arena.ball.center.y - arena.human.bat.location.y
    else
        arena.ball.center.y - arena.computer.bat.location.y

    return Ball(
            Location(
                    arena.ball.center.x + if (arena.ball.velocity.dx < 0) arena.ball.radius else -arena.ball.radius,
                    arena.ball.center.y
            ),
            arena.ball.radius,
            Velocity(
                    dx = -arena.ball.velocity.dx - Random.nextDouble(0.0, 1.3),
                    dy = arena.ball.velocity.dy + (cont * Random.nextDouble(0.08, 0.18))
            ),
            Deflection.BY_BAT
    )
}

/**
 * Deflects the ball if it encounters a bat.
 * @param arena The arena instance.
 * @param ball The updated ball instance
 * @return The ball deflected in the bat or not
 */
fun maybeDeflectBall(arena: Arena, ball: Ball): Ball{
    return when{
        isBatHittingBall(getBatRightEdge(arena.computer.bat, arena.ball.radius), ball, arena.ball.center) -> deflectBall(arena)
        isBatHittingBall(getBatLeftEdge(arena.human.bat, arena.ball.radius), ball, arena.ball.center) -> deflectBall(arena)
        else -> ball
    }
}

/**
 * Computes the new arena according to its current state and the new location for the player's bat.
 * @param arena         The current arena instance.
 * @param batLocation   The location of the player's bat.
 */
fun doStep(arena: Arena, batLocation: Location) : Arena {
    val humanBat = keepBatArenaInBounds(
            Bat(batLocation, arena.human.bat.width, arena.human.bat.height),
            arena.height.toDouble(),
            MARGIN_Y
    )
    val computerBat = if (isBallMoving(arena.ball))
                keepBatInVerticalBounds(moveTowards(arena.computer.bat, arena.ball.center, arena.level), arena.height.toDouble(), MARGIN_Y)
            else
                buildBatWith(arena.computer.bat, Location(arena.computer.bat.location.x, arena.ball.center.y))

    val ball = if (arena.running)
            maybeDeflectBall(
                    arena,
                    moveBall(arena.ball, arena.width.toDouble(), arena.height.toDouble())
            )
            else arena.ball

    val result = checkMoveResult(ball, arena.width)

    return Arena(
            Player(humanBat, if (result==MoveResult.COMPUTER_LOSS) arena.human.score + 1 else arena.human.score),
            Player(computerBat, if (result==MoveResult.HUMAN_LOSS) arena.computer.score + 1 else arena.computer.score),
            if(!isBallInHorizontalBounds(ball, arena.width.toDouble())) createStationaryBall(arena.width, arena.height) else ball,
            arena.width,
            arena.height,
            arena.level,
            arena.running
    )
}

/**
 * Changes the level of the game
 * @param arena The arena instance.
 * @param level The new level
 * @return The arena instance bearing a moving ball.
 */
fun changeLevel(arena: Arena, level: Level): Arena{
    return when (level) {
        Level.NORMAL -> Arena(
                arena.human,
                arena.computer,
                arena.ball,
                arena.width,
                arena.height,
                Level.NORMAL,
                arena.running
        )
        Level.EASY -> Arena(
                arena.human,
                arena.computer,
                arena.ball,
                arena.width,
                arena.height,
                Level.EASY,
                arena.running
        )
        else -> Arena(
                arena.human,
                arena.computer,
                arena.ball,
                arena.width,
                arena.height,
                Level.HARD,
                arena.running
        )
    }
}

/**
 * Starts the movement of the ball if it has not started yet.
 * @param arena The arena instance.
 * @return The arena instance bearing a moving ball.
 */
fun start(arena: Arena): Arena{
    return when {
        !isBallMoving(arena.ball) -> Arena(
                arena.human,
                arena.computer,
                Ball(arena.ball.center, arena.ball.radius, getInitialVelocity()),
                arena.width,
                arena.height,
                arena.level,
                true
        )
        else -> Arena(
                arena.human,
                arena.computer,
                arena.ball,
                arena.width,
                arena.height,
                arena.level,
                !arena.running
        )
    }
}














