module.exports = {
    'function should be called with passed arguments' : function(test) {
        var fn = function(param1, param2, cb) {
            test.strictEqual(param1, 'p1');
            test.strictEqual(param2, 2);
            test.ok(typeof cb === 'function');
            test.done();
        };

        VowNode.invoke(fn, 'p1', 2);
    },

    'resulting promise should be fulfilled when callback has called with "null" as first argument' : function(test) {
        VowNode.invoke(function(cb) { cb(null, 'ok'); }).then(
            function(res) {
                test.strictEqual(res, 'ok');
                test.done();
            });
    },

    'resulting promise should be fulfilled when callback has called with "undefined" as first argument' : function(test) {
        VowNode.invoke(function(cb) { cb(undefined, 'ok'); }).then(
            function(res) {
                test.strictEqual(res, 'ok');
                test.done();
            });
    },

    'resulting promise should be fulfilled when callback has called without non-error first argument' : function(test) {
        VowNode.invoke(function(cb) { cb('ok'); }).then(
            function(res) {
                test.strictEqual(res, 'ok');
                test.done();
            });
    },

    'resulting promise should be rejected when callback has called with error-like first argument' : function(test) {
        var e = Error('error');
        VowNode.invoke(function(cb) { cb(e); }).fail(
            function(err) {
                test.strictEqual(err, e);
                test.done();
            });
    },

    'resulting promise should be rejected if function throw exception' : function(test) {
        var err = Error();
        VowNode.invoke(function() { throw err; }).fail(function(_err) {
            test.strictEqual(_err, err);
            test.done();
        });
    }
};
