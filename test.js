mocha.setup('bdd');

let assert = chai.assert;

describe('Square roots', function() {
    it('тест 1,1,1 -> нет корней', function() {
        assert.deepEqual(squareRoots(1,1,1),[]);
    });

    it('тест 1,-2,-3 -> два корня 3,-1', function() {
        assert.deepEqual(squareRoots(1,-2,-3),[3,-1]);
    });

    it('тест -1,-2,15 -> два корня -5,3', function() {
        assert.deepEqual(squareRoots(-1,-2,15),[-5,3]);
    });

    it('тест 1,12,36 -> один корень -6', function() {
        assert.deepEqual(squareRoots(1, 12, 36),[-6]);
    });

    it('тест 0,5,-10 -> один корень 2', function() {
        assert.deepEqual(squareRoots(0,5,-10),[2]);
    });
});

mocha.run();