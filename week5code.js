class Nurse {
  constructor(name, unit) {
    this.name = name;
    this.unit = unit;
  }

  describe() {
    return `s${this.name} plays ${this.unit}.`;
  }
}

class Floor {
  constructor(name) {
    this.name = name;
    this.floors = [];
  }

  addNurse(floor) {
    if (floor instanceof Nurse) {
      this.floors.push(floor);
    } else {
      throw new Error(
        `You can only add an instance of Nurse. Argument is not a floor: ${floor}`
      );
    }
  }

  describe() {
    return `${this.name} has ${this.floors.length} floors.`;
  }
}

class Menu {
  constructor() {
    this.units = [];

    this.selectedFloor = null;
  }

  start() {
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createFloor();
          break;
        case "2":
          this.viewFloor();
          break;
        case "3":
          this.deleteFloor();
          break;
        case "4":
          this.displayFloors();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Goodbye!");
  }

  showMainMenuOptions() {
    return prompt(`
            0) exit
            1) create new floor name
            2) view floor name
            3) delete floor name
            4) display all floor names
        `);
  }

  showFloorMenuOptions(unitInfo) {
    return prompt(`
            0) back
            1) create new nurse
            2) delete new nurse
            -------------------
            ${unitInfo}
        `);
  }

  displayFloors() {
    let unitString = " ";
    for (let i = 0; i < this.units.length; i++) {
      unitString += i + ") " + this.units[i].name + "\n";
    }

    alert(unitString);
  }
  createFloor() {
    let name = prompt("Enter new name for floor:");
    this.units.push(new Floor(name));
  }

  viewFloor() {
    let index = prompt("Enter the index of the floor you wish to view:");
    if (index > -1 && index < this.units.length) {
      this.selectedFloor = this.units[index];
      let description = "New Floor Name: " + this.selectedFloor.name + "\n";

      for (let i = 0; i < this.selectedFloor.floors.length; i++) {
        description +=
          i +
          ") " +
          this.selectedFloor.floors[i].name +
          " - " +
          this.selectedFloor.floors[i].unit +
          "\n";
      }

      let selection = this.showFloorMenuOptions(description);
      switch (selection) {
        case "1":
          this.createNurse();
          break;
        case "2":
          this.deleteNurse();
      }
    }
  }

  deleteFloor() {
    let index = prompt("Enter the index of the unit you wish to delete:");
    if (index > -1 && index < this.units.length) {
      this.units.splice(index, 1);
    }
  }

  createNurse() {
    let name = prompt("Enter name for new nurse:");
    let unit = prompt("Enter which floor unit this nurse is assigned to:");
    this.selectedFloor.floors.push(new Nurse(name, unit));
  }

  deleteNurse() {
    let index = prompt("Enter the number of the nurse you wish to delete:");
    if (index > -1 && index < this.selectedFloor.floors.length) {
      this.selectedFloor.floors.splice(index, 1);
    }
  }
}

let menu = new Menu();
menu.start();
