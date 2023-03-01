import {EventEmitter} from "events"
import {Experience} from "../Experience.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import{DRACOLoader} from "three/addons/loaders/DRACOLoader.js";
import assets from "./assets.js";
import {NearestFilter, sRGBEncoding, VideoTexture} from "three";

export default class Resources extends EventEmitter{
    constructor(assets) {
        super();
        this.experience = new Experience()
        this.renderer = this.experience.renderer;
        this.assets =  assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;
        this.setLoaders();
        this.startLoading();

        }
        setLoaders(){
            this.loaders = {}
            this.loaders.gltfLoader = new GLTFLoader();
            this.loaders.dracoLoader = new DRACOLoader();
            this.loaders.dracoLoader.setDecoderPath('/draco/');
            this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);

        }
        singleAssetLoaded(asset,file){
        this.items[asset.name]=file;
        this.loaded++;
        console.log(this.items)

        if(this.loaded === this.queue){

            this.emit('ready')
        }
        }
        startLoading(){
        for(const asset of this.assets){
            if(asset.type === 'glb'){
                this.loaders.gltfLoader.load(asset.path,(file)=>{
                    this.singleAssetLoaded(asset,file)
                    console.log(this.loaded)
                })
            }else if(asset.type === "mp4"){
                this.video = {};
                this.videoTexture = {};
                this.video[asset.name] = document.createElement("video")
                this.video[asset.name].src = asset.path
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].muted = true;
                this.video[asset.name].play()
                this.videoTexture[asset.name]= new VideoTexture(
                    this.video[asset.name]
                );
                this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = NearestFilter;
                this.videoTexture[asset.name].magFilter = NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = sRGBEncoding
                this.singleAssetLoaded(asset, this.videoTexture[asset.name])
            }
        }

        }
    }
