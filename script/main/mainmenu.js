const title_screen = document.querySelector("#title-screen");
const main_menu = document.querySelector("#main-menu");

const options_btn = document.querySelector("#options");
const options_menu = document.querySelector("#options-menu");
const buttons = document.querySelector("#buttons");

const new_game_btn = document.querySelector("#new-game");
const new_game_scrn = document.querySelector("#new-game-screen");
const difficulty_select = document.querySelector("#difficulty-select");
const player_amount = document.querySelector("#player-amount");
const minus_btn = document.querySelector("#minus-players");
const plus_btn = document.querySelector("#plus-players");
const start_btn = document.querySelector("#start-game");

const load_save_btn = document.querySelector("#load-save");
const load_save_scrn = document.querySelector("#load-save-screen");
const load_btn = document.querySelector("#load-game");
const save_btn = document.querySelector("#save-game");

const help_btn = document.querySelector("#read-help");
const help_scrn = document.querySelector("#help-screen");

const story_btn = document.querySelector("#read-story");
const story_scrn = document.querySelector("#story-screen");
const close_dialog_btn = document.querySelector("#close-dialog");

const leaderboards_btn = document.querySelector("#leaderboards");
const leader_boards_scrn = document.querySelector("#leaderboards-screen");
const lb_screen_name = document.querySelector("#screen-name");
const lb_score = document.querySelector("#score");
const lb_time = document.querySelector("#time");
const lb_money = document.querySelector("#money");
const lb_co2_consumed = document.querySelector("#co2-consumed");
const lb_distance_traveled = document.querySelector("#distance-traveled");
const lb_real_time = document.querySelector("#real-time");

const settings_btn = document.querySelector("#settings");
const settings_scrn = document.querySelector("#settings-screen");

const close_options_btn = document.querySelector("#close-options");

const quests_btn = document.querySelector("#quests");
const quests_scrn = document.querySelector("#quests-screen");
const close_quests_btn = document.querySelector("#close-quests");

const end_turn_btn = document.querySelector("#end-turn");

const map_area = document.querySelector("#map-area");
const map_scrn = document.querySelector("#map");
const bottom_bar = document.querySelector("#bottom-bar");

const win_btn = document.querySelector("#win");
const win_scrn = document.querySelector("#win-screen");
const lose_btn = document.querySelector("#lose");
const lose_scrn = document.querySelector("#loss-screen");

let options_open = false;
let in_main_menu = false;

// Hides all the option menu screens. Used right before opening a screen, to prevent overlap.
function hideBoxes() {
	new_game_scrn.hidden = true;
	load_save_scrn.hidden = true;
	help_scrn.hidden = true;
	story_scrn.hidden = true;
	leader_boards_scrn.hidden = true;
	settings_scrn.hidden = true;
}

// Plays a 'click' sound effect every time any button is clicked.
all_buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		soundController.playSound("click", true);
	});
});

win_btn.addEventListener("click", function () {
	win_scrn.hidden = !win_scrn.hidden;
});

const grandpa_death_gif = document.createElement("img");
grandpa_death_gif.src = "images/grandpa_death.gif";

function hideGif() {
	grandpa_death_gif.style.opacity = 0;
}

lose_btn.addEventListener("click", function () {
	if (lose_scrn.hidden) {
		lose_scrn.hidden = false;
		lose_scrn.append(grandpa_death_gif);
		soundController.playSound("death");
		setTimeout(hideGif, 2100);
	} else {
		lose_scrn.hidden = true;
	}
});

async function getAllPlayers() {
	return await routes.getAllPlayers();
}

async function createLeaderboards () {
	let players = await getAllPlayers();
	for (let i = 0; i < players.length; i++) {
		const div1 = document.createElement("div");
		div1.className = "player-stat";
		div1.textContent = players[i]["screen_name"];
		lb_screen_name.append(div1);
		const div2 = document.createElement("div");
		div2.className = "player-stat";
		div2.textContent = players[i]["score"];
		lb_score.append(div2);
		const div3 = document.createElement("div");
		div3.className = "player-stat";
		div3.textContent = players[i]["time"];
		lb_time.append(div3);
		const div4 = document.createElement("div");
		div4.className = "player-stat";
		div4.textContent = players[i]["money"];
		lb_money.append(div4);
		const div5 = document.createElement("div");
		div5.className = "player-stat";
		div5.textContent = players[i]["co2_consumed"];
		lb_co2_consumed.append(div5);
		const div6 = document.createElement("div");
		div6.className = "player-stat";
		div6.textContent = players[i]["distance_traveled"];
		lb_distance_traveled.append(div6);
		const div7 = document.createElement("div");
		div7.className = "player-stat";
		div7.textContent = players[i]["real_time"];
		lb_real_time.append(div7);
	}
}

