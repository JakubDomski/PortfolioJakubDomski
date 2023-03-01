import {Experience} from "../Experience.js";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import ASScroll from "@ashthornton/asscroll";

export default class Controls{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;

        this.camera = this.experience.camera
        this.background = this.experience.world.background
        this.room= this.experience.world.room.actualRoom
        this.room.children.forEach((child)=>{
            if (child.type === "RectAreaLight"){
                this.rectLight = child;
            }
        })
        this.circleFirst = this.experience.world.background.circleFirst;
        this.circleSecond = this.experience.world.background.circleSecond;
        this.circleThird = this.experience.world.background.circleThird;
        gsap.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            this.setSmoothScroll();
        }
        this.setScroll();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        gsap.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScroll(){
       ScrollTrigger.matchMedia({

           "(min-width: 1200px)": ()=>{
               //First section
               this.firstMoveTimeline = new gsap.timeline({
                       scrollTrigger:{
                           trigger:".first-move",
                           start:"top top",
                           end:"bottom bottom",
                           scrub: 0.6,
                           invalidateOnRefresh:true
                       }
                   })
               this.firstMoveTimeline.to(this.room.position,{
                   x:()=>{
                       return this.sizes.width * 0.0032
                   }
               })
               //Second section
               this.secondMoveTimeline = new gsap.timeline({
                   scrollTrigger:{
                       trigger:".second-move",
                       start:"top top",
                       end:"bottom bottom",
                       scrub: 0.6,
                       invalidateOnRefresh:true
                   }
               })
               this.secondMoveTimeline.to(this.room.position,{
                   x:()=>{
                      return 2
                   },

               },"same")

               this.secondMoveTimeline.to(this.room.scale,{
                   x:2.5,
                   y:2.5,
                   z:2.5,
               },"same")
               this.secondMoveTimeline.to(this.rectLight,{
                  width:0.5*2.5,
                  height:2*2.5
               },"same")

               //Third section
               this.thirdMoveTimeline = new gsap.timeline({
                   scrollTrigger:{
                       trigger:".third-move",
                       start:"top top",
                       end:"bottom bottom",
                       scrub: 0.6,
                       invalidateOnRefresh:true
                   }
               })

               this.thirdMoveTimeline.to(this.camera.perspectiveCamera.position,{
                   x:-23,
                   y:6,
                   z:7

               },"twins")

               this.thirdMoveTimeline.to(this.background.plane.rotation,{
                   y:0.32

               },"twins")
               this.thirdMoveTimeline.to(this.background.circleThird.rotation,{
                   y:0.32

               },"twins")
               this.thirdMoveTimeline.to(this.background.circleFirst.rotation,{
                   y:0.32
               },"twins")
               this.thirdMoveTimeline.to(this.background.circleSecond.rotation,{
                   y:0.32
               },"twins")


           },

           "(max-width: 1200px)": ()=>{
                //First section
               this.rectLight.width = 0.25
               this.rectLight.height=1
               this.room.scale.set(0.45,0.45,0.45)
               this.room.position.x=1
               this.firstMoveTimeline = new gsap.timeline({
                   scrollTrigger:{
                       trigger:".first-move",
                       start:"top top",
                       end:"bottom bottom",
                       scrub: 0.6,
                       invalidateOnRefresh:true
                   }
               }).to(this.room.scale,{
                   x:1,
                   y:1,
                   z:1
               },"same")
               this.firstMoveTimeline.to(this.rectLight,{
                   width:0.25*2,
                   height:1.1*2
               },"same")

               //Second section
               this.secondMoveTimeline = new gsap.timeline({
                   scrollTrigger:{
                       trigger:".second-move",
                       start:"top top",
                       end:"bottom bottom",
                       scrub: 0.6,
                       invalidateOnRefresh:true
                   }
               }).to(this.room.scale,{
                   x:1.5,
                   y:1.5,
                   z:1.5
               },"same")
               this.secondMoveTimeline.to(this.camera.perspectiveCamera.position,{
                   x:-10,
                   y:4,
                   z:8

                   },"same")

               //Third section
               this.thirdMoveTimeline = new gsap.timeline({
                   scrollTrigger:{
                       trigger:".third-move",
                       start: "center center",
                       end:"bottom bottom",
                   }
               }).to(this.camera.perspectiveCamera.position,{
                   x:-23,
                   y:3,
                   z:15

               },"twins").to(this.background.plane.rotation,{
                   y:0.32

               },"twins").to(this.background.circleThird.rotation,{
                   y:0.32

               },"twins").to(this.background.circleSecond.rotation,{
                   y:0.32

               },"twins").to(this.background.circleFirst.rotation,{
                   y:0.32

               },"twins")
           },
           all:()=>{
               this.sections = document.querySelectorAll(".section");
               this.sections.forEach((section) => {
                   this.progressWrapper =
                       section.querySelector(".progress-wrapper");
                   this.progressBar = section.querySelector(".progress-bar");

                   if (section.classList.contains("right")) {
                       gsap.to(section, {
                           borderTopLeftRadius: 10,
                           scrollTrigger: {
                               trigger: section,
                               start: "top bottom",
                               end: "top top",
                               scrub: 0.6,
                           },
                       });
                       gsap.to(section, {
                           borderBottomLeftRadius: 700,
                           scrollTrigger: {
                               trigger: section,
                               start: "bottom bottom",
                               end: "bottom top",
                               scrub: 0.6,
                           },
                       });
                   } else {
                       gsap.to(section, {
                           borderTopRightRadius: 10,
                           scrollTrigger: {
                               trigger: section,
                               start: "top bottom",
                               end: "top top",
                               scrub: 0.6,
                           },
                       });
                       gsap.to(section, {
                           borderBottomRightRadius: 700,
                           scrollTrigger: {
                               trigger: section,
                               start: "bottom bottom",
                               end: "bottom top",
                               scrub: 0.6,
                           },
                       });
                   }
                   gsap.from(this.progressBar, {
                       scaleY: 0,
                       scrollTrigger: {
                           trigger: section,

                           start: "top top",
                           end: "bottom bottom",
                           scrub: 0.4,
                           pin: this.progressWrapper,
                           pinSpacing: false,
                       },
                   });
               });

               // All animations
               this.firstMoveTimeline = new gsap.timeline({
                   scrollTrigger:{
                       trigger:".first-move",
                       start:"top top",
                       end:"bottom bottom",
                       scrub: 0.6,
                       invalidateOnRefresh:true
                   }
               }).to(this.circleFirst.scale,{
                   x:1.5,
                   y:1.5,
                   z:1.5
               },"same")
               this.secondMoveTimelineCircle = new gsap.timeline({
                   scrollTrigger:{
                       trigger:".second-move",
                       start:"top top",
                       end:"bottom bottom",
                       scrub: 0.6,
                       invalidateOnRefresh:true
                   }
               }).to(this.circleSecond.scale,{
                   x:1.5,
                   y:1.5,
                   z:1.5
               },"same")
               this.thirdMoveTimelineCircle = new gsap.timeline({
                   scrollTrigger:{
                       trigger:".third-move",
                       start:"top top",
                       end:"bottom bottom",
                       scrub: 0.6,
                       invalidateOnRefresh:true
                   }
               }).to(this.circleThird.scale,{
                   x:1.5,
                   y:1.5,
                   z:1.5
               },"same")


               this.secondPartTimeline2 = new gsap.timeline({
                   scrollTrigger: {
                       trigger: ".third-move",
                       start: "center center",
                   },
               })

               //Garden animation for the last section
               this.room.children.forEach(child=>{
                   if(child.name ==="Garden"){
                       this.first = gsap.to(child.position,{
                           x:-4.8,
                           ease: "back.out(2)",
                           duration: 0.3
                       })
                   }
                   if(child.name ==="Rock1"){
                       this.second =gsap.to(child.scale,{
                           x:-0.13,
                          y:-0.043,
                           z:-0.25,
                           ease: "back.out(2)",
                           duration: 0.3
                       })
                   }
                   if(child.name ==="Rock2"){
                       this.third = gsap.to(child.scale,{
                           x:-0.13,
                           y:-0.043,
                           z:-0.25,
                           ease: "back.out(2)",
                           duration: 0.3                       })
                   }
                   if(child.name ==="Rock3"){
                       this.fourth = gsap.to(child.scale,{
                           x:-0.13,
                           y:-0.043,
                           z:-0.25,
                           ease: "back.out(2)",
                           duration: 0.3                       })
                   }
                   if(child.name ==="MailBox"){
                       this.fifth = gsap.to(child.scale,{
                           x:0.20882393419742584,
                           y:0.09,
                           z:0.1,
                           ease: "back.out(2)",
                           duration: 0.3                       })
                   }

                   if(child.name ==="Flowers"){
                       this.sixth =gsap.to(child.scale,{
                           x:100,
                           y:100,
                           z:100,
                           ease: "back.out(2)",
                           duration: 0.3                       })
                   }
                   if(child.name ==="Flowers001"){
                       this.seventh = gsap.to(child.scale,{
                           x:73.33,
                           y:73.33,
                           z:73.33,
                           ease: "back.out(2)",
                           duration: 0.3
                       })
                   }
                   if(child.name ==="Flowers002"){
                       this.eighth = gsap.to(child.scale,{
                           x:100,
                           y:100,
                           z:100,
                           ease: "back.out(2)",
                           duration: 0.3                       })
                   }
               })
               this.secondPartTimeline2.add(this.first);
               this.secondPartTimeline2.add(this.second);
               this.secondPartTimeline2.add(this.third);
               this.secondPartTimeline2.add(this.fourth, "-=0.2");
               this.secondPartTimeline2.add(this.fifth, "-=0.2");
               this.secondPartTimeline2.add(this.sixth, "-=0.2");
               this.secondPartTimeline2.add(this.seventh, "-=0.2");
               this.secondPartTimeline2.add(this.eighth);
           }
       })
    }
    resize(){}
    update(){}
}