const iconBase = '/imgs/';

const icons = {
    default: {
        icon: iconBase + "marker.svg",
    },
    active: {
        icon: iconBase + "marker-active.svg",
    },
};


// const total = 10;
let markers = [];
let activeId;

async function initMap() {
// Request needed libraries.

    let mapDetail;

    const BALI_BOUNDS = {
        south: -9.152975,
        north: -7.956589,
        west: 114.002997,
        east: 116.289527,
    };

    const BALI = { lat: -8.456018100000001, lng: 115.27038551191185 };

    const { Map } = await google.maps.importLibrary("maps");

    const closeModal = document.querySelectorAll(".close-map-detail");
    const closeModalMobile = document.querySelectorAll(".mobile-close");
    // const mapDetailTitle = document.getElementById("mapDetailTitle");
    // const mapDetailAddress = document.getElementById("mapDetailAddress");
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const defaultZoom = 10;
    const activeZoom = 18;
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: BALI,
        // mapId: "map",
        restriction: {
            latLngBounds: BALI_BOUNDS,
            strictBounds: false,
        },
        styles : [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi",
                stylers: [
                  {visibility: "off"}
                ]
            },
            {
              featureType: "transit",
              stylers: [{ visibility: "off" }],
            },
        ],
        fullscreenControl: false,
        zoom: defaultZoom,
        minZoom: defaultZoom,
    });

    dataMap.forEach(({ position, title, name, address, id }, i) => {
        const iconImage = document.createElement("img");
        
        if(dataActive !== null && dataActive.id === id) {
            iconImage.src = icons['active'].icon;
        } else {    
            iconImage.src = icons['default'].icon;
        }

        const marker = new google.maps.Marker({
            position,
            map,
            gmpClickable: true,
            icon: iconImage.src,
            // title: title,
            // name: name,
            id: id,
            // address: address,
        });


        markers.push(marker);

        const resetModal = () => {
            const iconImage = document.createElement("img");
            iconImage.src = icons['default'].icon;
    
            for (var j = 0; j < markers.length; j++) {
                markers[j].setIcon(iconImage.src);
            }
            activeId = '';
            
            if(mapDetail) {
                mapDetail.style.display = "none";
            }

            map.setZoom(defaultZoom);

        }

        marker.addListener("mouseover", () => {
            const iconImageActive = document.createElement("img");
            iconImageActive.src = icons['active'].icon;

            marker.setIcon(iconImageActive.src);
        });

        marker.addListener("mouseout", () => {
            if(activeId !== marker.id) {
                const iconImage = document.createElement("img");
                iconImage.src = icons['default'].icon;
    
                marker.setIcon(iconImage.src);
            }
        });

        marker.addListener("click", () => {
            resetModal();

            const iconImageActive = document.createElement("img");
            iconImageActive.src = icons['active'].icon;

            marker.setIcon(iconImageActive.src);
            map.setZoom(activeZoom);
            map.panTo(marker.position);
            
            activeId = marker.id;
            
            // mapDetailAddress.innerHTML = marker.address;
            mapDetail = document.querySelector(`.map-detail[data-id="${marker.id}"]`);

            mapDetail.style.display = "block";
        });


        // map.addListener("click", resetModal);
        // map.addListener("drag", resetModal);
        closeModal.forEach(c => {
            c.addEventListener("click", resetModal);
        });
        closeModalMobile.forEach(item => {
            item.addEventListener("click", resetModal);
        })
    });


    if(dataActive !== null) {

        const activeMarker = markers.filter(m => m.id ==  dataActive.id)[0];
        const iconImageActive = document.createElement("img");
        iconImageActive.src = icons['active'].icon;

        activeMarker.setIcon(iconImageActive.src);
        map.setZoom(activeZoom);
        map.panTo(activeMarker.position);

        activeId = activeMarker.id;

        mapDetail = document.querySelector(`.map-detail[data-id="${activeMarker.id}"]`);

        mapDetail.style.display = "block";

    }
}

initMap();