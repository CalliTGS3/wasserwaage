# Wasserwaage

## ~avatar avatar @unplugged

Dein @boardname@ hat einen eingebauten Sensor, der die Lage des @boardname@ ausgeben kann.
Der @boardname@ kann dabei die Neigung in x - und y - Richtung ausgeben. Mit x - Richtung ist gemeint, wenn Du den @boardname@
nach links oder rechts neigst, dabei werden Werte zwischen -90 (nach links kippen, bis der @boardname@ senkrecht steht) und +90 (nach rechts kippen, bis der @boardname@ senkrecht steht) ausgegeben.
Mit y - Richtung ist gemeint, wenn Du den @boardname@ nach vorn oder zu Dir neigst, dabei werden Werte zwischen -90 
(nach vorn kippen, bis der @boardname@ senkrecht steht) und +90 (zu Dir kippen, bis der @boardname@ senkrecht steht) ausgegeben. Wenn der @boardname@ genau waagerecht gehalten wird, sind beide Werte gleich 0.
 
Damit kannst Du eine elektronische Wasserwaage bauen. Die 5x5 LED Matrix des @boardname@ soll einen Punkt anzeigen, dabei soll der Punkt in der Mitte der Matrix sein, wenn Dein @boardname@ genau waagerecht liegt. 
Die Empfindlichkeit der Wasserwaage soll einstellbar sein.


## Schritt 1 @fullscreen

Erstelle eine Variable ``||Variables:MaximalerWinkel||`` und setze diese auf den Wert 10. Damit wird die Empfindlichkeit der Anzeige gesteuert.
Je kleiner der Wert ist, desto empfindlicher reagiert die Wasserwaage.
Setze dies in den Block  ``||Basic:beim Start||``.

```blocks
let MaximalerWinkel = 10
```


## Schritt 2 @fullscreen

Erstelle eine Variable ``||Variables:LageX||`` und eine Variable ``||Variables:LageY||``, in die die Lage-Werte des @boardname@ gespeichert werden.
Ermittle die x - Lage des @boardname@ mit dem Block ``||Input:Rotation (°) rollen||`` aus dem Block Input ``||Input:Input||``
und speichere den Wert in der Variablen ``||Variables:LageX||``. Ermittle die y - Lage des @boardname@ mit dem Block ``||Input:Rotation (°) Winkel||`` aus dem Block Input ``||Input:Input||``
und speichere den Wert in der Variablen ``||Variables:LageY||``. 
Damit die Ermittlung kontinuierlich passiert, müssen diese Blöcke in den Block  ``||Basic:dauerhaft||``.

```blocks
basic.forever(() => {
    LageX = input.rotation(Rotation.Roll)
    LageY = input.rotation(Rotation.Pitch)
})
```


## Schritt 3 @fullscreen

Begrenze die Werte für ``||Variables:LageX||`` und ``||Variables:LageY||`` auf ``||Variables:MaximalerWinkel||``, 
und zwar so, daß das für negative und positive Werte gleichermaßen passiert. Dafür kannst Du den Block ``||Math:begrenze zwischen und||``
aus dem ``||Math:Mathematik||`` Block benutzen. Für den unteren Wert musst Du ``||Variables:MaximalerWinkel||`` mit -1 multiplizieren, 
damit Du eine -10 erhältst. Mit dieser Begrenzung wird der indirekt der Messbereich der Wasserwaage gesteuert.
**Beachte hier, daß wir die neu errechneten Werte wieder in die gleichen Variablen ``||Variables:LageX||`` und ``||Variables:LageY||`` speichern. Wir können das tun, weil wir die alten Inhalte von ``||Variables:LageX||`` und ``||Variables:LageY||`` nicht mehr brauchen.**

```blocks
basic.forever(() => {
    LageX = input.rotation(Rotation.Roll)
    LageY = input.rotation(Rotation.Pitch)
    LageX = Math.constrain(LageX, MaximalerWinkel * -1, MaximalerWinkel)
    LageY = Math.constrain(LageY, MaximalerWinkel * -1, MaximalerWinkel)
});
```


## Schritt 4 @fullscreen

Erstelle eine Variable ``||Variables:PunktX||`` und eine Variable ``||Variables:PunktY||``, 
in die die berechneten Koordinaten für den Punkt auf der 5x5 LED Matrix des @boardname@ gespeichert werden.
Setze sie auf 0.
**Beachte hier, daß wir die errechneten Werte für die Anzeige in neue Variablen ``||Variables:PunktX||`` und ``||Variables:PunktY||`` speichern. Wir machen das, weil wir die Inhalte von ``||Variables:LageX||`` und ``||Variables:LageY||`` evtl. noch für die Fehlersuche brauchen.**


