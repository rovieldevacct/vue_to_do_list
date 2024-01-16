// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export const store = new Vuex.Store({
//     state: {
//         toDoTask: [
//             {id: 1, name: "test me", status: {done: false}},
//             {id: 2, name: "random", status: {done: false}},
//             {id: 3, name: "shits", status: {done: false}},
//         ]
//     }
// });
import { createStore } from "vuex";
const STORAGE_KEY = "tasks";
let defultTask = {tasks: [
    {id: 1, name: "test me", status: {done: false}},
    {id: 2, name: "random", status: {done: false}},
    {id: 3, name: "shits", status: {done: false}},
]};
let localStorageDataVals = window.localStorage.getItem(STORAGE_KEY);
if(window.localStorage.getItem(STORAGE_KEY)){
    window.localStorage.setItem(STORAGE_KEY, localStorageDataVals)
    // defultTask = JSON.stringify(localStorageDataVals);
}else{
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defultTask))
}


const store = createStore({
    state: {
        tasks: [
            {id: 1, name: "test me", status: {done: false}},
            {id: 2, name: "random", status: {done: false}},
            {id: 3, name: "shits", status: {done: false}},
        ]
    },
    getters:{
        // setStorage: state =>{
        //     // var newStorageVal = JSON.stringify(localStorageDataVals)
        //     return JSON.stringify(localStorageDataVals)
        // }
        
    },
    mutations: {

    }
});

export default store;