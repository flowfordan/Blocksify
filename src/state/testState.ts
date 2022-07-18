import { makeAutoObservable } from "mobx";

type person = {
    name: string;
    active: boolean
    id: number
}

class TestState {
    people: Array<person>

    constructor(){
        
        this.people = [
            {name: 'Aboba', active: true, id: 1},
            {name: 'boba', active: false, id: 2},
            {name: 'boooba', active: false, id: 3},
            {name: 'Woba', active: false, id: 4}
        ]
        makeAutoObservable(this);
    }

    setActive = (id: number) => {
        //set current  active to not active
        let currentActive = this.people.find(item => item.active);
        if(currentActive){
            let idx = this.people.indexOf(currentActive);
            this.people[idx].active = false;
        }
        
        
        //set new active
        let newActive = this.people.find(item => item.id === id);
        console.log(newActive)

        if(newActive){
            

            let idx = this.people.indexOf(newActive);

            
            this.people[idx].active = true;
            // console.log(this.layers[idx].active)
        }

        
    }
}

const testState = new TestState()

export {testState}