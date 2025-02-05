// Croquet Tutorial 1
// Hello World 
// Croquet Corporation 
// 2021

class MyModel extends Croquet.Model {

    init() {
        this.count = 0;
        this.subscribe("counter", "reset", this.resetCounter);
        this.future(1000).tick();
    }

    resetCounter() {
        this.count = 0;
        this.publish("counter", "changed");
    }

    tick() {
        this.count++;
        this.publish("counter", "changed");
        this.future(1000).tick();
    }

}

MyModel.register("MyModel");

class MyView extends Croquet.View {

    constructor(model) {
        super(model);
        this.model = model;
        countDisplay.onclick = event => this.counterReset();
        this.subscribe("counter", "changed", this.counterChanged);
        this.counterChanged();
    }

    counterReset() {
        this.publish("counter", "reset");
    }

    counterChanged() {
        countDisplay.textContent = this.model.count;
    }

}

Croquet.Session.join({
    appId: "liangxiaowei.github.io",
    apiKey: "2mLb3ZO6u71RmOGDfr92NITJ9gxMx0QjhB0PS0mot0",


//   appId: "io.codepen.croquet.hello",
//   apiKey: "1_9oolgb5b5wc5kju39lx8brrrhm82log9xvdn34uq",
  name: "unnamed",
  password: "secret",
  model: MyModel,
  view: MyView});