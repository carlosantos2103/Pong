import kotlin.browser.window

private const val arenaWidth = 800
private const val arenaHeight= 500

/**
 * The application entry point.
 */

fun main() {

    val ball: Ball? = Ball(
            Location(10.0,10.0),
            15.0,
            Velocity(10.0, 0.0)
    )

    window.onload = {

        var arena = initializeArena(arenaWidth, arenaHeight)
        var batLocation = arena.bat.location

        window.onmousemove = {
            batLocation = Location(arena.bat.location.x, it.clientY.toDouble())
            true
        }

        val context = initializeCanvasContext(arenaWidth, arenaHeight)
        context.canvas.onclick = {
            arena = start(arena)
            true
        }

        window.setInterval({
            arena = doStep(arena, batLocation)
            drawArena(arena, context)
        }, (1.0/60*1000).toInt())
    }
}