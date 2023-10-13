import { makeObservable, makeAutoObservable, observable, action, computed } from "mobx";

export class Info {
    count: number = 0;
    price = 0;
    amount = 1;
 
    constructor() {
      makeAutoObservable(this);
    //    makeObservable(this, {
    //      count: observable, // 标记observable
    //      price: observable,
    //      amount: observable,
    //      add: action, // 标记action
    //    });
    }
    // 改变observable的方法，会被自动标记为action
    add() {
      this.count += 1;
    }
    get total() {
        console.log("computed render");
        return this.price + this.amount;
    }
    // computed可以有setter方法
    set total(value: number) {
        this.price = value;
    }
 }
 