My applications at [http://schalk.ninja](http://schalk.ninja) and [http://transcendent.ninja](http://transcendent.ninja) have had their code published at Github at [https://github.com/dschalk/mobservable-react-buttons](https://github.com/dschalk/mobservable-react-buttons) and [https://github.com/dschalk/mobservable-monads](https://github.com/dschalk/mobservable-monads)

I uploaded the apps from time to time during development, having .gitignore specify that node_modules should be ignored. I cloned the recently pushed version and either copied a saved node_modules file or ran npm install. My package.json, which I created with "npm init" after installing the node modules, specified only "latest" for the versions.

Several days ago, running npm install and then webpack started to produce bundle.js files resulted in crashes in the browsers. I deleted code  down to a bare-bones B2.jsx file that was supposed to display "Cow" in the browsers. I continued to get the same error messages until I commented out @reactiveComponent.

All of the code is at [https://github.com/dschalk/cow](https://github.com/dschalk/cow).

Here is the file that finally worked:

 ```javascript
 'use strict'
 import React from'react';
 import mobservable from 'mobservable';
 import {reactiveComponent} from 'mobservable-react';
 export {B2};

 // @reactiveComponent class B2 extends React.Component {
 class B2 extends React.Component {
   constructor(props) {
     super(props);
   }
   render = () => {
   return (
     <div> <h1>Cow</h1> </div>
   )}
 }
 React.render(<B2 key='B2' />, document.getElementById('divSix'))
 ```
You can see what I commented out in order to stop getting the following message in Chrome:

[mobservable.view '[m#1]'] Caught error during computation:  TypeError: Cannot call a class as a function
    at _classCallCheck (http://localhost:3000/bundle.js:64:100)
    at B2 (http://localhost:3000/bundle.js:85:6)
    at t.createClass.render (http://localhost:3000/bundle.js:21825:999)
    at null.<anonymous> (http://localhost:3000/bundle.js:21825:1883)
    at ObservableView.compute (http://localhost:3000/bundle.js:21516:43)
    at ObservableView.ViewNode.computeNextState (http://localhost:3000/bundle.js:20644:44)
    at ObservableView.ViewNode.wakeUp (http://localhost:3000/bundle.js:20616:27)
    at ObservableView.ViewNode.setRefCount (http://localhost:3000/bundle.js:20598:27)
    at observe (http://localhost:3000/bundle.js:20765:21)
    at Function.sideEffect (http://localhost:3000/bundle.js:20757:17) View function: function (){r?t.Component.prototype.forceUpdate.call(this):(r=!0,o=n.call(this))}ObservableView.compute @ bundle.js:21521ViewNode.computeNextState @ bundle.js:20644ViewNode.wakeUp @ bundle.js:20616ViewNode.setRefCount @ bundle.js:20598observe @ bundle.js:20765sideEffect @ bundle.js:20757u.componentWillMount.render @ bundle.js:21825ReactCompositeComponentMixin._renderValidatedComponentWithoutOwnerOrContext @ bundle.js:11824ReactCompositeComponentMixin._renderValidatedComponent @ bundle.js:11851ReactPerf.measure.wrapper @ bundle.js:3557ReactCompositeComponentMixin.mountComponent @ bundle.js:11272ReactPerf.measure.wrapper @ bundle.js:3557ReactReconciler.mountComponent @ bundle.js:3632mountComponentIntoNode @ bundle.js:8732Mixin.perform @ bundle.js:4682batchedMountComponentIntoNode @ bundle.js:8753Mixin.perform @ bundle.js:4682ReactDefaultBatchingStrategy.batchedUpdates @ bundle.js:15812batchedUpdates @ bundle.js:3209ReactMount._renderNewRootComponent @ bundle.js:8888ReactPerf.measure.wrapper @ bundle.js:3557ReactMount.render @ bundle.js:8977ReactPerf.measure.wrapper @ bundle.js:3557(anonymous function) @ bundle.js:109__webpack_require__ @ bundle.js:20Object.defineProperty.value @ bundle.js:49__webpack_require__ @ bundle.js:20(anonymous function) @ bundle.js:40(anonymous function) @ bundle.js:43
bundle.js:21522 console.trace()ObservableView.compute @ bundle.js:21522ViewNode.computeNextState @ bundle.js:20644ViewNode.wakeUp @ bundle.js:20616ViewNode.setRefCount @ bundle.js:20598observe @ bundle.js:20765sideEffect @ bundle.js:20757u.componentWillMount.render @ bundle.js:21825ReactCompositeComponentMixin._renderValidatedComponentWithoutOwnerOrContext @ bundle.js:11824ReactCompositeComponentMixin._renderValidatedComponent @ bundle.js:11851ReactPerf.measure.wrapper @ bundle.js:3557ReactCompositeComponentMixin.mountComponent @ bundle.js:11272ReactPerf.measure.wrapper @ bundle.js:3557ReactReconciler.mountComponent @ bundle.js:3632mountComponentIntoNode @ bundle.js:8732Mixin.perform @ bundle.js:4682batchedMountComponentIntoNode @ bundle.js:8753Mixin.perform @ bundle.js:4682ReactDefaultBatchingStrategy.batchedUpdates @ bundle.js:15812batchedUpdates @ bundle.js:3209ReactMount._renderNewRootComponent @ bundle.js:8888ReactPerf.measure.wrapper @ bundle.js:3557ReactMount.render @ bundle.js:8977ReactPerf.measure.wrapper @ bundle.js:3557(anonymous function) @ bundle.js:109__webpack_require__ @ bundle.js:20Object.defineProperty.value @ bundle.js:49__webpack_require__ @ bundle.js:20(anonymous function) @ bundle.js:40(anonymous function) @ bundle.js:43
bundle.js:20659 [mobservable] You have created a view function that doesn't observe any values, did you forget to make its dependencies observable?ViewNode.bindDependencies @ bundle.js:20659ViewNode.computeNextState @ bundle.js:20645ViewNode.wakeUp @ bundle.js:20616ViewNode.setRefCount @ bundle.js:20598observe @ bundle.js:20765sideEffect @ bundle.js:20757u.componentWillMount.render @ bundle.js:21825ReactCompositeComponentMixin._renderValidatedComponentWithoutOwnerOrContext @ bundle.js:11824ReactCompositeComponentMixin._renderValidatedComponent @ bundle.js:11851ReactPerf.measure.wrapper @ bundle.js:3557ReactCompositeComponentMixin.mountComponent @ bundle.js:11272ReactPerf.measure.wrapper @ bundle.js:3557ReactReconciler.mountComponent @ bundle.js:3632mountComponentIntoNode @ bundle.js:8732Mixin.perform @ bundle.js:4682batchedMountComponentIntoNode @ bundle.js:8753Mixin.perform @ bundle.js:4682ReactDefaultBatchingStrategy.batchedUpdates @ bundle.js:15812batchedUpdates @ bundle.js:3209ReactMount._renderNewRootComponent @ bundle.js:8888ReactPerf.measure.wrapper @ bundle.js:3557ReactMount.render @ bundle.js:8977ReactPerf.measure.wrapper @ bundle.js:3557(anonymous function) @ bundle.js:109__webpack_require__ @ bundle.js:20Object.defineProperty.value @ bundle.js:49__webpack_require__ @ bundle.js:20(anonymous function) @ bundle.js:40(anonymous function) @ bundle.js:43
bundle.js:20770 [mobservable.sideEffect] not a single observable was used inside the side-effect function. Side-effect would be a no-op.
bundle.js:773 Uncaught Error: Invariant Violation: B2.render(): A valid ReactComponent must be returned. You may have returned undefined, an array or some other invalid object.invariant @ bundle.js:773ReactCompositeComponentMixin._renderValidatedComponent @ bundle.js:11856ReactPerf.measure.wrapper @ bundle.js:3557ReactCompositeComponentMixin.mountComponent @ bundle.js:11272ReactPerf.measure.wrapper @ bundle.js:3557ReactReconciler.mountComponent @ bundle.js:3632mountComponentIntoNode @ bundle.js:8732Mixin.perform @ bundle.js:4682batchedMountComponentIntoNode @ bundle.js:8753Mixin.perform @ bundle.js:4682ReactDefaultBatchingStrategy.batchedUpdates @ bundle.js:15812batchedUpdates @ bundle.js:3209ReactMount._renderNewRootComponent @ bundle.js:8888ReactPerf.measure.wrapper @ bundle.js:3557ReactMount.render @ bundle.js:8977ReactPerf.measure.wrapper @ bundle.js:3557(anonymous function) @ bundle.js:109__webpack_require__ @ bundle.js:20Object.defineProperty.value @ bundle.js:49__webpack_require__ @ bundle.js:20(anonymous function) @ bundle.js:40(anonymous function) @ bundle.js:43
bundle.js:20850 Welcome to mobservable. Current logLevel = 2. Change mobservable.logLevel according to your needs: 0 = production, 1 = development, 2 = debugging
