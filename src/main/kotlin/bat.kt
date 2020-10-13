import kotlin.math.max
import kotlin.math.min
import kotlin.math.sign

/**
 * Defines the representation of the players' bats.
 * @property location   The bat's location (its center).
 * @property width      The bat's width.
 * @property height     The bat's height.
 */
data class Bat(val location: Location, val width: Double, val height: Double)

/**
 * Regulats the bat's max speed. The higher, the fast the bat can move.
 */
private const val BAT_SPEED = 6

/**
 * Gets the horizontal coordinate of the bat's left edge.
 * @param bat   The bat instance
 * @return The bat's left edge
 */
fun getBatLeftEdge(bat: Bat, ballRadius: Double) = Line(
        Location(bat.location.x - bat.width / 2.0,bat.location.y - bat.height / 2.0 - ballRadius),
        Location(bat.location.x - bat.width / 2.0,bat.location.y + bat.height / 2.0 + ballRadius)
)

/**
 * Gets the horizontal coordinate of the bat's left edge.
 * @param bat   The bat instance
 * @return The bat's left edge
 */
fun getBatRightEdge(bat: Bat, ballRadius: Double) = Line(
        Location(bat.location.x + bat.width / 2.0,bat.location.y - bat.height / 2.0 - ballRadius),
        Location(bat.location.x + bat.width / 2.0,bat.location.y + bat.height / 2.0 + ballRadius)
)

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
 * Builds a new bat instance from the given one ([bat]) and with a new location [newLocation].
 * @param bat           The bat instance to be used as a prototype for the new instance.
 * @param newLocation   The location for the new instance.
 * @return A [Bat] ]instance with all its properties copied from [bat] and with [newLocation] as its
 * location.
 */
fun buildBatWith(bat: Bat, newLocation: Location) = Bat(newLocation, bat.width, bat.height)

/**
 * Keeps the bat within the arena bounds, regardless of its current position.
 * @param bat           The bat instance.
 * @param height        The height of the admissible vertical bounds.
 * @param margin        The gap to be preserved between the bat and the vertical boundaries.
 * @return a bat instance located inside the arena bounds.
 */
fun keepBatInVerticalBounds(bat: Bat, height: Double, margin: Double) =
        if (isBatWithinBounds(bat, height, margin)) bat
        else placeBatWithinBounds(bat, height, margin)

/**
 * Moves the bat towards the ball. Its our little AI :P
 */
fun moveTowards(bat: Bat, destination: Location, level: Level): Bat {
    val multiplier = if (level == Level.EASY) 0.7 else if (level == Level.HARD) 1.4 else 1.0
    val maxDY = destination.y - bat.location.y
    val actualDY = sign(maxDY) * BAT_SPEED * multiplier
    val velocity = Velocity(0.0, if (actualDY > 0) min(actualDY, maxDY) else max(maxDY, actualDY))
    return buildBatWith(bat, add(bat.location, velocity))
}