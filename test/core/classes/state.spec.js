import State from './../../../src/core/classes/State.js';
import Gesture from './../../../src/gestures/Gesture.js';

/** @test {State} */
describe('State', function () {
  var state = new State();
  it('should be instantiated', function () {
    expect(state).to.not.equal(null);
  });

  it('should have no inputs', function () {
    expect(state.inputs).to.be.empty;
  });

  it('should have no bindings', function () {
    expect(state.bindings).to.be.empty;
  });

  it('should have instances of the 6 default gestures', function () {
    var gestures = ['expand', 'pan', 'pinch', 'rotate', 'swipe', 'tap'];
    for (var i = 0; i < state.registeredGestures.length; i++) {
      expect(gestures.indexOf(state.registeredGestures[i].type)).to.not.equal(-1);
    }
  });
});

/** @test {State.addBinding} */
describe('State.addBinding', function () {

  it('should add a binding to a registered gesture', function () {
    var state = new State();
    state.addBinding(document.body, 'tap', function () {}, false, false);

    expect(state.bindings.length).to.equal(1);
  });

  it('should add a binding to a gesture instance', function () {
    var state = new State();
    state.addBinding(document.body, new Gesture(), function () {}, false, false);

    expect(state.bindings.length).to.equal(1);
  });

  it('should not add a binding to a non-registered gesture', function () {
    expect(function () {
      var state = new State();
      state.addBinding(document.body, 'foobar', function () {}, false, false);
    }).to.throw('Parameter foobar is not a registered gesture');
  });

  it('should not add a binding to an object not of the Gesture type', function () {
    expect(function () {
      var state = new State();
      state.addBinding(document.body, {}, function () {}, false, false);
    }).to.throw('Parameter for the gesture is not of a Gesture type');
  });

  //it('should not add a binding to an object not of the Gesture type', function () {
  //  var state = new State();
  //  expect(state.addBinding(document.body, {}, function () {}, false, false)).to.be.null;
  //});

});

/** @test {State.retrieveBindings} */
describe('State.retrieveBindings', function () {
  var state = new State();
  state.addBinding(document.body, 'tap', function () {}, false, false);

  it('should retrieve no bindings for elements without any', function () {
    expect(state.retrieveBindingsByElement(document)).to.be.empty;
  });

  it('should retrieve bindings for elements that are bound', function () {
    expect(state.retrieveBindingsByElement(document.body)).to.not.be.empty;
  });
});
