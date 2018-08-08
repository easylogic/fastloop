import fastloop from '../src/index'

test('default fastloop', () => {
    let test = [] 
    fastloop(10, 0, 1, function (i) {
        test.push(i)
    }, function () {
        expect(test.length).toBe(10)
    })
});

test('fastloop step test ', () => {
    let test = [] 
    fastloop(10, 0, 4, function (i) {
        test.push(i)
    }, function () {
        expect(test.length).toBe(3)
    })
});

test('fastloop many loop ', () => {
    let test = [] 
    fastloop(1000000, 0, 4, function (i) {
        test.push(i)
    }, function () {
        expect(test.length).toBe(1000000/4)
    }, 50)
});