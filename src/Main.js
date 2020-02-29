import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FractionList from "./FractionList";

import { Switch, Route, Link } from "react-router-dom";

import AppCard from "./LessonCard";
import Arena from "./Arena"
import * as subitizer from "./subitizer.js"
import * as dotsgame from "./dotsgame.js"
import * as Subitization from "./activities/Subitization.json";
import * as Addition from "./activities/Addition.json";
import * as Subtraction from "./activities/Subtraction.json";
import * as Pivot from "./activities/Pivot.json";
import LessonList from "./LessonList"


const Main = () => (
  <Switch>
    <Route exact path="/" component={()=><Arena fullscreen = {true} type = {1} lesson = {Subitization} script = {subitizer.init}/>} />
    <Route exact path="/addition" component={()=><Arena fullscreen = {true} lesson = {Addition} type = {2} script = {subitizer.init}/>} />
    <Route exact path="/subtraction" component={()=><Arena fullscreen = {true} lesson = {Subtraction} type = {3} script = {subitizer.init}/>} />
    <Route exact path="/mixed" component={()=><Arena fullscreen = {true} lesson = {Pivot} type = {5} script = {subitizer.init}/>} />
    <Route exact path="/dotsgame" component={()=><Arena fullscreen = {true} lesson = {Pivot} value = {8} script = {dotsgame.init}/>} />
    <Route exact path="/dotsgamex5" component={()=><Arena fullscreen = {true} lesson = {Pivot} value = {5} script = {dotsgame.init}/>} />
    <Route exact path="/makingten" component={()=><Arena fullscreen = {true} lesson = {Addition} type = {4} script = {subitizer.init}/>} />
    <Route exact path="/hiddendots" component={()=><Arena fullscreen = {true} lesson = {Subitization} type = {6} script = {subitizer.init}/>} />
    <Route exact path="/appcard" component={()=><AppCard data = {Pivot}/>}/>
    <Route exact path="/fractions" component={FractionList} />
    <Route exact path="/lessons" component={LessonList} />
  </Switch>
);

export default Main;
