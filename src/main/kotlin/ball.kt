import kotlin.math.max
import kotlin.math.min

const val X_MARGIN = 5.0
const val Y_MARGIN = 7.0

/**
 * Defines the representation of the ball.
 * @property center     The ball's location (its center).
 * @property radius     The ball's radius.
 * @property velocity   The ball's velocity.
 */
data class Ball(
    val center: Location,
    val radius: Double,
    val velocity: Velocity
)

//TODO: Fix this!
private val audioHandles: AudioHandles = initializeAudio()

/**
 * Checks whether the ball is moving.
 * @param ball  The ball instance.
 * @return true if the ball is moving, false otherwise
 */
fun isBallMoving(ball: Ball) =
    ball.velocity.dx != 0.0 || ball.velocity.dy != 0.0

/**
 * Checks whether the ball is in Horizontal Bounds.
 * @param ball  The ball instance.
 * @param width  The Horizontal limits.
 * @return true if the ball is Horizontal Bounds, false otherwise
 */
fun isBallInHorizontalBounds(ball: Ball, width: Double) =
    ball.center.x - ball.radius > X_MARGIN && ball.center.x + ball.radius < width - X_MARGIN

/**
 * Checks whether the ball is in Vertical Bounds.
 * @param ball  The ball instance.
 * @param height  The Vertical limits.
 * @return true if the ball is Vertical Bounds, false otherwise
 */
private fun isBallInVerticalBounds(ball: Ball, height: Double) =
    ball.center.y - ball.radius >= Y_MARGIN && ball.center.y + ball.radius <= height - Y_MARGIN

/**
 * Moves the ball within the specified bounds and with its velocity.
 * @param ball      The ball instance.
 * @param height    The height of the arena.
 * @return The moved ball.
 */
fun moveBall(ball: Ball, width: Double, height: Double): Ball{
    val newBall=Ball(
            add(ball.center, ball.velocity),
            ball.radius,
            ball.velocity
    )

    if (isBallInVerticalBounds(newBall, height)) return newBall

    audioHandles.hit.play()
    return Ball(
            Location(
                    if (newBall.velocity.dx < 0) max(X_MARGIN + newBall.radius, newBall.center.x)
                    else min(width - X_MARGIN - newBall.radius, newBall.center.x),
                    if (newBall.velocity.dy < 0) max(Y_MARGIN + newBall.radius, newBall.center.y)
                    else min(height - Y_MARGIN - newBall.radius, newBall.center.y)
            ),
            newBall.radius,
            Velocity(newBall.velocity.dx, -newBall.velocity.dy)
    )
}


/**
 * Checks if the ball has entered the player's safezone, that is, if a loss should be accounted for
 * @property ball       The ball.
 * @param width     The width of the arena.
 */
fun isLoss(ball: Ball, width: Int): Boolean{
    if (ball.center.x + ball.radius >= width - X_MARGIN)
        audioHandles.isLoss.play()

    return ball.center.x + ball.radius >= width - X_MARGIN
}

/**
 * Checks if the ball has entered the bot's safezone, that is, if a loss should be accounted for
 * @property ball       The ball.
 * @param width     The width of the arena.
 */
fun isBotLoss(ball: Ball, width: Int): Boolean{
    if(ball.center.x + ball.radius <= X_MARGIN)
        audioHandles.isLoss.play()

    return ball.center.x + ball.radius <= X_MARGIN
}