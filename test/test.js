require('should');
var mocha = require('mocha');


describe('everywhere', function () {
    it('should find', function () {
        var everywhere1 = require('../index');
        everywhere1.addLookup("find1", './test/find1');
        everywhere1.addLookup("find2", './test/find2');

        var everywhere2 = require('../index');
        everywhere2.get('find1')().should.equal("FIND1");
        everywhere2.get('find2')().should.equal("FIND2");
    });


    it('should add lookup successfully', function () {
        var everywhere1 = require('../index');
        var result = everywhere1.addLookup("find1", './test/find1');
        (undefined === result).should.be.true;
    });


    it('should not find path and return what was looked being looked for', function () {
        var everywhere1 = require('../index');
        var result = everywhere1.addLookup("find1", './what');

        var expected = "everywhere/what";
        result.substring(result.length - expected.length).should.eql(expected);
    });
});
