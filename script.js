console.log('UUUUUGH');

function handleOrientation(event) {
    let beta = event.beta; // Forward/backward tilt

    let topDiv = document.querySelector(".top");
    let bottomDiv = document.querySelector(".bottom");

    if (beta < -10) {
        // Tilted upwards
        topDiv.style.height = "10vh";
        bottomDiv.style.height = "90vh";
    } else if (beta > 10) {
        // Tilted downwards
        topDiv.style.height = "80vh";
        bottomDiv.style.height = "20vh";
    }
}

// Check for permission on iOS
function requestMotionPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    window.addEventListener("deviceorientation", handleOrientation);
                }
            })
            .catch(console.error);
    } else {
        // Non-iOS devices
        window.addEventListener("deviceorientation", handleOrientation);
    }
}

// Request permission when user interacts
document.addEventListener("click", requestMotionPermission);