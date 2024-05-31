class Vehicle {
    start(): void {
        console.log("Engine start");
    }

    roll(): void {
        console.log("Wheel roll");
    }
}


class Car extends Vehicle {


    dirve(): void {
        super.start();
        super.roll();
    }

}