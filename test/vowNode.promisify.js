module.exports = {
    'function should be called with passed arguments' : function(test) {
        var fn = VowNode.promisify(function(param1, param2, cb) {
            test.strictEqual(param1, 'p1');
            test.strictEqual(param2, 2);
            test.ok(typeof cb === 'function');
            test.done();
        });

        fn('p1', 2);
    },

    'resulting promise should be fulfilled when callback has called without first argument' : function(test) {
        VowNode.promisify(function(cb) { cb(null, 'ok'); })().then(
            function(res) {
                test.strictEqual(res, 'ok');
                test.done();
            });
    },

    'resulting promise should be fulfilled when callback was called without non-error first argument' : function(test) {
        VowNode.promisify(function(cb) { cb('ok'); })().then(
            function(res) {
                test.strictEqual(res, 'ok');
                test.done();
            });
    },

    'resulting promise should be rejected when callback was called with error-like first argument' : function(test) {
        var e = Error('error');
        VowNode.promisify(function(cb) { cb(e); })().fail(
            function(err) {
                test.strictEqual(err, e);
                test.done();
            });
    },

    'resulting promise should be rejected if function throw exception' : function(test) {
        var err = Error();
        VowNode.promisify(function() { throw err; })().fail(function(_err) {
            test.strictEqual(_err, err);
            test.done();
        });
    }
};