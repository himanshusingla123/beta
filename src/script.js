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
camera.position.set(0,0,7)
scene.add(camera)    
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false; 
controls.maxDistance = 10
controls.maxPolarAngle = Math.PI / 2.8

const gltf_loader=new GLTFLoader()
var object;
gltf_loader.load('./sculpture/scene.gltf',(gltf)=>{ object=gltf.scene;object.scale.set(0.13,0.13,0.13);object.position.set(0,-4,0);object.rotation.y=3;scene.add(object)}) 
   
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

const wireframeGeometry = new THREE.BoxBufferGeometry(15,32,16)
const wireframeMaterial = new THREE.MeshNormalMaterial({wireframe:true})
wireframeMaterial.side = THREE.DoubleSide
const wireframe = new THREE.Mesh(wireframeGeometry,wireframeMaterial)
scene.add(wireframe)

//Animate
const time = clock.getElapsedTime()
const tick = () =>
{
    const time = clock.getElapsedTime()
    wireframe.rotation.y= 1*time
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)       
    // Call tick again on the next frame   
    window.requestAnimationFrame(tick)
}
tick()

const homeDivHeading = document.getElementById('homeDivHeading')
const sin = document.querySelectorAll('.sin');
const mobile = document.getElementById('mobile')


if(device.type != "desktop")
{
   const allStuff = document.getElementById('allStuff')
   allStuff.style.display = "none"
   allStuff.remove();
}
else
{
    mobile.style.display = "none"
    mobile.remove();
}

/////////
const observer = new IntersectionObserver ((entries) => {
    entries.forEach( (entry) => { console. log (entry)
        if (entry.isIntersecting)
         {
        entry.target.classList.add('show');
        } else
         {
        entry. target.classList.remove('show');
        }
    });
    });


sin.forEach((el) => observer .observe (el));
