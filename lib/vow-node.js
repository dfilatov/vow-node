var Vow = require('vow'),
    slice = Array.prototype.slice,
    VowNode = module.exports = {
        promisify : function(nodeFn) {
            return function() {
                var args = slice.call(arguments);
                args.unshift(nodeFn);
                return VowNode.invoke.apply(this, args);
            }
        },

        invoke : function(nodeFn) {
            var promise = Vow.promise(),
                args = slice.call(arguments, 1);

            args.push(function(err, val) {
                err === null?
                    promise.fulfill(val) :
                    err instanceof Error?
                        promise.reject(err) :
                        promise.fulfill(err);
            });

            try {
                nodeFn.apply(this, args);
            }
            catch(e) {
                promise.reject(e);
            }

            return promise;
        }
    };