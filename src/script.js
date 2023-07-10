import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
const clock = new THREE.Clock()
const textureLoader = new THREE.TextureLoader()
import device from "current-device"








//@ constants for measurement and other 

const sizes = {
    width: window.innerWidth*0.8,
    height: window.innerHeight*0.95,
}
if(device.type == 'desktop')
{
    sizes.width = window.innerWidth*0.93;
}



//@THREE.js building and all 3d related stuff 
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.001, 10000)
camera.position.set(0,0,1)
scene.add(camera)    
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false; 
controls.maxDistance = 10
controls.maxPolarAngle = Math.PI / 2.8

const gltf_loader=new GLTFLoader()
var object;
   
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)


//Animate
const tick = () =>
{
    
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)       
    // Call tick again on the next frame   
    window.requestAnimationFrame(tick)
}
tick()

const homeDivHeading = document.getElementById('homeDivHeading')



if(device.type != "desktop")
{
    gltf_loader.load('./sculpture/scene.gltf',(gltf)=>{ object=gltf.scene;object.scale.set(0.11,0.11,0.11);object.position.set(0,-6,0);object.rotation.y=3;scene.add(object)});
    const introHeadingKeyword = document.getElementById('introHeadingKeyWord') 
    introHeadingKeyword.style.fontSize = "80px"
    canvas.style.maxWidth = "95%"

}
else
{
    gltf_loader.load('./sculpture/scene.gltf',(gltf)=>{ object=gltf.scene;object.scale.set(0.13,0.13,0.13);object.position.set(0,-4,0);object.rotation.y=3;scene.add(object)}) 
    homeDivHeading.style.fontSize = "110px"
    homeDivHeading.style.textAlign = "left"
    homeDivHeading.style.marginLeft = "5%"

}

