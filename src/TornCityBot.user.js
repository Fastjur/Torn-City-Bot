// ==UserScript==
// @name         Torn City automatic Gym and Crime bot
// @namespace    http://liquidpineapple.net
// @version      0.6.1
// @description  Try to take over the world, for the lazy.
// @author       Jurriaan Den Toonder<jurriaan.toonder@liquidpineapple.net>
// @require      http://code.jquery.com/jquery-latest.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @run-at       document-idle
// ==/UserScript==

// 'use strict';

//config
var Gym_Start_Point = 20; //Set the Engergy when the bot goes to gym
var Crime_Start_Point = 4; //Set Nerve to go to Crime
var user_1 = ['thojoladol@housat.com','jemoeder46'];
//user logins

//variables
var wait_Long = Math.round(Math.random() * (10000 - 1000)) + 500;
var wait_Mid = Math.round(Math.random() * (3000 - 500)) + 500;
var wait_Short = Math.round(Math.random() * (1500 - 200)) + 500;
//script Reload
setInterval(function() {
    location.reload();
}, 3600000);

//Main
    console.log("Loading...");
$(document).ready(main);

function main(){
    if ($('.join').length !== 0) { logOn(login);
    } else { var intervalID = setInterval(checker,2000); }
}

//Checker runs on interval, Check stats every X time.
function checker() {
    //Checks for Level UP and Jail, Hospital and loged in
    //if ($('#tab-menu > ul > li.image.active.first.right.ui-state-default.ui-corner-top').length !== 0) { console.log('Tricker 2captcha, script stopped'); clearInterval(intervalID);   }
    if (document.getElementsByClassName("button level").length !== 0) {
        document.getElementsByClassName("button level")[0].click(); }
    if (document.getElementsByClassName("t-blue m-hide h").length !== 0) {
        document.getElementsByClassName("t-blue m-hide h")[0].click(); }
    if (document.getElementById('icon15').length!==0) {setTimeout(WaiT,500);}
    if (document.getElementById('icon16').className == "iconShow") {setTimeout(WaiT,500);
                                                                   }
    else {
       console.log("No holdings found");
   }
    //Checks progress in Gym proces and starts proces if nerve allowed it
    var action = GM_getValue('action', 'gym');
    var stats = checkStats();
    if (action === 'gym') {
        GM_setValue('action', 'gym');
        if (stats['energy'] >= Gym_Start_Point) {
            console.log("Energy >= Gym_Start_Point, doGym()");
            var gymStep = GM_getValue('gym_step', 1);
            doGym(gymStep);
        } else {
            GM_setValue('action', 'crime');
        }
    } else if (action === 'crime') {
        if (stats['nerve'] >= Crime_Start_Point) {
            console.log("Nerve >= Crime_Start_Point, doCrime()");
            var crimeStep = GM_getValue('crime_step', 1);
            console.log("CRIME STEP: " + crimeStep);
            doCrime(crimeStep);
        } else {
            GM_deleteValue('action');//Cannot do anything
            setTimeout(function(){
                if (document.getElementsByClassName("refillClick energy t-blue h right").length !== 0) {
        document.getElementsByClassName("refillClick energy t-blue h right")[0].click(); }
            },6800);
        }
    } else {
        console.error("Invalid action, resetting bot and reloading");
        GM_deleteValue('action');
        window.location.href = '/index.php';
    }
}

//Wait function for jail etc.
function WaiT() {
    if (document.getElementById('icon15').className == "iconShow") {
        clearInterval(intervalID);
        console.log("standby 5 minutes, you are in hospital");
        GM_deleteValue('action');
        GM_setValue('gym_step', 1);
        GM_setValue('crime_step', 1);
        setInterval(WaiT,300000);
                            }
        if (document.getElementById('icon16').className == "iconShow") {
        clearInterval(intervalID);
        console.log("standby 5 minutes, you are in jail");
        GM_deleteValue('action');
        GM_setValue('gym_step', 1);
        GM_setValue('crime_step', 1);
        setInterval(WaiT,300000);
                            }
}

function checkStats() {
    var Energy = document.getElementById('energy').children[1].dataset.current;
    var Nerve = document.getElementById('nerve').children[1].dataset.current;
    var Happy = document.getElementById('happy').children[1].dataset.current;
    var Life = document.getElementById('life').children[1].dataset.current;
    return {
        'energy': Energy,
        'nerve': Nerve,
        'happy': Happy,
        'life': Life,
    };
}

