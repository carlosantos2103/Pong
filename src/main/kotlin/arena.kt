import org.w3c.dom.Audio
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin
import kotlin.random.Random

/**
 * Defines the representation of the game's arena.
 * @property bat        The player's bat.
 * @property bat        The bot's bat.
 * @property ball       The ball.
 * @property width      The width of the arena.
 * @property height     The height of the arena.
 * @property score      The current score.
 * @property scoreBot   The current score.
 */
data class Arena(
        val bat: Bat,
        val batBot: Bat,
        val ball: Ball,
        val width: Int,
        val height: Int,
        var score: Int,
        var scoreBot: Int
)

/**
 * Creates an arena instance with the specified dimension.
 * @param width     The width of the arena.
 * @param height    The height of the arena.
 * @return The newly created arena instance.
 */
fun initializeArena(width: Int, height: Int): Arena {
    val ball = Ball(
            Location(width / 2.0, height / 2.0),
            5.0,
            Velocity(0.0, 0.0)
    )

    val bat = Bat(Location(width - 15.0, height / 2.0), 7.0, 80.0)
    val batBot = Bat(Location(15.0, ball.center.y), 7.0, 80.0)

    return Arena(bat, batBot, ball, width, height, 0, 0)
}

/**
 * Generates the initial ball velocity.
 */
private fun getInitialVelocity(): Velocity {
    val alpha = Random.nextDouble(-PI / 5, PI / 5)
    val magnitude = 9.0
    return Velocity(magnitude * cos(alpha), magnitude * sin(alpha))
}

/**
 * Computes the new arena according to its current state and the new location for the player's bat.
 * @param arena         The current arena instance.
 * @param batLocation   The location of the player's bat.
 */
fun doStep(arena: Arena, batLocation: Location) : Arena {
    val bat = keepBatArenaInBounds(
            Bat(batLocation, 6.5, 80.0),
            arena.height.toDouble(),
            6.0
    )
    val batBot = keepBatArenaInBounds(
            Bat(Location(15.0, arena.ball.center.y), 6.5, 80.0),
            arena.height.toDouble(),
            6.0
    )
    val startBall = Ball(
            Location(arena.width / 2.0, arena.height / 2.0),
            arena.ball.radius,
            Velocity(dx = 0.0, dy = 0.0)
    )

    val ball = moveBall(arena.ball, arena.width.toDouble(), arena.height.toDouble())
    val newBall = if (isBatHittingBall(ball, bat, batBot, arena.ball.center)) deflectBall(arena)
        else ball

    println(isBatHittingBall(ball, bat, batBot, arena.ball.center))

    return Arena(
            bat,
            batBot,
            if(!isBallInHorizontalBounds(newBall, arena.width.toDouble())) startBall
                else newBall,
            arena.width,
            arena.height,
            if(isLoss(newBall, arena.width)) arena.score + 1 else arena.score,
            if(isBotLoss(newBall, arena.width)) arena.scoreBot + 1 else arena.scoreBot
    )
}

/**
 * Starts the movement of the ball if it has not started yet.
 * @param arena The arena instance.
 * @return The arena instance bearing a moving ball.
 */
fun start(arena: Arena): Arena{
    return if (isBallMoving(arena.ball)) arena
    else Arena(
            arena.bat, arena.batBot,
            Ball(arena.ball.center, arena.ball.radius, getInitialVelocity()),
            arena.width,
            arena.height,
            arena.score,
            arena.scoreBot
    )
}















