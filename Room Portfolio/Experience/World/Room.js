import {Experience} from "../Experience.js";
import * as THREE from "three";
import {WebGLRenderer} from "three";
import {RectAreaLightHelper} from "three/addons/helpers/RectAreaLightHelper.js";
import  GSAP from "gsap";


export default class Room{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resouces = this.experience.resources
        this.time = this.experience.time
        console.log(this.resouces.items.room)
        this.room = this.resouces.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }
    setModel(){
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;
            if(child.name === 'MONITOR'){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resouces.items.monitor
                })
            }
            if (child.name === "aquaglass") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x549dd2);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
                child.material.transparent=true;
            }
            if (child.name === "Garden") {
                child.position.y=0.03;
                child.position.x=-3.3
            }
            if (child.name === "Rock1") {
                child.scale.y=0;
                child.scale.x=0;
                child.scale.z=0;
            }
            if (child.name === "Rock2") {
                child.scale.y=0;
                child.scale.x=0;
                child.scale.z=0;
            }
            if (child.name === "Rock3") {
                child.scale.y=0;
                child.scale.x=0;
                child.scale.z=0;
            }
            if (child.name === "MailBox") {
                child.scale.y=0;
                child.scale.x=0;
                child.scale.z=0;
            }
            if (child.name === "Flowers") {
                child.scale.y=0;
                child.scale.x=0;
                child.scale.z=0;

            }
            if (child.name === "Flowers001") {
                child.scale.y=0;
                child.scale.x=0;
                child.scale.z=0;

            }
            if (child.name === "Flowers002") {
                child.scale.y=0;
                child.scale.x=0;
                child.scale.z=0;

            }

            if (child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })

            }
        })
        const width = 0.5;
        const height = 2;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(-0.75, 1.05, 2.8);
        rectLight.rotation.x = -Math.PI / 2;

        this.actualRoom.add(rectLight);

        this.roomChildren["rectLight"] = rectLight;

        const light = new THREE.PointLight( 0xffcc33, 0.5, 1 );
        light.position.set( -3.3, 0.8, 0.8 );
        light.castShadow = true;
        light.distance= 0.5;
        this.scene.add( light );
        this.actualRoom.add(light);

        this.scene.add(this.actualRoom)
    }
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.mixer2 = new THREE.AnimationMixer(this.actualRoom);
        console.log(this.room)
        this.swim = this.mixer.clipAction(this.room.animations[2]);
        this.clock1 = this.mixer2.clipAction(this.room.animations[166]);
        this.clock2= this.mixer2.clipAction(this.room.animations[167]);
        this.swim.play();
        this.clock1.play();
        this.clock2.play();
    }
    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    resize(){
    }
    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.001)
        this.mixer2.update(this.time.delta * 0.00004)

    }
}