import org.w3c.dom.*
import kotlin.browser.document
import kotlin.dom.appendText
import kotlin.math.PI

/**
 * Initializes the drawing area.
 * @param width     The drawing area width.
 * @param height    The drawing area height.
 * @return The drawing area.
 */
fun initializeCanvasContext(width: Int, height: Int): CanvasRenderingContext2D{
    val canvas = document.createElement("canvas") as HTMLCanvasElement
    canvas.width = width
    canvas.height = height
    canvas.setAttribute("class", "arena")
    document.body?.appendChild(canvas)
    return canvas.getContext("2d") as CanvasRenderingContext2D
}

fun initializeEasyButtonContext(): HTMLButtonElement{
    val canvas = document.createElement("button") as HTMLButtonElement
    canvas.setAttribute("class", "buttoneasy")
    canvas.appendText("Fácil")
    document.body?.appendChild(canvas)
    return canvas
}

fun initializeNormalButtonContext(): HTMLButtonElement{
    val canvas = document.createElement("button") as HTMLButtonElement
    canvas.setAttribute("class", "buttonnormal")
    canvas.appendText("Normal")
    document.body?.appendChild(canvas)
    return canvas
}

fun initializeHardButtonContext(): HTMLButtonElement{
    val canvas = document.createElement("button") as HTMLButtonElement
    canvas.setAttribute("class", "buttonhard")
    canvas.appendText("Difícil")
    document.body?.appendChild(canvas)
    return canvas
}

/**
 * Draws the arena background on the given drawing area.
 * @param context   The drawing context.
 */
fun drawBackground(context: CanvasRenderingContext2D){
    val margin=15.0
    context.fillStyle = "#333300"
    context.fillRect(
            0.0, 0.0, context.canvas.width.toDouble(), context.canvas.height.toDouble()
    )

    context.beginPath()
    context.strokeStyle = "#666600"
    context.lineWidth = 3.0
    context.setLineDash(arrayOf(3.0, 8.0))
    context.moveTo(context.canvas.width / 2.0, margin)
    context.lineTo(context.canvas.width / 2.0, context.canvas.height - margin)
    context.stroke()
}

/**
 * Draws the bat on the given drawing area.
 * @param bat       The bat instance.
 * @param context   The drawing context.
 */
fun drawBat(bat: Bat, context: CanvasRenderingContext2D) {
    context.fillStyle = "#b9b946"
    context.fillRect(
            x = bat.location.x - bat.width / 2,
            y = bat.location.y - bat.height / 2,
            w = bat.width,
            h = bat.height
    )
}

/**
 * Draws the ball on the given drawing area.
 * @param ball      The ball instance.
 * @param context   The drawing context.
 */
fun drawBall(ball: Ball, context: CanvasRenderingContext2D) {
    context.fillStyle = "#ffffcc"
    context.beginPath()
    context.arc(ball.center.x, ball.center.y, ball.radius, 0.0, 2 * PI)
    context.fill()
}

/**
 * Draws the score on the given drawing area.
 * @param arena     The arena instance.
 * @param context   The drawing context.
 */
fun drawScore(arena: Arena, context: CanvasRenderingContext2D){
    context.fillStyle = "#B3B3B3"
    context.font = "25pt verdana"
    context.textAlign = CanvasTextAlign.CENTER
    context.fillText(
            arena.computer.score.toString() + "        " + arena.human.score.toString(),
            context.canvas.width / 2.0,
            45.0,
            200.0
    )
}

/**
 * Draws the arena and its contents on the given drawing area.
 * @param arena     The arena instance.
 * @param context   The drawing context.
 */
fun drawArena(arena: Arena, context: CanvasRenderingContext2D){
    drawBackground(context)
    drawBat(arena.human.bat, context)
    drawBat(arena.computer.bat, context)
    drawBall(arena.ball, context)
    drawScore(arena, context)
}
