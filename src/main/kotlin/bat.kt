import kotlin.random.Random

/**
 * Defines the representation of the players' bats.
 * @property location   The bat's location (its center).
 * @property width      The bat's width.
 * @property height     The bat's height.
 */
data class Bat(val location: Location, val width: Double, val height: Double)

//TODO: Fix this!
private val audioHandles: AudioHandles = initializeAudio()

/**
 * Gets the horizontal coordinate of the bat's left edge.
 * @param bat   The bat instance
 * @return The bat's left edge
 */
private fun getBatLeftEdge(bat: Bat) = bat.location.x - bat.width / 2

/**
 * Gets the horizontal coordinate of the bat's right edge.
 * @param bat   The bat instance
 * @return The bat's right edge
 */
private fun getBatRightEdge(bat: Bat) = bat.location.x + bat.width / 2

/**
 * Checks whether the given bat is within the specified bounds.
 * @param bat           The bat instance.
 * @param arenaHeight   The height of the arena.
 * @param margin        The gap to be preserved between the bat and the vertical boundaries.
 * @return A boolean value indicating if [bat] is within the arena's bounds or not.
 */
private fun isBatWithinBounds(bat: Bat, arenaHeight: Double, margin: Double) =
        bat.location.y - bat.height / 2.0 - margin >= 0.0 &&
                bat.location.y + bat.height / 2.0 + margin <= arenaHeight

/**
 * Places the bat within the arena bounds.
 * @param bat           The bat instance.
 * @param arenaHeight   The height of the arena.
 * @param margin        The gap to be preserved between the bat and the vertical boundaries.
 * @return A bat instance located within the arena's bounds.
 */
private fun placeBatWithinBounds(bat: Bat, arenaHeight: Double, margin: Double) = Bat(
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
 * Checks whether the bat is hitting the ball.
 * @param ball      The ball instance.
 * @param bat       The bat instance.
 * @param batBot    The batBot instance.
 */
fun isBatHittingBall(ball: Ball, bat: Bat, batBot: Bat, previousBallLocation: Location): Boolean{
    val lBall = Line(previousBallLocation, ball.center)
    val lBat = Line(
            Location(getBatLeftEdge(bat), bat.location.y - bat.height / 2.0 - ball.radius),
            Location(getBatLeftEdge(bat), bat.location.y + bat.height / 2.0 + ball.radius)
    )
    val lBatBot = Line(
            Location(getBatRightEdge(batBot), batBot.location.y - batBot.height / 2.0 - ball.radius),
            Location(getBatRightEdge(batBot), batBot.location.y + batBot.height / 2.0 + ball.radius)
    )

    val denominator = (lBat.end.y - lBat.start.y) * (lBall.end.x - lBall.start.x) - (lBat.end.x - lBat.start.x) * (lBall.end.y - lBall.start.y)
    val uA = ((lBat.end.x - lBat.start.x) * (lBall.start.y - lBat.start.y) - (lBat.end.y - lBat.start.y) * (lBall.start.x - lBat.start.x)) /
            denominator
    val uB = ((lBall.end.x - lBall.start.x) * (lBall.start.y - lBat.start.y) - (lBall.end.y - lBall.start.y) * (lBall.start.x - lBat.start.x)) /
            denominator

    val denominatorBot = (lBatBot.end.y - lBatBot.start.y) * (lBall.end.x - lBall.start.x) - (lBatBot.end.x - lBatBot.start.x) * (lBall.end.y - lBall.start.y)
    val uABot = ((lBatBot.end.x - lBatBot.start.x) * (lBall.start.y - lBatBot.start.y) - (lBatBot.end.y - lBatBot.start.y) * (lBall.start.x - lBatBot.start.x)) /
            denominatorBot
    val uBBot = ((lBall.end.x - lBall.start.x) * (lBall.start.y - lBatBot.start.y) - (lBall.end.y - lBall.start.y) * (lBall.start.x - lBatBot.start.x)) /
            denominatorBot

    return (uA in 0.0..1.0 && uB in 0.0..1.0 || uABot in 0.0..1.0 && uBBot in 0.0..1.0)
}

/**
 * Defelects the ball in the bat
 * @param arena   The arena instance.
 */
fun deflectBall(arena: Arena) : Ball{
    val cont = if (arena.ball.center.x > arena.width / 2.0)
        arena.ball.center.y - arena.bat.location.y
    else
        arena.ball.center.y - arena.batBot.location.y

    audioHandles.batHit.play()

    return Ball(
            Location(
                    arena.ball.center.x,
                    arena.ball.center.y
            ),
            arena.ball.radius,
            Velocity(
                    dx = -arena.ball.velocity.dx - Random.nextDouble(0.0, 1.3),
                    dy = arena.ball.velocity.dy + (cont * Random.nextDouble(0.08, 0.18))
            )
    )
}