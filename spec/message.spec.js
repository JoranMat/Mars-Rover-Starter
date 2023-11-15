const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    
    test("throws an error if a name is NOT passed into the constructor as the first parameter", function(){
        expect( function() { new Message();}).toThrow(new Error('name required.'));
    });

    test("constructor sets name", function(){
        let name = "someName";
        let someMessage = new Message(name);
        expect(someMessage.name).toBe(name);
    });

    test("contains a commands array passed into the constructor in the 2nd argument", function(){
        let name = "someName";
        let commands = [];
        let someMessage = new Message(name,commands);
        expect(someMessage.commands).toBe(commands);
    });

});