function hideStart() {
	title_screen.hidden = true;
}

// Fading animation for the start screen
title_screen.addEventListener("click", function () {
	title_screen.style.opacity = "0";
	setTimeout(hideStart, 1000);
	in_main_menu = true;
	options_menu.style.display = "flex";
	options_open = true;
	soundController.playSound("shanty");
	refreshText();
});

options_btn.addEventListener("click", function () {
	if (options_open) {
		options_menu.style.display = "none";
		options_open = false;
	} else {
		quests_scrn.hidden = true;
		quests_open = false;
		options_menu.style.display = "flex";
		options_open = true;
	}
});

function newInput(id) {
	let inp = document.createElement("input");
	inp.type = "text";
	inp.id = id;
	return inp
}

new_game_btn.addEventListener("click", function () {
	hideBoxes();
	new_game_scrn.hidden = false;
	new_game_scrn.append(newInput("name1"));
});

let amount_of_players = 1;

minus_btn.addEventListener("click", function () {
	if (amount_of_players > 1) {
		const inputs = document.querySelector("#name" + amount_of_players);
		new_game_scrn.removeChild(inputs)
		amount_of_players -= 1;
		player_amount.textContent = String(amount_of_players);
	}
});

plus_btn.addEventListener("click", function () {
	amount_of_players += 1;
	player_amount.textContent = String(amount_of_players);
	new_game_scrn.append(newInput("name" + amount_of_players));
});

start_btn.addEventListener("click", function () {
	main_menu.hidden = true;
	options_menu.style.display = "none";
	map_scrn.hidden = false;
	map_area.hidden = false;
	bottom_bar.style.display = "flex";
	options_btn.hidden = false;
	quests_btn.hidden = false;
	end_turn_btn.hidden = false;
	setup();
});

load_save_btn.addEventListener("click", function () {
	hideBoxes();
	load_save_scrn.hidden = false;
});

help_btn.addEventListener("click", function () {
	hideBoxes();
	help_scrn.hidden = false;
});

story_btn.addEventListener("click", function () {
	hideBoxes();
	buttons.hidden = true;
	story_scrn.hidden = false;
	dialog.setFullDialog(dialogScenes.intro);
});

close_dialog_btn.addEventListener("click", function () {
	buttons.hidden = false;
	story_scrn.hidden = true;
});

leaderboards_btn.addEventListener("click", function () {
	hideBoxes();
	leader_boards_scrn.hidden = false;
});

settings_btn.addEventListener("click", openSettingsScreen);

function openSettingsScreen() {
	hideBoxes();
	settings_scrn.hidden = false;
	settings_scrn.innerHTML = "";
	settings_scrn.append(createSettings());
}

close_options_btn.addEventListener("click", function () {
	options_menu.style.display = "none";
	options_open = false;
	if (in_main_menu) {
		title_screen.hidden = false;
		title_screen.style.opacity = "1";
		in_main_menu = false;
	}
});

quests_btn.addEventListener("click", function () {
	if (quests_scrn.style.display === "flex") {
		quests_scrn.style.display = "none";
	} else {
		options_menu.style.display = "none";
		quests_scrn.style.display = "flex";
	}
});

close_quests_btn.addEventListener("click", function () {
	quests_scrn.style.display = "none";
});

end_turn_btn.addEventListener("click", function () {
	game.nextPlayer();
});

if (dev.enabled) {
	hideStart();
	in_main_menu = false;
	main_menu.hidden = true;
	options_menu.style.display = "none";
	options_open = false;
	bottom_bar.style.display = "flex";
	map_scrn.hidden = false;
	map_area.hidden = false;
	setup();
}

createLeaderboards();