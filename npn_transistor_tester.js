let gpio = require("gpio");
let textbox = require("textbox");
let dialog = require("dialog");

// PA7 - Collector, PA6 - Base, PA4 - Emitter

// B - high => E - high

function test_1 () {
    gpio.init("PA6", "outputPushPull", "up");   // Base
    gpio.init("PA4", "input", "down");          // Emitter
    
    gpio.write("PA6", true);
    
    let is_high = gpio.read("PA4");

    if (is_high) {
        return true;
    } else {
        return false;
    }
}

// E - high => B - low

function test_2 () {
    gpio.init("PA4", "outputPushPull", "up");   // Emitter
    gpio.init("PA6", "input", "down");          // Base
    
    gpio.write("PA4", true);
    
    let is_high = gpio.read("PA6");

    if (is_high) {
        return false;
    } else {
        return true;
    }
}

// B - high => C - high

function test_3 () {
    gpio.init("PA6", "outputPushPull", "up");   // Base
    gpio.init("PA7", "input", "down");          // Collector
    
    gpio.write("PA6", true);
    
    let is_high = gpio.read("PA7");

    if (is_high) {
        return true;
    } else {
        return false;
    }
}

// C - high => B - low

function test_4 () {
    gpio.init("PA7", "outputPushPull", "up");   // Collector
    gpio.init("PA6", "input", "down");          // Base
    
    gpio.write("PA7", true);
    
    let is_high = gpio.read("PA6");

    if (is_high) {
        return false;
    } else {
        return true;
    }
}

let start_win = dialog.message("Insert transistor:", "\n" + "C -> A7 ; B -> A6 ; E -> A4");
print(start_win);

textbox.setConfig("end", "text");
textbox.clearText();
textbox.show();

while (textbox.isOpen()) {
    let result = test_1() && test_2() && test_3() && test_4();

    result ? textbox.addText("Transistor is OK") : textbox.addText("Transistor is defective");
    
    delay(500);

    textbox.clearText();
}