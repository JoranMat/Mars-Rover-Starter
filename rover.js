class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message){
      let response = {
         message: message.name,
         results: []
      };

      for(let i =0;i<message.commands.length;i++){
         let command = message.commands[i];

      if(command.commandType === 'MODE_CHANGE'){
         this.mode = command.value;
         response.results.push({completed: true});
      }

      else if(command.commandType === 'STATUS_CHECK'){
         response.results.push({completed: true,
            roverStatus: {
               position: this.position,
               mode: this.mode,
               generatorWatts: this.generatorWatts
            }
         });
      }

      else if(command.commandType === 'MOVE'){
         if(this.mode === 'LOW_POWER'){
            response.results.push({completed: false});
         }
         else{
            response.results.push({completed: true});
            this.position = command.value;
         }
      }
      }
      
      return response;
   }

}

module.exports = Rover;