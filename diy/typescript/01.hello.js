function sayHello(person) {
    if (typeof person === 'string') {
        return 'Hello,' + person;
    }
    else {
        throw new Error('person is not a string');
    }
}
// let user = 'CAT'
var user = 0;
var createByNewBoolean = new Boolean(1);
console.log(sayHello(user));
