let MaximalerWinkel = 0
let LageX = 0
let LageY = 0
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate9600
)
basic.forever(function () {
    MaximalerWinkel = 10
    LageX = input.rotation(Rotation.Roll)
    LageY = input.rotation(Rotation.Pitch)
    LageX = Math.constrain(LageX, MaximalerWinkel * -1, MaximalerWinkel)
    LageY = Math.constrain(LageY, MaximalerWinkel * -1, MaximalerWinkel)
    serial.writeLine("" + LageX.toString() + ":" + LageY.toString())
    LageX = Math.map(LageX, MaximalerWinkel * -1, MaximalerWinkel, 0, 4)
    LageY = Math.map(LageY, MaximalerWinkel * -1, MaximalerWinkel, 0, 4)
    basic.clearScreen()
    led.plot(LageX, LageY)
    basic.pause(500)
})
