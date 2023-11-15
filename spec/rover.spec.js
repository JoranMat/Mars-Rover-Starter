const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!

  test("constructor sets position and default for mode and generatorWatts", function(){
    let position = 0;
    let someRover = new Rover(position);
    expect(someRover.position).toBe(position);
    expect(someRover.generatorWatts).toBe(110);
    expect(someRover.mode).toBe('NORMAL');
  });

  test("response returned by recieveMessage contains the name of the message", function(){
    let name = "test name";
    let someRover = new Rover(0);
    let someMessage = new Message(name,'MODE_CHANGE');
    let response = someRover.receiveMessage(someMessage);
    expect(response.message).toBe(name);
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let someCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command("STATUS_CHECK")];
    let someMessage = new Message('test message', someCommands);
    let someRover = new Rover(0);
    let response = someRover.receiveMessage(someMessage);
    expect(response.results.length).toBe(2);
  });

  test("responds correctly to the status check command",function(){
    let someCommands = [new Command('STATUS_CHECK')];
    let someMessage = new Message("test status check command", someCommands);
    let someRover = new Rover()
    let response = someRover.receiveMessage(someMessage);
    expect(response.results[0].completed).toBe(true);
  });

  test("responds correctly to the mode change command",function(){
    let someCommands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let someMessage = new Message('test change mode command', someCommands);
    let someRover = new Rover(0);
    let response = someRover.receiveMessage(someMessage);
    expect(response.results[0].completed).toBe(true);
    expect(someRover.mode).toBe(someCommands[0].value);
  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode",function(){
    let someCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12)];
    let someMessage = new Message('test move in low power mode', someCommands);
    let someRover = new Rover(0);
    let response = someRover.receiveMessage(someMessage);
    expect(response.results[1].completed).toBe(false);
    expect(someRover.position).toBe(0);
  });

  test("responds with the position for the move command",function(){
    let someCommands = [new Command('MOVE', 4000)];
    let someMessage = new Message('test move command', someCommands);
    let someRover = new Rover(100);
    let response = someRover.receiveMessage(someMessage);
    expect(response.results[0].completed).toBe(true);
    expect(someRover.position).toBe(someCommands[0].value);
  });

});
