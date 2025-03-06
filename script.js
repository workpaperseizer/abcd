console.log("Device Orientation Script Loaded");

function handleOrientation(event) {
    let beta = event.beta; // Forward/backward tilt

    let topLeft = document.querySelector(".top-left");
    let topRight = document.querySelector(".top-right");
    let bottomLeft = document.querySelector(".bottom-left");
    let bottomRight = document.querySelector(".bottom-right");

    if (beta < -10) {
        // Tilted upwards
        topLeft.style.height = "10vh";
        topRight.style.height = "10vh";
        bottomLeft.style.height = "90vh";
        bottomRight.style.height = "90vh";
    } else if (beta > 10) {
        // Tilted downwards
        topLeft.style.height = "90vh";
        topRight.style.height = "90vh";
        bottomLeft.style.height = "10vh";
        bottomRight.style.height = "10vh";
    }
}

// Check for permission on iOS
function requestMotionPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    window.addEventListener("deviceorientation", handleOrientation);
                } else {
                    console.warn("DeviceOrientation permission denied");
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