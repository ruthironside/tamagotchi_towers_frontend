import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./containers/LandingPageContainer/NavBar";
import LandingPage from "./containers/LandingPageContainer/LandingPage";
import ChoicePage from "./containers/LoadCreateContainer/ChoicePage";
import CreatePage from "./containers/LoadCreateContainer/CreatePage";
import LoadPage from "./containers/LoadCreateContainer/LoadPage";
import Character from "./containers/CharacterContainer/Character";
import dogHeart  from "./gifs/dog/dog_heart.gif"
import catMeow from "./gifs/cat/cat_meow.gif"
import monkeySpeak from "./gifs/monkey/monkey_speak.gif"
import unicornRainbow from "./gifs/unicorn/unicorn_rainbow.gif"
import dinoRawr from "./gifs/dino/dinosaur_rawr.gif"
import penguinHeart from "./gifs/penguin/penguin_heart.gif"
import "./App.css"
import "./style/LandingPage.css"
import "./style/CreatePage.css"
import SaveForm from "./components/LoadCreateComponents/SaveForm";




const App = ()=> {

  const [allUserData, setAllUserData] = useState([]);
  const [loggedInUsername, setLoggedInUsername] = useState();
  const [loggedInPassword, setLoggedInPassword] = useState();
  const [userData, setUserData] = useState({});
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [ccHappiness, setCCHappiness] = useState();
  const [ccHealth, setCCHealth] = useState();
  const [ccCleanliness, setCCCleanliness] = useState();
  const [ccFitness, setCCFitness] = useState();
  const [ccHunger, setCCHunger] = useState();
  const [intervalId, setIntervalId] = useState(null);
  


  const animals = [
    {id: 1, animal_type: { animal: "dog" , stats: {
      appetite: 0.5, grooming: 0.6, cheeriness: 0.2, activity_level: 0.9
    }}, images: [dogHeart],
    name: "Jellibobs", health: 100, happiness:100, cleanliness:100,
    fitness:100, hunger:100
    },
    {id: 2, animal_type: {animal: "cat" , stats: {
      appetite: 0.3, grooming: 0.2, cheeriness: 0.7, activity_level: 0.6
    }}, images: [catMeow],
    name: "Kitty Fursbags", health: 100, happiness:100, cleanliness:100,
    fitness:100, hunger:100
    },
    {id: 3, animal_type: {animal: "monkey" , stats: {
      appetite: 0.9, grooming: 0.7, cheeriness: 0.5, activity_level: 1
    }}, images: [monkeySpeak],
    name: "Cheeky Chops", health: 100, happiness:100, cleanliness:100,
    fitness:100, hunger:100
    },
    {id: 4, animal_type: {animal: "unicorn" , stats: {
      appetite: 0.5, grooming: 0.9, cheeriness: 0.6, activity_level: 0.7
    }}, images: [unicornRainbow],
    name: "Dolly", health: 100, happiness:100, cleanliness:100,
    fitness:100, hunger:100
    },
    {id: 5, animal_type: {animal: "dinosaur" , stats: {
      appetite: 0.9, grooming: 0.1, cheeriness: 0.1, activity_level: 0.7
    }}, images: [dinoRawr],
    name: "Mr. Flamez", health: 100, happiness:100, cleanliness:100,
    fitness:100, hunger:100
    },
    {id: 6, animal_type: {animal: "penguin" , stats: {
      appetite: 0.5, grooming: 0.9, cheeriness: 0.6, activity_level: 0.7
    }}, images: [penguinHeart],
    name: "Beany", health: 100, happiness:100, cleanliness:100,
    fitness:100, hunger:100
  }  
  ]
  //dummy data
  const usernameAndPassword = [
    {id: 100, username: "Emily", password: "3mily", animals: [animals[0]]},
    {id: 99, username: "Stuart", password: "5tuart",  animals: [animals[1]]},
    {id: 98, username: "Ruth", password: "7uth", animals: [animals[2], animals[3]]},
    {id: 97, username: "Michael", password: "m1chael", animals: [animals[4]]},
    {id: 96, username: "Andy", password: "4ndy", animals: [animals[5]]}
  ]
  //if they need a lot of food, appetite = high
  //if they get dirty quickly/don't groom often, grooming = high
  //if they are unhappy animals, cheeriness = high
  //if they need a lot of exercise, activity level = high

  const getAllUserData = () => {
    console.log("getting all user data");
    return fetch('http://localhost:8080/api/users')
    .then(res => res.json())
    .then(data => setAllUserData(data))
}

    useEffect(() => {
      getAllUserData();
    }, [])

  const reduceStats = () => {
    if (currentCharacter.happiness>0){
      
    const interval = setInterval(() => {
      
      setCCHappiness(currentCharacter.happiness -=.01);
      setIntervalId(interval)
      if(currentCharacter.happiness === 0) {
    }}, 10);
  }
  if (currentCharacter.cleanliness>0){
      
    const interval = setInterval(() => {
      
      setCCCleanliness(currentCharacter.cleanliness -=.01);
      setIntervalId(interval)
      if(currentCharacter.cleanliness === 0) {
    }}, 10);
  }
  if (currentCharacter.hunger>0){
      
    const interval = setInterval(() => {
      
      setCCHunger(currentCharacter.hunger -=.01);
      setIntervalId(interval)
      if(currentCharacter.hunger === 0) {
    }}, 10);
  }
  if (currentCharacter.fitness>0){
      
    const interval = setInterval(() => {
      
      setCCFitness(currentCharacter.fitness -=.01);
      setIntervalId(interval)
      if(currentCharacter.fitness === 0) {
    }}, 10);
  }
  }



  clearInterval(intervalId);

  const increaseStat = (stat) => {
    if (currentCharacter[stat]<95){
      currentCharacter[stat] += 5;
    }
    else (currentCharacter[stat] = 100)
  }

  const handleSubmit = (data) => {
    allUserData.forEach(element => {
      if (element.userName === data.username && element.password === data.password){
        console.log("Success");
        setLoggedInUsername(data.username)
        setLoggedInPassword(data.password)
        setLoggedIn(true);
      }else{
        console.log("Failure");
      }
    });
  }

  const selectCurrentCharacter = (characterId) => {
    setCurrentCharacter(animals.find(animal => animal.id === characterId))
    setCCHappiness(currentCharacter.happiness)
    setCCHealth(currentCharacter.health)
  }

  const getUserData = () => {
    console.log("getting user data");
    if (loggedIn){
      setUserData(usernameAndPassword.find(element => element.username === loggedInUsername && element.password === loggedInPassword))
    }
//this would mean there cannot be duplicate usernames!
    return fetch(`http://localhost:8080/api/users?username=${loggedInUsername}`)
    .then(res => res.json())
    .then(data => setUserData(data))
    .then(() => setLoggedIn(true))
}

  // useEffect(() => {
  //   getUserData();
  // }, [loggedInUsername && loggedInPassword])

  useEffect(() => {
    if (currentCharacter){
    reduceStats()
    }
  }, [currentCharacter.happiness])

  const logInNewUser = (userDeets) => {
    setLoggedInUsername(userDeets.username);
    setLoggedInPassword(userDeets.password);
    setLoggedIn(false);
  }



  
  return (
    <Router>
      <>
        <header>
          <h1 id="title">Tamagotchi Towers</h1>
          <NavBar id="navbar"/>
        </header>
        <Switch>
        <Route exact path="/" render={() => loggedIn? <Redirect to= "/choicepage" /> : <LandingPage onSubmit = {handleSubmit}></LandingPage>} />
        <Route path="/choicepage" component={ChoicePage} />
        <Route path="/newuser" render={() => loggedIn? <Redirect to= "/choicepage" /> :<SaveForm onNewUserSubmit={(userDeets) => logInNewUser(userDeets)} allAnimals={animals} currentCharacter={currentCharacter} setCurrentCharacter={setCurrentCharacter} userData={userData} loggedInUsername={loggedInUsername} setLoggedInPassword={loggedInPassword} getUserData={getUserData}/>}/>
        <Route path="/createpage" render={() => <CreatePage allAnimals={animals} currentCharacter={currentCharacter} setCurrentCharacter={setCurrentCharacter} userData={userData} loggedInUsername={loggedInUsername} setLoggedInPassword={loggedInPassword} getUserData={getUserData} setLoggedIn={setLoggedIn}/>}/>
        <Route path="/loadpage"  render={() => <LoadPage userAnimals={userData.animals} selectCurrentCharacter={selectCurrentCharacter}/>} />
        <Route path="/character" render={() => <Character currentCharacter={currentCharacter} increaseStat={increaseStat}/>}/>
        
        </Switch>
      </>
    </Router>
  )

}

export default App;
