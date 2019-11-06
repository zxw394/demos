function Promise (fn) {
    // promise 状态变量
    // 0 - pending
    // 1 - resolved
    // 2 - rejected
    this._state = 0;
    // promise 执行结果
    this._value = null;
    // then(..) 注册回调处理数组
    this._deferreds = [];
    // 立即执行 fn 函数
    try {
        fn(value => {
            resolve(this, value);
        },reason => {
            reject(this, reason);
        })
    } catch (err) {
        // 处理执行 fn 异常
        reject(this, err);
    }
}

Promise.prototype.then = function (onResolved, onRejected) {

    var res = new Promise(function () {});
    // 使用 onResolved，onRejected 实例化处理对象 Handler
    var deferred = new Handler(onResolved, onRejected, res);

    // 当前状态为 pendding，存储延迟处理对象
    if (this._state === 0) {
        this._deferreds.push(deferred);
        return res;
    }

    // 当前 promise 状态不为 pending
    // 调用 handleResolved 执行onResolved或onRejected回调
    handleResolved(this, deferred);

    // 返回新 promise 对象，维持链式调用
    return res;
};

function Handler (onResolved, onRejected, promise) {
    this.onResolved = typeof onResolved === 'function' ? onResolved : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
}

