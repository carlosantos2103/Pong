import org.w3c.dom.Audio
import org.w3c.dom.HTMLAudioElement

/**
 * Singleton object used to play the game's sounds.
 */
private object Sounds {
    val batHit = Audio("bat_hit_1.wav")
    val defaultHit = Audio("hit.wav")
    val pointHit = Audio("is_loss.wav")
}

/**
 * Plays a sound if the ball is deflected or a point is made.
 * @property arena   The arena's instande (its center).
 */
fun maybePlaySound(arena: Arena) {
    when (arena.ball.deflection) {
        Deflection.BY_BAT -> Sounds.batHit.play()
        Deflection.DEFAULT -> Sounds.defaultHit.play()
        Deflection.RESTART -> Sounds.pointHit.play()
    }
}