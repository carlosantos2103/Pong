import kotlin.browser.window

const val arenaWidth = 800
const val arenaHeight= 500

fun main() {

    window.onload = {

        var arena = initializeArena(arenaWidth, arenaHeight)
        var batLocation = arena.bat.location

        window.onmousemove = {
            batLocation = Location(arena.bat.location.x, it.clientY.toDouble())
            true
        }

        val context = initializeCanvasContext(arenaWidth, arenaHeight)
        window.onclick = {
            if (it.clientY < context.canvas.height && it.clientX < context.canvas.width)
                arena = start(arena)
            true
        }

        window.setInterval({
            arena = doStep(arena, batLocation)
            drawArena(arena, context)
        }, (1.0/60*1000).toInt())
    }
}