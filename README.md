# Torn-City-Bot
This bot will help you farm in the beginning of your Torn City career

Note that this bot is currently in a very Alpha / early state, and it is more a fun sideproject than anything else. There is currently no way of specifying what crimes todo etc without altering the source code. This will be implemented in the feature.

##Installation

1. Get [Tampermonkey](http://tampermonkey.net/)
2. Click [this link](https://github.com/Fastjur/Torn-City-Bot/raw/master/src/TornCityBot.user.js) and add the script to Tampermonkey

##Known issues / TODO

* When in jail, the bot still tries to perform actions, should be an easy fix
* Build in exceptions to urls, like the wiki and when not logged in
* Allow the user to choose which crimes to perform
* Allow a user to switch of the bot temporarily
* The bot stays on the same screen if your crime fails. It also possibly messes up the `crime_step`
