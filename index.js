import mobservable from 'mobservable';
module.exports = {
  Monad: class Monad {
    constructor(z) {

      this.x = mobservable.makeReactive(z);

      this.bnd = (func, ...args) => {
        return func(this.x(),this, ...args);
      };

      this.fmap = (func, ...args) => {
        return func(this, ...args);
      };

      this.id = () => {return this};

      this.ret = a => {
        this.x(a);
        return this;
      };
    }
  },

  MonadObject: class MonadObject {
    constructor(ob) {

      this.x = mobservable.makeReactive(ob);

      this.bnd = (func, ...args) => {
        return func(this.x, this, ...args);
      };

      this.fmap = (func, ...args) => {
        return func(this, ...args);
      };

      this.id = () => {return this};

      this.ret = w => {
        Object.assign(this.x, w);
        return this;
      }
    }
  },

  MonadArray: class MonadArray {
    constructor(z) {

      this.x = mobservable.makeReactive(z);

      this.bnd = (func, ...args) => {
        return func(this.x,this, ...args);
      };

      this.fmap = (func, ...args) => {
        return func(this, ...args);
      };

      this.id = () => {return this};

      this.ret = a => {
        this.x.replace(a);
        return this;
      };
    }
  }
}
