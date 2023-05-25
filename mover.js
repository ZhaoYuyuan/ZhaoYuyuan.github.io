// Acceleration Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/T84AWnntxZA
// https://thecodingtrain.com/learning/nature-of-code/1.6-acceleration-vector.html
// https://editor.p5js.org/codingtrain/sketches/OjCfrdWX


class Mover {
    constructor(x, y) {
        this.pos = createVector(x, y);
        // this.vel = createVector(1, -1);
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(3));
        this.mouse = createVector(random(width), random(height));
        let i = floor(random(0, 3));
        if (i == 0) {
            this.r = 0;
            this.g = random(255);
            this.b = random(255);
        }
        if (i == 1) {
            this.r = random(255);
            this.g = 0;
            this.b = random(255);
        }
        if (i == 2) {
            this.r = random(255);
            this.g = random(255);
            this.b = 0;
        }
        console.log(i);

    }

    updateP() {
        if (acSwitch == 0) {
            this.mouse = createVector(random(width), random(height));
        } else if (acSwitch == 1) {
            this.mouse = createVector(random(width / 3, width / 3 * 2), random(height / 3, height / 3 * 2));
        }
        //mouse = p5.Vector.random2D();
    }

    update() {
        //var mouse = createVector(random(width), random(height));
        this.acc = p5.Vector.sub(this.mouse, this.pos);
        this.acc.setMag(1);

        this.vel.add(this.acc);
        this.vel.limit(veli);

        this.pos.add(this.vel);
    }

    show() {

        paintLayer.noStroke();
        //paintLayer.fill(random(255),random(255),random(255));
        if (colorSwitch == 0) {
            paintLayer.fill(this.r, this.g, this.b);
        } else if (colorSwitch == 1) {
            paintLayer.fill(gr, gg, gb);
        }

        paintLayer.ellipse(this.pos.x, this.pos.y, 20);
    }
}