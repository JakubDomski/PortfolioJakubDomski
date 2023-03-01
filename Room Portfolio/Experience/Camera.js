import { Experience } from "./Experience.js";
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

export class Camera{
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls()
    }
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            100
        )
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.x = -5;
        this.perspectiveCamera.position.y = 3;
        this.perspectiveCamera.position.z =12;
    }
    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -50,
            50
        );
        this.scene.add(this.orthographicCamera)
    }
    resize(){
        //Updating Perspective Camera
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()
        //Updating Orthographic Camera
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2
        this.orthographicCamera.top = this.sizes.frustrum / 2
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2
    }
    update(){
       this.controls.update()
    }
    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera,this.canvas)
        this.controls.enableDamping = true;
      this.controls.enableZoom = true;
    }
}