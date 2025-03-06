console.log("Device Orientation Script Loaded");

// 요청 시점 변경: 페이지 로드 시 권한 요청
document.addEventListener("DOMContentLoaded", requestMotionPermission);

function handleOrientation(event) {
    let beta = event.beta; // 앞뒤 기울기 (-90 ~ 90)
    let gamma = event.gamma; // 좌우 기울기 (-90 ~ 90)

    let topLeft = document.querySelector(".top-left");
    let topRight = document.querySelector(".top-right");
    let bottomLeft = document.querySelector(".bottom-left");
    let bottomRight = document.querySelector(".bottom-right");
    let left = document.querySelector(".left");
    let right = document.querySelector(".right");

    // 🔹 `beta` 값 (-90 ~ 90)을 정규화하여 height 변경 (10vh ~ 90vh)
    let normalizedHeight = ((beta + 90) / 180) * 80 + 10; // 10 ~ 90vh
    topLeft.style.height = `${normalizedHeight}vh`;
    topRight.style.height = `${normalizedHeight}vh`;
    bottomLeft.style.height = `${100 - normalizedHeight}vh`;
    bottomRight.style.height = `${100 - normalizedHeight}vh`;

    // 🔹 `gamma` 값 (-90 ~ 90)을 정규화하여 flex 변경 (0 ~ 10)
    let normalizedFlex = ((gamma + 90) / 180) * 10; // 0 ~ 10
    left.style.flex = `${10 - normalizedFlex}`;
    right.style.flex = `${normalizedFlex}`;
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
