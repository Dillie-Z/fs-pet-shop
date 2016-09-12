var fs = require('fs');
var path = require('path');
var petPath = path.join('pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var argN = process.argv[3];

if (cmd === 'read') {
    fs.readFile(petPath, (err, data) => {
        if (err) {
            console.error('Something went wrong... I blame you... muhaha', err);
            return;
        }
        var pets = JSON.parse(data);
        if (argN === undefined) {
            console.log(pets);
        } else if (argN >= pets.length || argN < 0) {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
            return;
        } else {
            console.log(pets[argN]);
        }
    })
} else if (cmd === 'create') {
    fs.readFile(petPath, (readErr, data) => {
        if (readErr) {
            console.error('Something went wrong with your input... I blame your skills!');
            return;
        }
        var pets = JSON.parse(data);
        var petAge = process.argv[3];
        var petKind = process.argv[4];
        var petName = process.argv[5];

        if (!petAge) {
            console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
            return;
        }
        if (!petKind) {
            console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
            return;
        }
        if (!petName) {
            console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
            return;
        }
        var pet = {
            age: petAge,
            kind: petKind,
            name: petName
        }
        pets.push(pet);

        var petsJSON = JSON.stringify(pets);

        fs.writeFile(petPath, petsJSON, (writeErr) => {
            if (writeErr) {
                console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
                return;
            }
            console.log(pet);
        });

    });
} else if (cmd === 'update') {
  // i have not tested update yet!!!
    fs.readFile(petPath, (upperErr, data) => {
        if (upperErr) {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
            return
        };
        var pets = JSON.parse(data);
        var petIndex = process.argv[3];
        var petAge = process.argv[4];
        var petKind = process.argv[5];
        var petName = process.argv[6];
        if (!petIndex) {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
            return
        }
        if (!petAge) {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
            return
        }
        if (!petKind) {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
            return
        }
        if (!petName) {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
            return
        }
        pets[petIndex] = {
            age: petAge,
            kind: petKind,
            name: petName
        }
        var petsJSON = JSON.stringify(pets)
        fs.writeFile(petPath, petsJSON,(updateErr)=>{
          if(updateErr){
            console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
            return;
          }
          console.log(pets[petIndex]);
        })
    })

} else if (cmd === 'destroy') {
  // i have not tested destroy yet.
  fs.readFile(petPath, (destErr,data)=>{
    if(destErr){
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
    }
    var pets = JSON.parse(data);
    var petIndex = process.argv[3];
    if(!petIndex){
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
    };

    console.log(pets[petIndex]);
    pets.splice(petIndex,1)
    var petsJSON = JSON.stringify(pets)
    fs.writeFile(petPath, petsJSON,(destroyErr)=>{
      if (destroyErr) {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
        return;
      }
    })
  })

}else{
  console.error(`Usage: ${node} ${file} ${cmd} CMD?`);
}
