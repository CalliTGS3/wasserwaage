let PunktY = 0
let PunktX = 0
let LageY = 0
let LageX = 0
let MaximalerWinkel = 10
serial.redirectToUSB()
basic.forever(function () {
    LageX = input.rotation(Rotation.Roll)
    LageY = input.rotation(Rotation.Pitch)
    LageX = Math.constrain(LageX, MaximalerWinkel * -1, MaximalerWinkel)
    LageY = Math.constrain(LageY, MaximalerWinkel * -1, MaximalerWinkel)
    console.logValue("LageX", LageX)
console.logValue("LageY", LageY)
PunktX = Math.map(LageX, MaximalerWinkel * -1, MaximalerWinkel, 4, 0)
    PunktY = Math.map(LageY, MaximalerWinkel * -1, MaximalerWinkel, 4, 0)
    basic.clearScreen()
    led.plot(PunktX, PunktY)
    basic.pause(500)
})
