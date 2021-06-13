console.log("Text Farming Sim");

let plots = [
    {
        nameOfplant: "",
        health: 0,
        dayPlanted: 0,
        age: "",
        watered: false,
        readyForHarvest: false,
        occupyingPlot: false,        
    },
    {
        nameOfplant: "",
        health: 0,
        dayPlanted: 0,
        age: "",
        watered: false,
        readyForHarvest: false,
        occupyingPlot: false,        
    },
    {
        nameOfplant: "",
        health: 0,
        dayPlanted: 0,
        age: "",
        watered: false,
        readyForHarvest: false,
        occupyingPlot: false,                
    }
];

let gameOver = false;
let dayOver = false;
let day = 0;
let money = 0;
let energy = 0;
let inventory = [];
let input = "";

function mainFunc() {

    while (!gameOver) {

        energy = 30;
        console.log(`It is day: ${day}`);        
        console.log(`Your energy is ${energy}`);
        console.log(`Your money  is $${money}`);

        if(inventory.length>0){
            console.log(inventory[0]);            
        }
        
        while (!dayOver) {

            console.log("Main Menu");
            console.log(`Your Current energy is: ${energy}`);
            input = prompt("Enter a command: farm, store, end, quit");

            if(input === "end"){
                dayOver = true;
                day++;
                endDay();
            }

            else if (energy > 0) {

                if (input === "game over" || input === "quit") {
                    dayOver = true;
                    gameOver = true;
                }

                else if (input === "farm") {
                    checkFarm();
                }

                else if(input === "store"){
                    checkStore();
                }

                if (energy <= 0) {
                    dayOver = true;
                    day++;
                    endDay();
                }                 
            }
        }

        dayOver = false;
    }

    console.log("You ended the game");
}
function checkInventory() {

}

function checkFarm() {

    input = prompt("FARM -> Enter a Command: plants, back");
    if (input === "plants") {
        checkPlants();
    }
    else if (input === "back") {
        return;
    }
}

function checkStore() {

    let doneWithScene = false;

    while (!doneWithScene) {
        if(input === "check-price"){
            thisInput = prompt("Which Plant?");
                if(thisInput < inventory.length){
    
                    let price = checkPlantPrice(inventory[thisInput].name, inventory[thisInput].age)
                    console.log(`I will pay you $${price} for that.`)
                }
                else{
                    console.log("That is an invalid value")
                }
        }
    
        if(input === "sell"){
            thisInput = prompt("Which Plant?");
            if(thisInput < inventory.length){
    
                let price = checkPlantPrice(inventory[thisInput].name, inventory[thisInput].age)
                sellPlant(inventory[thisInput].name, inventory[thisInput].age);
    
                console.log(`You got $${price} for that!`)
                console.log(`Money: ${money}`);
    
                
    
            }
            else{
                console.log("That is an invalid value")
            }
        }
    
        //can sell crops here
    
        //can buy crop seeds -> tomatos, onions or potatoes seeds.


        if(input ==="done"){
            doneWithScene = true;
        }

        if(!doneWithScene){
            input = prompt("Do you want to sell or buy?: sell, check-price, done")
        }
    }
}

function endDay() {
    for (let i = 0; i < plots.length; i++) {

        if (plots[i].occupyingPlot) {
            plots[i].age = day - parseInt(plots[i].dayPlanted);
        }
        
        if(!plots[i].watered){
            plots[i].health -= 10;
        }
        else{
            plots[i].watered = false;
        }
        
        if(plots[i].health <=0){
            clearPlant(i);
        }

        checkPlantHarvest(plots[i]);

        //check if plant is ready to harvest, this is different for each type

    }
}

function checkPlantHarvest(plant){

    if(plant.nameOfplant === "Tomato"){

        if(plant.age > 3){
            plant.readyForHarvest = true;
        }
    }
}

function checkPlantPrice(name, health){

    if(name === "Tomato"){
        if(health > 30){
            return 100;
        }
        else{
            return 50;
        }
    }

}

function sellPlant(name, health){

    inventory.splice(name, 1);
    money = money + checkPlantPrice(name, health);

}

function clearPlant(num){
    plots[num].dayPlanted = 0;
    plots[num].age = 0;
    plots[num].nameOfplant = "";
    plots[num].occupyingPlot = false;
    plots[num].health = 0;
    plots[num].readyForHarvest = false;
    plots[num].watered = false;    
}

function checkPlants() {

    let doneWithScene = false;
    //check which element in plots is empty

    for (let i = 0; i < plots.length; i++) {
        console.log(plots[i]);
    }

    while (!doneWithScene) {

        //pick an empty plot

        if (input === "plant") {
            for (let i = 0; i < plots.length; i++) {
                if (plots[i].occupyingPlot === false) {
                    plots[i].dayPlanted = day;
                    plots[i].age = day - parseInt(plots[i].dayPlanted);
                    plots[i].nameOfplant = "Tomato";
                    plots[i].occupyingPlot = true;
                    plots[i].health = 50;
                    plots[i].readyForHarvest = false;
                    plots[i].watered = false;
                    energy = energy - 10;
                    break;
                }
            }

        }

        if(input === "water"){
            thisInput = prompt("Which Plant?");
            if(thisInput < plots.length){
                if(plots[thisInput].occupyingPlot){
                    if(plots[thisInput].readyForHarvest){
                        console.log("This plant is ready for harvest!");
                    }
                    else if(!plots[thisInput].watered){
                        plots[thisInput].watered = true;
                        plots[thisInput].health += 10;
                        energy = energy - 10;
                    }else{
                        console.log("this plant is already watered!");
                    }
                }
                else{
                    console.log("There is nothing planted here")
                }
            }
            
        }

        if(input === "harvest"){
            thisInput = prompt("Which Plant?");
            if(thisInput < plots.length){
                if(plots[thisInput].readyForHarvest){
                    inventory.push(
                            {
                                name : plots[thisInput].nameOfplant, 
                                health : plots[thisInput].health
                            }
                        );
                    clearPlant(thisInput);
                    energy = energy - 10;
                }
            }
            else{
                console.log("This isnt a valid plot");
            }
        }

        if(input ==="done"){
            doneWithScene = true;
        }

        if(!doneWithScene){
            input = prompt("PLANTS -> What do you want to do?: plant, water, harvest, done");
        }
        
    }
}