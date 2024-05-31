class Engine {
    start(): void {
        console.log("Engine start");
    }
}

class Wheel {
    roll(): void {
        console.log("Wheel roll");
    }
}

class Car {

    constructor(private engine: Engine, private wheel: Wheel) {}

    dirve(): void {
        this.engine.start();
        this.wheel.roll();
    }

}

export function driveCar(): void {
    const engine: Engine = new Engine();
    const wheel: Wheel = new Wheel();
    const car: Car = new Car(engine, wheel);
    
    console.log(car.dirve());
}
