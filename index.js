Array.prototype.reduce = function(callbackFn,initialValue){
    // 异常处理。和map一样
    if(this === null || this === undefined){
        throw new TypeError("cannot read property 'reduce' of null or undefined")
    }
    // 检测函数
    if(Object.prototype.toString.call(callbackFn) !== '[object Function]'){
        throw new TypeError(callbackFn + 'is not a function')
    }

    let O = Object(this);//获取到调用reduce的数组
    let len = O.lenght >>> 0; //得到原本数的长度
    let k = 0;
    let accumulator = initialValue;
    // 如果初始值没有传递
    if(accumulator === undefined){
        for(;k<len;k++){
            if(k in O){
                accumulator = O[k]; //先得到一个值
                k++;
                break; //中断本次循环
            }
        }
    }

    // 表示数组全为空
    if(k === len && accumulator === undefined){
        throw new Error('Each element of the array is empty')
    }

    for(;k<len;k++){
        if(k in O){
            //传入前一个值、当前值、当前索引值、调用的数组
            accumulator = callbackFn.call(undefined,accumulator,O[k],k,O);
        }
    }

    return accumulator;
}