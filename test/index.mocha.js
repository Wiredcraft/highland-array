var debug = require('debug')('carcass:test');

require('../');
var _ = require('highland');
var lorem = null;

describe('Highland Array:', function() {

    it('Array should be polluted', function() {
        Array.prototype.should.have.property('shiftToStream').with.type('function');
    });

    describe('An array:', function() {

        before(function() {
            lorem = [];
        });

        it('should be an array', function() {
            lorem.should.be.instanceOf(Array).and.have.lengthOf(0);
        });

        it('should have the additional methods', function() {
            lorem.should.have.property('shiftToStream').with.type('function');
        });

    });

    describe('The shiftToStream() method:', function() {

        before(function() {
            lorem = ['lorem', 'ipsum', 'dolor'];
        });

        it('should return a stream', function() {
            lorem.should.have.lengthOf(3);
            _.isStream(lorem.shiftToStream()).should.be.ok;
            lorem.should.have.lengthOf(3);
        });

        it('can shift a value', function(done) {
            lorem.should.have.lengthOf(3);
            lorem.shiftToStream().pull(function(err, item) {
                item.should.equal('lorem');
                lorem.should.have.lengthOf(2);
                done();
            });
        });

        it('can shift all values', function(done) {
            lorem.should.have.lengthOf(2);
            lorem.shiftToStream().toArray(function(res) {
                res.should.eql(['ipsum', 'dolor']);
                lorem.should.have.lengthOf(0);
                done();
            });
        });

        it('can shift more once there are more', function(done) {
            lorem.should.have.lengthOf(0);
            lorem.push('lorem');
            lorem.should.have.lengthOf(1);
            lorem.shiftToStream().toArray(function(res) {
                res.should.eql(['lorem']);
                lorem.should.have.lengthOf(0);
                done();
            });
        });

    });

    describe('The shiftToStream() method in a different context', function() {

        var ctx = {};

        before(function() {
            lorem = ['lorem', 'ipsum', 'dolor'];
            ctx.stream = lorem.shiftToStream();
        });

        it('can shift a value', function(done) {
            lorem.should.have.lengthOf(3);
            ctx.stream.pull(function(err, item) {
                item.should.equal('lorem');
                lorem.should.have.lengthOf(2);
                done();
            });
        });

        it('can shift all values', function(done) {
            lorem.should.have.lengthOf(2);
            ctx.stream.toArray(function(res) {
                res.should.eql(['ipsum', 'dolor']);
                lorem.should.have.lengthOf(0);
                done();
            });
        });

        it('seems not so useful since it does not allow more than one consumer');

    });

    describe('The shiftToStream() method with a callback:', function() {

        before(function() {
            lorem = ['lorem', 'ipsum', 'dolor'];
        });

        it('should return a stream', function() {
            lorem.should.have.lengthOf(3);
            _.isStream(lorem.shiftToStream(function() {})).should.be.ok;
            lorem.should.have.lengthOf(3);
        });

        it('can shift and convert a value', function(done) {
            lorem.should.have.lengthOf(3);
            lorem.shiftToStream(function(item) {
                return item + ' sit';
            }).pull(function(err, item) {
                item.should.equal('lorem sit');
                lorem.should.have.lengthOf(2);
                done();
            });
        });

        it('can shift and convert all values', function(done) {
            lorem.should.have.lengthOf(2);
            lorem.shiftToStream(function(item) {
                return item + ' sit';
            }).toArray(function(res) {
                res.should.eql(['ipsum sit', 'dolor sit']);
                lorem.should.have.lengthOf(0);
                done();
            });
        });

        it('can shift and convert more once there are more', function(done) {
            lorem.should.have.lengthOf(0);
            lorem.push('lorem');
            lorem.should.have.lengthOf(1);
            lorem.shiftToStream(function(item) {
                return item + ' sit';
            }).toArray(function(res) {
                res.should.eql(['lorem sit']);
                lorem.should.have.lengthOf(0);
                done();
            });
        });

    });

    describe('The shiftToStream() method with a bad callback:', function() {

        before(function() {
            lorem = ['lorem', 'ipsum', 'dolor'];
        });

        it('should throw an error', function() {
            (function() {
                lorem.shiftToStream('not a function');
            }).should.throwError();
        });

    });

    describe('Example for readme:', function() {

        it('should work', function(done) {
            var theArray = [1, 2, 3, 4];
            theArray.shiftToStream().once('end', function() {
                // the array will be empty in the end
                theArray.should.eql([]);
                done();
            }).each(function(x) {
                // will be called 4 times with x being 1, 2, 3 and 4
                debug(x);
            });
        });

        it('should work', function(done) {
            // optionally give it a callback
            var theArray = [1, 2, 3, 4];
            theArray.shiftToStream(function(x) {
                return x * 2;
            }).once('end', function() {
                // the array will be empty in the end
                theArray.should.eql([]);
                done();
            }).each(function(x) {
                // will be called 4 times with x being 2, 4, 6 and 8
                debug(x);
            });
        });

    });

});
