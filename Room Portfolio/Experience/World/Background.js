import * as THREE from "three";
import {Experience} from "../Experience.js";

export default class Background {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles()

    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(150, 150);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffe6a2,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 1.7;
        this.plane.position.y = 0;
        this.plane.receiveShadow = true;
    }

    setCircles() {
        const geometry = new THREE.CircleGeometry(30, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0xe5a1aa,
            side: THREE.BackSide, });
        const material2 = new THREE.MeshStandardMaterial({ color: 0x8395cd ,
            side: THREE.BackSide,});
        const material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac ,
            side: THREE.BackSide,});

        this.circleFirst = new THREE.Mesh(geometry, material);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleThird = new THREE.Mesh(geometry, material3);

        this.circleFirst.position.y = 0.15;

        this.circleSecond.position.y = 0.17;

        this.circleThird.position.y = 0.2;

        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleThird.scale.set(0, 0, 0);

        this.circleFirst.rotation.x =
            this.circleSecond.rotation.x =
                this.circleThird.rotation.x =
                    Math.PI / 1.7;

        this.circleFirst.receiveShadow =
            this.circleSecond.receiveShadow =
                this.circleThird.receiveShadow =
                    true;
        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
    }



    resize() {
    }

    update() {
    }
}