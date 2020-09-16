import kotlin.browser.window

private const val arenaWidth = 800
private const val arenaHeight= 500

/**
 * The application entry point.
 */

fun main() {

    window.onload = {

        val context = initializeCanvasContext(arenaWidth, arenaHeight)
        var arena = initializeArena(arenaWidth, arenaHeight)
        var batLocation = arena.bat.location

        window.onmousemove = {
            batLocation = Location(arena.bat.location.x, it.clientY.toDouble())
            true
        }

        context.canvas.onclick = {
            arena = start(arena)
            true
        }

        window.setInterval({
            arena = doStep(arena, batLocation)
            maybePlaySound(arena)
            drawArena(arena, context)
        }, (1.0/60*1000).toInt())
    }
}
