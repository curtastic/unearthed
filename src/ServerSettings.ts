
import { Game } from "./Game";
import { ConfiguredMods, ModRecord } from "./mods/ConfiguredMods";
import { ServerMod } from "./mods/Mods";

/**
 * The configuration that gets stored into local storage
 */
export interface ServerConfig {
    /** True if the server is configured to allow remote players to editr */
    editable: boolean;
    /** The collection of resources made available through mods */
    modScripts: (Record<string, string>)[];
}

/**
 * Server level settings - mods, configuration, passwords?
 */
export class ServerSettings {
    /**
     * The data put into local storage to store the server settings
     */
    private config: ServerConfig = {
        editable: true,
        modScripts: []
    }

    /** The game these settings will apply to */
    game: Game;
    /** A manager for server mods - handles life cycle and events */
    serverMods: ConfiguredMods;

    constructor(game: Game) {
        this.game = game;
        this.serverMods = new ConfiguredMods(game);
    }

    /**
     * Get the mod manager that controls the lifecycle of the configured mods
     * 
     * @returns The manager for the configured mods
     */
    getConfiguredMods(): ConfiguredMods {
        return this.serverMods;
    }

    /**
     * Update a mod in situ with a new mod.js file
     * 
     * @param mod The mod to be updated
     * @param content The content to apply 
     * @returns True if the content successfully applied
     */
    updateMod(mod: ModRecord, content: string): boolean {
        try {
            const potentialMod = eval(content) as ServerMod;
            if (potentialMod.name && potentialMod.id) {
                mod.resources["mod.js"] = content;
                mod.mod = potentialMod;
                
                // if the mod had already been inited we'll want to 
                // reinitalise and start again
                if (mod.inited) {
                    mod.inited = false;
                    this.serverMods.init();   
                    this.serverMods.worldStarted(); 
                }

                this.save();
                return true;
            } else {
                console.error("Modification either didn't have a name or an ID!");
                return false;
            }
        } catch (e) {
            console.log("Error loading mod: ");
            console.error(e);
            return false;
        }
    }

    /**
     * Add a new mod to the server. A mod consists of a set of resources keyed by 
     * name.
     * 
     * @param modData The resources provided by the mod, keyed by name
     * @param updateUiAndConfig True if we should update the UI (false on startup)
     */
    addMod(modData: Record<string, string>, updateUiAndConfig: boolean): void {
        try {
            const script = modData["mod.js"];
            if (script) {
                const potentialMod = eval(script) as ServerMod;

                if (potentialMod.name && potentialMod.id) {
                    const modRecord = { mod: potentialMod, inited: false, resources: modData };
                    this.serverMods.mods.push(modRecord);

                    if (updateUiAndConfig) {
                        this.config.modScripts.push(modData);
                        this.save();
                        this.game.ui.addMod(modRecord);
                    }
                } else {
                    console.error("Modification either didn't have a name or an ID!");
                }
            } else {
                console.error("No mod.js file found in zip");
                console.log(modData);
            }
        } catch (e) {
            console.log("Error loading mod: ");
            console.error(e);
        }
    }

    /**
     * Uninstall a mod from the game
     * 
     * @param mod The mod to uninstall
     */
    removeMod(mod: ModRecord): void {
        const index = this.serverMods.mods.indexOf(mod);
        if (index >= 0) {
            this.config.modScripts.splice(index, 1);
            this.serverMods.mods.splice(index, 1);
            this.save();
        }
    }

    /**
     * Get the server config that needs to be stored
     * 
     * @returns The server config blob that is stored for this set of settings.
     */
    getConfig(): ServerConfig {
        return this.config;
    }

    /**
     * True if the server is configured to let remote players edit the world
     * 
     * @returns True if the server is configured to allow remote players to make changes
     */
    isEditable(): boolean {
        return this.config.editable;
    }

    /**
     * Set whether the server can be edited by remote players
     * 
     * @param e True if the server should be editable
     */
    setEditable(e: boolean): void {
        this.config.editable = e;
        this.save();
    }

    /**
     * Persist the settings to local storage
     */
    save(): void {
        localStorage.setItem("serverSettings", JSON.stringify(this.config));

        if (this.game.network) {
            this.game.network.sendServerSettings(this.config);
        }
    }

    /**
     * Load all the mods from the configuration object. Used on startup to apply
     * stored mods.
     * 
     * @param config The configuration thats been loaded
     */
    loadModsFrom(config: ServerConfig): void {
        const modsToLoad = config.modScripts;

        for (const mod of modsToLoad) {
            this.addMod(mod, false);
        }
    }

    /**
     * Load the settings from local storage
     */
    load(): void {
        const existing = localStorage.getItem("serverSettings");
        if (existing) {
            Object.assign(this.config, JSON.parse(existing));

            const modsToLoad = this.config.modScripts;
            this.config.modScripts = [];

            for (const mod of modsToLoad) {
                this.addMod(mod, true);
            }
        }
    }
}