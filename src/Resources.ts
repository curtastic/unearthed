//
// This is a big ole' collection of imported PNGs that have been
// packed up for us by webpack. I wouldn't normally do it this way
// but its worked out ok.
//
import male_head from "./img/playermale/male_head.png";
import male_body from "./img/playermale/male_body.png";
import male_arm from "./img/playermale/male_arm.png";
import male_leg from "./img/playermale/male_leg.png";

import female_head from "./img/playerfemale/female_head.png";
import female_body from "./img/playerfemale/female_body.png";
import female_arm from "./img/playerfemale/female_arm.png";

import sloton_ui from "./img/ui/sloton.png";
import slotoff_ui from "./img/ui/slotoff.png";
import left_ui from "./img/ui/left.png";
import right_ui from "./img/ui/right.png";
import up_ui from "./img/ui/up.png";
import down_ui from "./img/ui/down.png";
import front_ui from "./img/ui/front.png";
import back_ui from "./img/ui/back.png";
import arrowup_ui from "./img/ui/arrowup.png";

import backing_tile from "./img/tiles/backing.png";
import backingtop_tile from "./img/tiles/backingtop.png";
import undiscovered1_tile from "./img/tiles/undiscovered1.png";
import undiscovered2_tile from "./img/tiles/undiscovered2.png";
import undiscovered3_tile from "./img/tiles/undiscovered3.png";
import undiscovered4_tile from "./img/tiles/undiscovered4.png";

import pick_iron from "./img/holding/pick_iron.png";
import clouds_bg from "./img/bg/clouds.png";
import square_orange_particle from "./img/particles/square_orange.png";
import square_red_particle from "./img/particles/square_red.png";
import logo from "./img/logo.png";

import click_002 from "./sfx/ui/click_002.ogg";

import impactMetal_heavy_000 from "./sfx/ui/impactMetal_heavy_000.ogg";
import impactMetal_heavy_001 from "./sfx/ui/impactMetal_heavy_001.ogg";
import impactMetal_heavy_002 from "./sfx/ui/impactMetal_heavy_002.ogg";
import impactMetal_heavy_003 from "./sfx/ui/impactMetal_heavy_003.ogg";
import impactMetal_heavy_004 from "./sfx/ui/impactMetal_heavy_004.ogg";

/** The collection of all sprites loaded by the game */
const sprites: Record<string, HTMLImageElement> = {};
/** The collection of all sound effects loaded by the game */
const sfx: Record<string, HTMLAudioElement> = {};
/** The number of assets left to load */
let loadedCount = 0;

/**
 * Load a sprite into the resources cache
 * 
 * @param name The name to give the sprite in the cache
 * @param url The URL (normally a webpack reference) to load the sprite from
 * @returns The newly created image/sprite
 */
export function loadImage(name: string, url: string): HTMLImageElement {
    sprites[name] = new Image();
    sprites[name].src = url;
    loadedCount++;
    sprites[name].onload = () => { loadedCount--; };

    return sprites[name];
}

/**
 * Load a sound effect into the resources cache
 * 
 * @param name The name to give the sound effect in the cache
 * @param url The URL (normally a webpack reference) to load the sound effect from
 * @returns The newly created audio element
 */
export function loadSfx(name: string, url: string): HTMLAudioElement {
    sfx[name] = new Audio();
    sfx[name].src = url;
    loadedCount++;
    sfx[name].onloadeddata = () => { loadedCount--; };
    
    return sfx[name];
}

/**
 * Get a sprite from the cache with a specific name
 * 
 * @param name The name of the sprite to retrieve
 * @returns The sprite or undefined if the sprite couldn't be found
 */
export function getSprite(name: string): HTMLImageElement {
    return sprites[name];
}

/**
 * Get a sound effect from the cache with a specific name
 * 
 * @param name The name of the sound effect to retrieve
 * @returns The sound effect or undefined if the sound effect couldn't be found
 */
export function getSfx(name: string): HTMLAudioElement {
    return sfx[name];
}

/**
 * Check if all the resources managed by this cache have been loaded
 * 
 * @returns True if all the resources have been loaded
 */
export function resourcesLoaded(): boolean {
    return loadedCount === 0;
}

// same legs for everyone at themoment
loadImage("male.leg", male_leg);

// male body skin
loadImage("male.head", male_head);
loadImage("male.body", male_body);
loadImage("male.arm", male_arm);

// female body skin
loadImage("female.head", female_head);
loadImage("female.body", female_body);
loadImage("female.arm", female_arm);

// items
loadImage("pick.iron", pick_iron);

// misc resources
loadImage("clouds", clouds_bg);
loadImage("red.particle", square_red_particle);
loadImage("orange.particle", square_orange_particle);
loadImage("logo", logo);

// ui resources
loadImage("ui.sloton", sloton_ui);
loadImage("ui.slotoff", slotoff_ui);
loadImage("ui.left", left_ui);
loadImage("ui.right", right_ui);
loadImage("ui.up", up_ui);
loadImage("ui.down", down_ui);
loadImage("ui.front", front_ui);
loadImage("ui.back", back_ui);
loadImage("ui.arrowup", arrowup_ui);

// images that are used for the tilemap rendering but are not tiles
loadImage("tile.backing", backing_tile);
loadImage("tile.backingtop", backingtop_tile);
loadImage("tile.undiscovered1", undiscovered1_tile);
loadImage("tile.undiscovered2", undiscovered2_tile);
loadImage("tile.undiscovered3", undiscovered3_tile);
loadImage("tile.undiscovered4", undiscovered4_tile);

// ui sounds
loadSfx("click", click_002);

// mining sounds
loadSfx("mining.000", impactMetal_heavy_000);
loadSfx("mining.001", impactMetal_heavy_001);
loadSfx("mining.002", impactMetal_heavy_002);
loadSfx("mining.003", impactMetal_heavy_003);
loadSfx("mining.004", impactMetal_heavy_004);
