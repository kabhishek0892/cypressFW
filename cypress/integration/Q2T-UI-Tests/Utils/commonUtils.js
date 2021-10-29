/* Function to generate combination of password */
export function RandomFn(input) {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (var i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random()
            * str.length + 1);

        pass += str.charAt(char)
    }
    if (input == 'email') { return pass + '@testdomain.com' }
    else { return pass }
}