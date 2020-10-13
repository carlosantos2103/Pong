import kotlin.browser.window

private const val arenaWidth = 700
private const val arenaHeight= 420

/**
 * The application entry point.
 */

fun main() {

    window.onload = {

        val context = initializeCanvasContext(arenaWidth, arenaHeight)
        val easyButton = initializeEasyButtonContext()
        val normalButton = initializeNormalButtonContext()
        val hardButton = initializeHardButtonContext()
        var arena = initializeArena(arenaWidth, arenaHeight)
        var batLocation = arena.human.bat.location

        window.onmousemove = {
            batLocation = Location(arena.human.bat.location.x, it.clientY-90.0)
            true
        }

        easyButton.onclick = {
            arena = changeLevel(arena, Level.EASY)
            true
        }

        normalButton.onclick = {
            arena = changeLevel(arena, Level.NORMAL)
            true
        }

        hardButton.onclick = {
            arena = changeLevel(arena, Level.HARD)
            true
        }


        context.canvas.onclick = {
            arena = start(arena)
            true
        }

        fun animationStep() {
            arena = doStep(arena, batLocation)
            maybePlaySound(arena)
            drawArena(arena, context)
        }


        window.setInterval(::animationStep, (1.0/60*1000).toInt())
    }
}
