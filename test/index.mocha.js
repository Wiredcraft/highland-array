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
                lorem.shiftToStream('a string')
            }).should.throwError();
        });
    });
});
