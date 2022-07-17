/////////////////////////////////////////////////////////////////////
//////////////////// THREEJS SCENE PREP STARTS //////////////////////
/////////////////////////////////////////////////////////////////////

import * as THREE from '../node_modules/three/build/three.module.js';
// import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls'

let camera, controls, scene, renderer;

const init = () => {
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);



    // renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(400, 200, 0);

    // // controls
    // const controls =  new OrbitControls(camera, renderer.domElement)

    // // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;
    // controls.screenSpacePanning = true;
    // controls.minDistance = 50;
    // controls.maxDistance = 300;
    // controls.maxPolarAngle = Math.PI / 2;


    // Sphere
    const geometry = new THREE.BoxGeometry(50, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffff00
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);


    // window resize event
    window.addEventListener('resize', onWindowResize);
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const animate = () => {
    // requestAnimationFrame(animate);
    // controls.update();
    render();
}

const render = () => {
    renderer.render(scene, camera);
}

init();
render();
animate();



/////////////////////////////////////////////////////////////////////
//////////////////// THREEJS SCENE PREP ends ////////////////////////
/////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////
//////////////////// PAIR COLLECTION  STARTS ////////////////////////
/////////////////////////////////////////////////////////////////////


class pairCollection {
    #povPairs = [
    ];

    setPair(...args) {
        // destruct arguments
        const [mediaID, pov] = args
        if (mediaID != undefined && pov != undefined) {

            // checks if mediaID exists in pov pairs
            const filteredItem = this.#povPairs.filter((item) => (item.mediaID === mediaID))

            // if one pair already exists, this changes pov values, if not, it creates new pair
            filteredItem.length ? (
                this.#povPairs.map(
                    current => (current.mediaID === mediaID)
                        ? current.pov = pov
                        : ''
                )
            ) : (
                this.#povPairs.push({ mediaID: mediaID, pov: pov })
            )
            return this.#povPairs
        }
    }

    // gets pov pair for matching mediaID
    getPov(mediaID) {
        return this.#povPairs.filter(el => el.mediaID === mediaID)[0]
    }

    // gets the nearest position in pov pair
    getMedia(pov) {
        // get pov nearest to the current pov
        const distArr = this.#povPairs

        // calculates the distance from each pov element
        for (const item of distArr) {
            item.distance = Math.sqrt(
                (item.pov.position[0] - pov[0]) ** 2 + (item.pov.position[1] - pov[1]) ** 2 + (item.pov.position[2] - pov[2]) ** 2
            )
        }

        // sort the pov according to the lowest distance
        distArr.sort((a, b) => a.distance - b.distance)

        // returns the media nearest to the current pov
        return distArr[0]
    }
}



const mediaCollection = new pairCollection




// //////////// FIRST TEST  ///////////////
// ////// CREATING 3 NEW MEDIA PAIR /////////
// console.log("First Test: ");

// mediaCollection.setPair(
//     '123454',
//     {
//         position: [20, 20, 20],
//         rotation: [10, 0, 0]
//     }
// );

// mediaCollection.setPair(
//     '123456',
//     {
//         position: [10, 10, 10],
//         rotation: [10, 0, 0]

//     }
// )

// mediaCollection.setPair(
//     '123455',
//     {
//         position: [60, 10, 10],
//         rotation: [10, 0, 0]

//     }
// )


// ///////// FIRST TEST ENDS  ////////////







// //////////// SECOND TEST  ///////////////
// ////// MODIFYING EXIST MEDIA PAIR /////////
// console.log(" ");
// console.log("Second Test: ");
// console.log(mediaCollection.setPair(
//     '123456',
//     {
//         position: [5, 10, 10],
//         rotation: [10, 0, 0]
//     }
// ));
// ///////// SECOND TEST ENDS  ////////////


// //////////// THIRD TEST  ///////////////
// ////// GETTING POV FROM MEDIAID /////////
// console.log(" ");
// console.log("Third Test: ");
// console.log(mediaCollection.getPov(
//     '123455'
// ));
// ///////// THIRD TEST ENDS  ////////////


// //////////// FOURTH TEST  ///////////////
// ////// GETTING NEAREST POV  /////////
// console.log(" ");
// console.log("Fourth Test: ");
// console.log(mediaCollection.getMedia([0, 0, 0]));
// ///////// FOURTH TEST ENDS  ////////////





/////////////////////////////////////////////////////////////////////
//////////////////// PAIR  COLLECTION  ENDS  ////////////////////////
/////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////
//////////////////// IMAGE  CONTAINER START  ////////////////////////
/////////////////////////////////////////////////////////////////////

// const imageInput = document.getElementById('input-image')
// let uploadedImage = '';

// imageInput.addEventListener('change', () => {
//     const reader = new FileReader();
//     reader.addEventListener("load", () => {
//         uploadedImage = reader.result;
//         document.getElementsByClassName('imageTest')[0].style.backgroundImage = `url(${uploadedImage})`
//     })
//     reader.readAsDataURL(imageInput.files[0])
// })


