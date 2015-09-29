The included index.html file is ready to go. Just load it into a browser as a file or with a web server.
If you modify the code, you will need to run the following code from your terminal:
```javascript
npm install
webpack
```
"npm install" installs a "node_modules" directory. After that, all you need to run is "webpack". Webpack loads everything you need into a file named "bundle.js" which is referenced in a script in "index.html". After that, you are good to go.

This demo is running online at [http://transcendent.ninja](http://transcendent.ninja).

If you move "index.html" to a new location, be sure to take "bundle.js" with it.

A development server is included in this repository, so you can view the buttons on port 8080 by entering:
```javascript
webpack-dev-server
```
Quite a bit of commentary is included with the online app at [http://transcendent.ninja](http://transcendent.ninja), where explanations can be seen next to running code.

The monads are instances of the following classes:
```javascript
class Monad {
  constructor(z) {

    this.x = mobservable.makeReactive(z);

    this.bnd = (func, ...args) => {
      return func(this.x(), ...args);
    };

    this.ret = (a) => {
      this.x(a);
      return this;
    };
  }
};

class MonadObject {
  constructor(ob) {

    this.x = mobservable.makeReactive(ob);

    this.bnd = (func, ...args) => {
      return func(this.x, ...args);
    };

    this.ret = w => {
      Object.assign(this.x, w);
      return this;
    }
  }
}

class MonadArray {
  constructor(z) {

    this.x = mobservable.makeReactive(z);

    this.bnd = (func, ...args) => {
      return func(this.x, ...args);
    };

    this.ret = (a) => {
      this.x.replace(a);
      return this;
    };
  }
};

```
The 'bnd' method's first argument, 'func', maps from the value of the calling monad to an instance of the calling monad's class. For example, 'obDouble' doubles the value of each element of its argument (or concatenates them with themselves if they are strings). monadObject.bnd(obDouble) applies obDouble to 'monadObjects' value. The code is:
```javascript

obDouble = x => {
  for (let o in x) {
    x[o] = x[o] + x[o];
  }
  return new MonadObject(x);
}
```
The function 'obReplace' is more complex.
```javascript

obReplace = (x,y) => {
  for (let e in y) {
    x[e] = y[e];
  }
  return new MonadObject(x);
}
```
Here is 'Example 9' from the demonstration:
```javascript
onClick={() => {this.mo1
  .ret({a: 3, b: 3,c:3})
  .bnd(this.mo2.ret)
  .bnd(this.obCube)
  .bnd(this.mo3.ret)
  .bnd(this.obReplace, ({a: 'Done', b: 'b', c: 'c'}))}}
```
'ret' with an argument at the beginning gives 'mo1' a value of '{a: 3, b: 3, c: 3}'. 'ret' in '.bnd(this.mo2.ret)' shifts the target to the mo2 monad so '.bnd(this.obCube)' causes the value '{a: 27, b: 27, c: 27}' to be placed in monad 'mo2'.

In the Haskell programming language, bind is represented by '>>='. In order to be a member of the Monad type class, an entity must conform with the following three rules:

```javascript

return a >>= k             = k a
m >>= return               = m
m >>= (\x -> k x >>= h)    = (m >>= k) >>= h

```

In this demonstration, 'bnd' is the counterpart to '>>=' and 'ret' is counterpart to 'return'. The monad rules are obeyed in all of the MonadObject examples.

##Working With Numbers

Here is code from the B2.jsx section named "Working With Numbers":

We begin by executing 'mAdd' three times; once to assign the value of 'm + 100' to 'm3', and twice to give the calculated sum to 'm' and then to 'm2'. Here is the code for 'mAdd':

```
    mAdd = (z,w,mon) => {
      return mon.ret(z + w);
     }

```

'z' is the value of the calling monad, which is 'm'. 'm' starts out with a value of '1'. 'mAdd' gives that value plus 100 to 'm3'. The display here confirms that m is an object with a method 'x' which returns '1' when called with no argument. That is the expected behavior of a mobservabale reactive primitive value.

###Chaining

'm3.bnd' is then called with argument '(this.mAdd,0,this.m2)' in order to give m2 the value held by 'm3' (plus 0); i.e., 100 plus the original value of m.

Here is the code that causes m, m2, and m3 to all have the value 101 on the first click, 201 on the next click, etc.:

```javascript

this.m
.bnd(this.mAdd,100,this.m3)
.bnd(this.mAdd,0,this.m)
.bnd(this.mAdd,0,this.m2)}

```
Here is the code again for 'Monad':

```javascript

class Monad {
  constructor(z) {
    this.x = mobservable.makeReactive(z);
    this.bnd = (func, ...args) => {
      return func(this.x(), ...args);
    };
    this.ret = a => {
      this.x(a);
       return this;
     };
   }
 };

```

Click to decrease m.

Click to see a six-link chain of bnd.

```javascript

this.m
.bnd(this.mAdd,1,this.m)
.bnd(this.mAdd,3,this.m)
.bnd(this.fmSquare)
.bnd(this.mAdd,1,this.m)
.bnd(this.fmSquare)
.bnd(this.mAdd,7,this.m)

```
Left Identity

Click to see "this.m.ret(42).bnd(this.m.x)"

Right Identity

Click to see this.m.bnd(this.m.ret).bnd(this.m2). (".bnd(this.m2)" puts the result in m2)

Associativity

Click to bind mAdd,1,m to m.x, and then bind fmSquare to the result.

Click to bind fmAdd_then_Square to m.x.

Miscellaneous

Click to observe 'this.m3.bnd(this.fibo). It generates the fibonacci sequence.

Click to re-set m.

Click to reset m2.

Click to reset m3.

The following code demonstrates that ordinary objects behave just like monads when the values of properties are changed:

```javascript
var o = {a: 1, b: 2};
var o2 = o;
o2.a = "Janet";
o2.b = 42;
console.log(o);
console.log(o2);
```
As expected, the console log displays:

```javascript
{ a: 'Janet', b: 42 }
{ a: 'Janet', b: 42 }
```

I modified the B2.jsx constructor to define some additional monads as follows:

```javascript
@reactiveComponent class B5 extends React.Component {
  constructor(props) {
    super(props);
    this.m = new Monad(1);
    this.m4 = new Monad(1);
    this.m5 = this.m.ret(1);
    this.m6 = this.m.ret(777);
    this.m7 = this.m6.ret('Fred');
    this.m8 = this.m4.ret('Steve');
    console.log("this.m = new Monad(1)\nthis.m4 = new Monad(1)\nthis.m5 = this.m.ret(1)\nthis.m6 = " +
      "this.m.ret(777)\nthis.m7 = this.m6.ret('Fred');\nthis.m8 = this.m4.ret('Steve');");
    console.log("***************************");
    console.log("m.x() == m4.x()", this.m.x(), this.m4.x(),this.m == this.m4);
    console.log("m.x() == m5.x()", this.m.x(), this.m5.x(),this.m == this.m5);
    console.log("m.x() == m6.x()", this.m.x(), this.m6.x(),this.m == this.m6);
    console.log("m.x() == m7.x()", this.m.x(), this.m7.x(),this.m == this.m7);
    console.log("m.x() == m8.x()", this.m.x(), this.m8.x(),this.m == this.m8);
    console.log('');
    console.log("m.x() === m4.x()", this.m.x(), this.m4.x(),this.m == this.m4);
    console.log("m.x() === m5.x()", this.m.x(), this.m5.x(),this.m == this.m5);
    console.log("m.x() === m6.x()", this.m.x(), this.m6.x(),this.m == this.m6);
    console.log("m.x() === m7.x()", this.m.x(), this.m7.x(),this.m == this.m7);
    console.log("m.x() === m8.x()", this.m.x(), this.m8.x(),this.m == this.m8);
    console.log("***************************");
```

The output in the console is:

```javascript
this.m = new Monad(1)
this.m4 = new Monad(1)
this.m5 = this.m.ret(1)
this.m6 = this.m.ret(777)
this.m7 = this.m6.ret('Fred');
this.m8 = this.m4.ret('Steve');
bundle.js:1119 ***************************
bundle.js:1120 m.x() == m4.x() Fred Steve false
bundle.js:1121 m.x() == m5.x() Fred Fred true
bundle.js:1122 m.x() == m6.x() Fred Fred true
bundle.js:1123 m.x() == m7.x() Fred Fred true
bundle.js:1124 m.x() == m8.x() Fred Steve false
bundle.js:1125
bundle.js:1126 m.x() === m4.x() Fred Steve false
bundle.js:1127 m.x() === m5.x() Fred Fred true
bundle.js:1128 m.x() === m6.x() Fred Fred true
bundle.js:1129 m.x() === m7.x() Fred Fred true
bundle.js:1130 m.x() === m8.x() Fred Steve false
bundle.js:1131 ***************************
```

m and m4 are the only unique monads. m5, m6, and m7 are references to m1 while m8 points to m4. As the domonstration shows, m4 can be changed by altering m8. There isn't anything magical or mystical about my objects which I call 'generalized monads'. Let an object have three elements, one value and two methods: 'bind' and 'return'. The one value can consist of thousands of lines of code, as long as everything is contained in a single object or array. How much does that sound like 'render' in React?

I sometimes say 'generalized monads' instead of plain 'monads' because 'bnd' can take multiple arguments but Haskell monads can operate on only one. That one argument can be long list of nested lists, so the requirement doesn't limit Haskell.

Monads allowed Haskell remain pure while having the side effects. The Warp web server shows how well this is working out. But Javascript is side effects city. It doesn't need no stinking monads, at least not for side effects.

I don't know if havinapsulating mobservable reactive entities in these generalized monads will turn out to have any practical value. Perhaps chaining, as in "this.m.bnd(this.mAdd,1,this.m)
.bnd(this.mAdd,3,this.m).bnd(this.fmSquare) .bnd(this.m2)
.bnd(this.mAdd,1,this.m)
.bnd(this.fmSquare)
.bnd(this.mAdd,7,m)"
(see above), will be useful, perhaps as an alternative to promises for assuring that sychronous operations execute in a specified order. I wonder if feeding websockets messages directly into a branched chain of monads could facilitate performance, safety, and/or maintainability. My [Game of Score](http://machinegun.ninja) is a good candidate for that. It does a variety of things depending on message prefixes.

It was the realization that mobservable reactive primitives provide access to their current as well as their previous values that got me started on this investigation. Some Haskell monads - notably the state monad - hold their current and previous values. I wondered if the there were state monad-like things that could be done well with mobservable reactive entities. Generating the Fibonacci sequence, in which each new number is the sum of the current and previous ones, worked out well.

I considered refactoring mobservable to iinclude return and bind methods. For primitive value reactive entities, return already exists. If p is a number or string, and pReactive =  mobservable.makeReactive(p), pReactive(x) makes x the value of pReactive. All pReactive needs is a bind method that takes a function f as an argument and returns mobservable.makeReactive(f(pReactive())). I couldn't come up with a satisfactory way of doing that; and even if I could, it wouldn't cover objects and arrays.
