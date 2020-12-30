let MaximalerWinkel = 0
let LageY = 0
let LageX = 0
serial.redirectToUSB()
basic.forever(function () {
    MaximalerWinkel = 10
    LageX = input.rotation(Rotation.Roll)
    LageY = input.rotation(Rotation.Pitch)
    LageX = Math.constrain(LageX, MaximalerWinkel * -1, MaximalerWinkel)
    LageY = Math.constrain(LageY, MaximalerWinkel * -1, MaximalerWinkel)
    console.logValue("LageX", LageX)
console.logValue("LageY", LageY)
LageX = Math.map(LageX, MaximalerWinkel * -1, MaximalerWinkel, 0, 4)
    LageY = Math.map(LageY, MaximalerWinkel * -1, MaximalerWinkel, 0, 4)
    basic.clearScreen()
    led.plot(LageX, LageY)
    basic.pause(500)
})