//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions
button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}
input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = input.files;
    dropArea.classList.add("active");
    addFile(); //calling function
});
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files;
    addFile();
});



const addFile = () => {
    for (let i = 0; i < file.length; i++) {
        let fileReader = new FileReader();
        try {
            fileReader.onload = () => {
                let fileURL = fileReader.result; //passing user file source in fileURL variable
                let uniqueId = Math.floor(Math.random() * 10000000)
                imageContainer.getElementsByClassName('cards')[0].insertAdjacentHTML('beforeend', `
                <img onclick="thumbnailClick()" src="${fileURL}" alt="image" imageId="${uniqueId}" class="thumbnail-img" img>
                `)
                    mediaCollection.setPair(
                        uniqueId, ''
                    )
            }
            fileReader.readAsDataURL(file[i]);
        } catch {
        }
    }
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
}



/////////////////////////////////////////////////////////////////////
//////////////////// IMAGE  CONTAINER  ENDS  ////////////////////////
/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////
//////////////////// SLIDER CONTAINER START  ////////////////////////
/////////////////////////////////////////////////////////////////////

const imageContainer = document.getElementsByClassName('image-container')[0];

// const cards = document.getElementsByClassName('cards')[0]

// let isPressedDown = false
// let cursorXspace;

// imageContainer.addEventListener("mousedown", (e)=>{
//     isPressedDown = true;
//     cursorXspace = e.offsetX - cards.offsetLeft;
//     console.log(cards.offsetLeft);

// })

// imageContainer.addEventListener('mousemove', (e)=> {
//     if (!isPressedDown) return;
//     e.preventDefault();
//     cards.style.left = `${e.offsetX - cursorXspace}px`
//     boundImages()
// })

// window.addEventListener('mouseup', ()=> {
//     isPressedDown = false
// })

// const boundImages = ()=>{

// }


/////////////////////////////////////////////////////////////////////
//////////////////// SLIDER CONTAINER  ENDS  ////////////////////////
/////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////
//////////////////// BUTTONS ACTIVITIES START ///////////////////////
/////////////////////////////////////////////////////////////////////

const viewerContainer = document.getElementsByClassName('viewer-container')[0]
const thumbnailImages = document.getElementsByClassName('thumbnail-img')
const previewImage = document.querySelector('.display-image img')
const viewBtnIcon = document.querySelector('.icon.view')
const setBtnIcon = document.querySelector('.icon.set')
let selectedID

const thumbnailClick = () => {
    previewImage.setAttribute('src', event.target.getAttribute('src'))
    for (let i = 0; i < thumbnailImages.length; i++) {
        thumbnailImages[i].classList.remove('active')
    }
    event.target.classList.add('active')
    selectedID = parseInt(event.target.getAttribute('imageId'))
    viewBtnIcon.classList.remove('disable')
    setBtnIcon.classList.remove('disable')
    if (!mediaCollection.getPov(selectedID).pov) {
        viewBtnIcon.classList.add('disable')
    }

}


const viewBtn = () => {
    let newCamPos = mediaCollection.getPov(selectedID).pov
    if (selectedID && newCamPos) {
        gsap.to(camera.position, {
            duration: 1,
            ease: 'easeOut',
            x: newCamPos.position[0],
            y: newCamPos.position[1],
            z: newCamPos.position[2],
            onUpdate: function () {
                camera.lookAt({ x: 0, y: 0, z: 0 })
                camera.updateProjectionMatrix();
                controls.update();
            },
            onComplete: () => {
                console.log("completed");
            }
        });


    }

}
const setBtn = () => {
    viewBtnIcon.classList.remove('disable')
    mediaCollection.setPair(
        selectedID,
        {
            position: [camera.position.x, camera.position.y, camera.position.z],
            rotation: [camera.rotation._x, camera.rotation._y, camera.rotation._z]
        }
    );
}


const openBtnIcon = document.querySelector('.icon.open')
const closeBtnIcon = document.querySelector('.icon.close')
const controlButtons = document.querySelectorAll('.control-buttons .icon')
const iconText = document.querySelectorAll('.icon-text')

const closeBtn = () => {
    previewImage.parentElement.style.opacity = '0';
    selectedID = null;
    closeBtnIcon.style.display = 'none';
    openBtnIcon.style.display = 'block';
    controlButtons[0].style.left = '100px';
    controlButtons[1].style.left = '100px';
    iconText[0].style.left = '100px';
    iconText[1].style.left = '100px';
    viewerContainer.style.bottom = '-150px'
}

const openBtn = () => {
    previewImage.parentElement.style.opacity = '1';
    closeBtnIcon.style.display = 'block';
    openBtnIcon.style.display = 'none';
    controlButtons[0].style.left = '0';
    controlButtons[1].style.left = '0';
    iconText[0].style.left = '0';
    iconText[1].style.left = '0';
    viewerContainer.style.bottom = '0'
}



/////////////////////////////////////////////////////////////////////
//////////////////// BUTTONS ACTIVITIES ENDS  ///////////////////////
/////////////////////////////////////////////////////////////////////