```blocks
let MaximalerWinkel = 10
let PunktX = 0
let PunktY = 0
```

## Schritt 5 @fullscreen

Berechne ``||Variables:PunktX||`` und ``||Variables:PunktY||``, indem Du mit dem Block ``||Math:verteile .. von niedrig von hoch .. zu niedrig zu hoch||``
aus dem ``||Math:Mathematik||`` Block die Lage - Koordinate, die sich zwischen -``||Variables:MaximalerWinkel||`` und ``||Variables:MaximalerWinkel||`` 
bewegt, auf eine mögliche Koordinate der 5x5 - Matrix zwischen 0 und 4 des @boardname@ zuweist. Programmiere diesen Schritt für ``||Variables:PunktX||`` und ``||Variables:PunktY||``. 
Denke daran, daß sich die Luftblase auf einer Wasserwaage immer entgegengesetzt zur Neigung bewegt.


```blocks
basic.forever(() => {
    LageX = input.rotation(Rotation.Roll)
    LageY = input.rotation(Rotation.Pitch)
    LageX = Math.constrain(LageX, MaximalerWinkel * -1, MaximalerWinkel)
    LageY = Math.constrain(LageY, MaximalerWinkel * -1, MaximalerWinkel)
    PunktX = Math.map(LageX, MaximalerWinkel * -1, MaximalerWinkel, 4, 0)
    PunktY = Math.map(LageY, MaximalerWinkel * -1, MaximalerWinkel, 4, 0)
});
```


## Schritt 6 @fullscreen

Zeige einen Punkt auf der 5x5 LED Matrix des @boardname@ an, indem Du den Block ``||LED:Zeichne x y||`` verwendest. 
Beachte, daß der @boardname@ sehr schnell arbeitet und Du den Punkt eine kleine Weile (hier eine halbe Sekunde) 
leuchten lassen musst, damit Du ihn siehst. Lösche vorher die gesamte Matrix mit ``||Basic:Bildschirminhalt löschen||``. 

```blocks
basic.forever(() => {
    LageX = input.rotation(Rotation.Roll)
    LageY = input.rotation(Rotation.Pitch)
    LageX = Math.constrain(LageX, MaximalerWinkel * -1, MaximalerWinkel)
    LageY = Math.constrain(LageY, MaximalerWinkel * -1, MaximalerWinkel)
    PunktX = Math.map(LageX, MaximalerWinkel * -1, MaximalerWinkel, 4, 0)
    PunktY = Math.map(LageY, MaximalerWinkel * -1, MaximalerWinkel, 4, 0)
    basic.clearScreen()
    led.plot(PunktX, PunktY)
    basic.pause(500)
});
```


## Schritt 7 @fullscreen

Du kannst Dein Programm jetzt im Simulator von Makecode testen. Drücke dazu auf den grünen Pfeil (Vorlauf - Taste) unterhalb des @boardname@.
Mit Klicken auf die Stop - Taste, die dann erscheint, kannst Du den Simulator stoppen. Die Neigung des @boardname@ kannst Du simulieren, 
indem Du die Maus über den @boardname@ führst. Dabei kannst Du beobachten, wie sich der Punkt auf der 5x5 LED Matrix bewegt. 
Experimentiere mit verschiedenen Werten für ``||Variables:MaximalerWinkel||``!  


## Schritt 8 @fullscreen

Schliesse Deinen @boardname@ mit einem USB Kabel an und drücke auf ``|Herunterladen|``. Speichere Dein Programm auf dem Laufwerk **@drivename@**. 
Damit wird Dein Programm zum @boardname@ übertragen.


## Schritt 9

Gut gemacht! Du hast eine elektronische Wasserwaage für den @boardname@ programmiert.
Verlasse diese Anleitung, indem Du im nächsten Schritt auf ``|Fertigstellen|`` klickst. 
Zuvor erhältst Du noch einen Hinweis, wie Du Dein Programm mit anderen teilen kannst.


## ~ @unplugged
Im Hauptmenü von makecode findest Du den Menüpunkt ``|Teilen|``. 
Klicke darauf, Du siehst anschließend ein Fenster in der Mitte mit dem Namen des Projektes. 
Klicke auf die Schaltfläche ``|Projekt veröffentlichen|`` und dann auf ``|Link|`` kopieren. 
Danach kannst Du diesen Link in der Schulcloud als Lösung zu der Aufgabe eintragen.