function doGym(step) {
    if (step === 1) {
        console.log("doGym step 1");
        GM_setValue('gym_step', 2);
        if (window.location.pathname == '/gym.php'){
            doGym(2);
        } else {
            window.location.href = '/gym.php';
        }
    }
    if (step === 2) {
        console.log("doGym step 2");
        if (window.location.pathname != '/gym.php') {
            window.location.href = '/gym.php';
        }
        var Strength = document.getElementById('strengthTotal').innerText;
        var Defense = document.getElementById('defenceTotal').innerText;
        var Speed = document.getElementById('speedTotal').innerText;
        var Dexterity = document.getElementById('dexterityTotal').innerText;

        GM_setValue('gym_step', 1);

        if (Strength <= Defense) { {setTimeout(function(){
            document.getElementById('divStrength').getElementsByClassName('numb')[0].value = 20;
            document.getElementById('divStrength').getElementsByClassName('trainStat')[0].click();
            }, Math.round(Math.random() * (3000 - 250)) + 250);
                                   }
        } else if (Defense <= Speed) { {setTimeout(function(){
            document.getElementById('divDefence').getElementsByClassName('numb')[0].value = 20;
            document.getElementById('divDefence').getElementsByClassName('trainStat')[0].click();
            }, Math.round(Math.random() * (3000 - 250)) + 250);
                                   }
        } else if (Speed <= Dexterity) { {setTimeout(function(){
            document.getElementById('divSpeed').getElementsByClassName('numb')[0].value = 20;
            document.getElementById('divSpeed').getElementsByClassName('trainStat')[0].click();
            }, Math.round(Math.random() * (3000 - 250)) + 250);
                                   }
        } else { {setTimeout(function(){
            document.getElementById('divDexterity').getElementsByClassName('numb')[0].value = 20;
            document.getElementById('divDexterity').getElementsByClassName('trainStat')[0].click();
            }, Math.round(Math.random() * (3000 - 250)) + 250);
                                   }
        }
        var stats = checkStats();
        window.setTimeout(function() {
            var stats = checkStats();
           if (stats['energy'] >= 5) {
                GM_setValue('gym_step', 1);
                doGym(1);
            } else {
                window.location.href = '/index.php';
                GM_deleteValue('action');
            }
        }, 3000);
    }
}

function doCrime(step) {
    if (step === 1) {
        console.log("doCrime step 1");
        GM_setValue('crime_step', 2);
        window.location.href = '/crimes.php';
    }
    if (step === 2) { setTimeout(function(){
        console.log("doCrime step 2");
        $('input[name=crime][value=shoplift]').click();
        GM_setValue('crime_step', 3);
                     }, Math.round(Math.random() * (1500 - 250)) + 250);
    }
    if (step === 3) { setTimeout(function(){
        $('input[name=crime][value=sweetshop]').click();
        GM_setValue('crime_step', 4);
        }, Math.round(Math.random() * (1500 - 250)) + 250);
    }
    if (step === 4) { GM_setValue('crime_step', 5);
        setTimeout(function(){
        $('input[name=crime][value=chocolatebars]').click();
        }, Math.round(Math.random() * (1500 - 250)) + 250);
    }
    if (step === 5) {
        var stats = checkStats();
       if (stats['nerve'] >= 4) {
        GM_setValue('crime_step', 6); }
        else { GM_setValue('crime_step', 7);}
    }
    if (step === 6){ if (document.querySelector('#try_again') !== null) {
        GM_setValue('crime_step', 5);
        document.querySelector('#try_again').click();
    } else {
    GM_setValue('crime_step',7);
    }
                   }
    if (step === 7) {
        GM_setValue('crime_step', 1);
        GM_deleteValue('action');
        window.location.href = '/index.php';
        }
                    }
function logOn(login,logout,nav) {
    if (login) {
        setTimeout(function(){
        $('#player.txtbx').val(user_1[0]);
        $('#password.txtbx').val(user_1[1]);
        $('.login').click();
            }, 3000);
    }
    if (logout) {
        alert('logout');
    }
}

/*
- Desktop version change
-2captcha
-Buy loly and bear and sell or put in company
*/