// ==UserScript==
// @name         Torn City automatic Gym and Crime bot
// @namespace    http://liquidpineapple.net
// @version      0.6.1
// @description  Try to take over the world, for the lazy.
// @author       Jurriaan Den Toonder<jurriaan.toonder@liquidpineapple.net>
// @downloadURL  https://github.com/Fastjur/Torn-City-Bot/raw/master/src/TornCityBot.user.js
// @updateURL    https://github.com/Fastjur/Torn-City-Bot/raw/master/src/TornCityBot.user.js
// @match        https://*.torn.com/*
// @require      http://code.jquery.com/jquery-2.2.2.min.js
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function(){
        console.log("Torn city bot loaded!");
        window.setInterval(init, 2000);
    });

    function init() {
        var action = GM_getValue('action', 'gym');
        var stats = checkStats();
        if (action === 'gym') {
            GM_setValue('action', 'gym');
            if (stats['energy'] >= 5) {
                console.log("Energy >= 5, doGym()");
                var gymStep = GM_getValue('gym_step', 1);
                doGym(gymStep);
            } else {
                GM_setValue('action', 'crime');
            }
        } else if (action === 'crime') {
            if (stats['nerve'] >= 4) {
                console.log("Nerve >= 4, doCrime()");
                var crimeStep = GM_getValue('crime_step', 1);
                console.log("CRIME STEP: " + crimeStep);
                doCrime(crimeStep);
            } else {
                GM_deleteValue('action');//Cannot do anything
            }
        } else {
            console.error("Invalid action, resetting bot and reloading");
            GM_deleteValue('action');
            window.location.href = '/index.php';
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
            'life': Life
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

            if (Strength <= Defense) {
                document.getElementById('divStrength').getElementsByClassName('numb')[0].value = 1;
                document.getElementById('divStrength').getElementsByClassName('trainStat')[0].click();
            } else if (Defense <= Speed) {
                document.getElementById('divDefence').getElementsByClassName('numb')[0].value = 1;
                document.getElementById('divDefence').getElementsByClassName('trainStat')[0].click();
            } else if (Speed <= Dexterity) {
                document.getElementById('divSpeed').getElementsByClassName('numb')[0].value = 1;
                document.getElementById('divSpeed').getElementsByClassName('trainStat')[0].click();
            } else {
                document.getElementById('divDexterity').getElementsByClassName('numb')[0].value = 1;
                document.getElementById('divDexterity').getElementsByClassName('trainStat')[0].click();
            }

            window.setTimeout(function() {
                var stats = checkStats();
                if (stats['energy'] >= 5) {
                    GM_setValue('gym_step', 1);
                    doGym(1);
                } else {
                    window.location.href = '/index.php';
                }
            }, 1500);
        }
    }

    function doCrime(step) {
        if (step === 1) {
            console.log("doCrime step 1");
            GM_setValue('crime_step', 2);
            window.location.href = '/crimes.php';
        }
        if (step === 2) {
            console.log("doCrime step 2");
            $('input[name=crime][value=pickpocket]').click();
            GM_setValue('crime_step', 3);
        }
        if (step === 3) {
            $('input[name=crime][value=hobo]').click();
            GM_setValue('crime_step', 4);
        }
        if (step === 4) {
            //$('input[name=crime][value=extrastrongmints]').click();
            GM_setValue('crime_step', 5);
        }
        if (step === 5) {
            GM_setValue('crime_step', 1);
            window.location.href = '/index.php';
        }
    }

})();