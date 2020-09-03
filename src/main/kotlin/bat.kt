import kotlin.random.Random

/**
 * Defines the representation of the players' bats.
 * @property location   The bat's location (its center).
 * @property width      The bat's width.
 * @property height     The bat's height.
 */
data class Bat(val location: Location, val width: Double, val height: Double)

/**
 * Gets the horizontal coordinate of the bat's left edge.
 * @param bat   The bat instance
 * @return The bat's left edge
 */
fun getBatLeftEdge(bat: Bat) = bat.location.x - bat.width / 2

/**
 * Gets the horizontal coordinate of the bat's right edge.
 * @param bat   The bat instance
 * @return The bat's right edge
 */
fun getBatRightEdge(bat: Bat) = bat.location.x + bat.width / 2

/**
 * Checks whether the given bat is within the specified bounds.
 * @param bat           The bat instance.
 * @param arenaHeight   The height of the arena.
 * @param margin        The gap to be preserved between the bat and the vertical boundaries.
 * @return A boolean value indicating if [bat] is within the arena's bounds or not.
 */
fun isBatWithinBounds(bat: Bat, arenaHeight: Double, margin: Double) =
        bat.location.y - bat.height / 2.0 - margin >= 0.0 &&
                bat.location.y + bat.height / 2.0 + margin <= arenaHeight

/**
 * Places the bat within the arena bounds.
 * @param bat           The bat instance.
 * @param arenaHeight   The height of the arena.
 * @param margin        The gap to be preserved between the bat and the vertical boundaries.
 * @return A bat instance located within the arena's bounds.
 */
fun placeBatWithinBounds(bat: Bat, arenaHeight: Double, margin: Double) = Bat(
        Location(
                x = bat.location.x,
                y = if(bat.location.y - bat.height / 2.0 - margin < 0.0) bat.height / 2.0 + margin
                    else arenaHeight - bat.height / 2.0 - margin
        ),
        bat.width,
        bat.height
)

/**
 * Keeps the bat within the arena bounds, regardless of its current position.
 * @param bat           The bat instance.
 * @param arenaHeight   The height of the arena.
 * @param margin        The gap to be preserved between the bat and the vertical boundaries.
 * @return a bat instance located inside the arena bounds.
 */
fun keepBatArenaInBounds(bat: Bat, arenaHeight: Double, margin: Double): Bat {
    return if (isBatWithinBounds(bat, arenaHeight, margin)) bat
    else placeBatWithinBounds(bat, arenaHeight, margin)
}

/**
 * Checks if the ball is within the bat's vertical bounds.
 */
fun isBallWithinBatVerticalBounds(ball: Ball, bat: Bat) =
        ball.center.y + ball.radius / 2 > bat.location.y - bat.height / 2 &&
        ball.center.y - ball.radius / 2 < bat.location.y + bat.height / 2

/**
 * Checks if one of the bat's vertical edges is inside the ball.
 */
fun isBatIntersectingBall(bat: Bat, ball: Ball) =
        if (ball.velocity.dx > 0)
            getBatLeftEdge(bat) >= ball.center.x - ball.radius && getBatLeftEdge(bat) <= ball.center.x + ball.radius
        else
            getBatRightEdge(bat) >= ball.center.x - ball.radius && getBatLeftEdge(bat) <= ball.center.x + ball.radius

/**
 * Checks whether the bat is hitting the ball.
 * @param ball  The ball instance.
 * @param bat   The bat instance.
 * @param batBot   The batBot instance.
 */
fun isBatHittingBall(ball: Ball, bat: Bat, batBot: Bat): Boolean =
        isBallWithinBatVerticalBounds(ball, bat) && isBatIntersectingBall(bat, ball) ||
                isBallWithinBatVerticalBounds(ball, batBot) && isBatIntersectingBall(batBot, ball)

/**
 *
 */
fun deflectBall(arena: Arena) : Ball{
    val cont = if (arena.ball.center.x > arena.width / 2.0)
        arena.ball.center.y - (arena.bat.location.y) // -40 -> 40
    else
        arena.ball.center.y - (arena.batBot.location.y)

    return Ball(
            Location(
                    arena.ball.center.x,
                    arena.ball.center.y
            ),
            arena.ball.radius,
            Velocity(
                    dx = -arena.ball.velocity.dx - Random.nextDouble(0.0, 1.3),
                    dy = -arena.ball.velocity.dy - (-cont * Random.nextDouble(0.08, 0.18))
            )
    )
}
