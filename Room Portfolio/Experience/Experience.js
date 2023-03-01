import * as THREE from "three"
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import {Camera} from "./Camera.js"
import Renderer from "./Renderer.js";
import Theme from "./Theme.js";
import ToggleButton from "./ToggleButton.js";
import World from "./World/World.js";
import assets from "./Utils/assets.js";

export  class Experience{
    static instance;
    constructor(canvas) {
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.theme = new Theme();
        this.resources = new Resources(assets)
        this.world = new World()
        this.toggleButton = new ToggleButton()

        this.time.on("update",()=>this.update())
        this.sizes.on("resize",()=>this.resize())
    }

    update(){
        this.camera.update();
        this.renderer.update();
        this.world.update()
    }
    resize(){
        this.camera.resize();
        this.renderer.resize();
        this.world.resize()
    }
}