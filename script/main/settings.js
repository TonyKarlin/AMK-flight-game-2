const languages = ["english", "finnish"];
let lang = english;

class Settings {
	constructor(base, noLoad = false) {
		this.musicVolume = base.musicVolume ?? 0.2;
		this.soundVolume = base.soundVolume ?? 0.2;
		this.lang = "english";
		if (!noLoad) this.load();
	}

	reset(set) {
		const baseSettings = new Settings(set, true);
		Object.keys(this).forEach((key) => {
			this[key] = baseSettings[key];
		});
		this.setLanguage(this.lang);
	}

	load() {
		const loadedSettings = localStorage.getItem("grandpas-lost-sauce_game-settings");
		if (loadedSettings) {
			const parsed = JSON.parse(loadedSettings);
			this.reset(parsed);
		}
	}

	save() {
		const save = JSON.stringify(this);
		localStorage.setItem("grandpas-lost-sauce_game-settings", save);
	}

	setVolume(options) {
		if (options.music !== undefined) {
			this.musicVolume = options.music;
		}
		if (options.sound) {
			this.soundVolume = options.sound;
		}
		soundController.updateVolume();
		this.save();
	}

	getVolume(options) {
		if (options.music) {
			return this.musicVolume;
		}

		return this.soundVolume;
	}

	setLanguage(code) {
		this.lang = code;
		lang = eval(code);
		this.save();
	}
}
const settingsOptions = [
	{
		group: "sound",
		options: [
			{
				id: "musicVolume",
				type: "range",
				callback: "settings.setVolume({music: <x>})",
				scale: 0.01,
				values: [0, 100],
				tooltip: "music_volume_tt",
			},
			{
				id: "soundVolume",
				type: "range",
				callback: "settings.setVolume({sound: <x>})",
				scale: 0.01,
				values: [0, 100],
				tooltip: "sound_volume_tt",
			},
		],
	},
	{
		group: "language",
		options: [
			{
				id: "game_language",
				type: "languageSelection",
			},
		],
	},
];

function createSettings() {
	const settingsContent = document.createElement("div");
	settingsContent.classList.add("settings");
	settingsOptions.forEach((group) => {
		const mainContainer = document.createElement("div");
		const title = document.createElement("h3");
		title.classList.add("setting-group-title");
		title.textContent = translate(group.group);
		mainContainer.classList.add(group.group);
		mainContainer.append(title);
		group.options.forEach((setting) => {
			const container = document.createElement("div");
			if (setting.type === "range") {
				container.classList.add("sliderContainer");
				const text = document.createElement("p");
				const slider = document.createElement("input");
				const textVal = document.createElement("p");
				slider.classList.add("slider");
				textVal.classList.add("inputValue");
				text.textContent = translate(setting.id);
				slider.type = "range";
				slider.min = `${setting.values[0]}`;
				slider.max = `${setting.values[1]}`;
				slider.value = settings[setting.id].toString() / setting.scale;
				container.classList.add(setting.id);
				if (setting.tooltip) {
					const tt = new Tooltip({ element: container, text: translate(setting.tooltip) });
					tt.create();
				}
				textVal.textContent = `${parseInt(slider.value).toString()}`;
				slider.oninput = () => {
					const value = parseInt(slider.value) * setting.scale;
					const callback = setting.callback.replace("<x>", value);
					eval(callback);
					textVal.textContent = `${parseInt(slider.value).toString()}`;
				};
				text.append(textVal);
				container.append(text, slider);
				mainContainer.append(container);
			} else if (setting.type == "languageSelection") {
				container.classList.add("languageSelection");
				languages.forEach((language) => {
					const langButton = document.createElement("div");
					langButton.textContent = translate(language);
					if (language == settings.lang) langButton.classList.add("selectedLang");
					langButton.addEventListener("click", () => {
						soundController.playSound("click");
						container.childNodes.forEach((child) => {
							try {
								child.classList.remove("selectedLang");
							} catch (err) {}
						});
						settings.setLanguage(language);
						openSettingsScreen();
					});
					container.append(langButton);
				});
				mainContainer.append(container);
			}
		});
		settingsContent.append(mainContainer);
	});
	return settingsContent;
}

settingsOptions;

const settings = new Settings({});

class Dev {
	constructor() {
		this.enabled = false;
	}

	load() {
		const saved = localStorage.getItem("grandpas-lost-sauce_dev");
		if (saved) {
			const mode = JSON.parse(saved);
			Object.keys(this).forEach((key) => {
				this[key] = mode[key] ?? this[key];
			});
		}
	}

	save() {
		localStorage.setItem("grandpas-lost-sauce_dev", JSON.stringify(this));
	}
}

const dev = new Dev();
dev.load();
