console.log("Device Orientation Script Loaded");

// 요청 시점 변경: 페이지 로드 시 권한 요청
document.addEventListener("DOMContentLoaded", requestMotionPermission);

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

// iOS에서 자동으로 권한 요청
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
        // iOS가 아닐 때 바로 이벤트 등록
        window.addEventListener("deviceorientation", handleOrientation);
    }
}