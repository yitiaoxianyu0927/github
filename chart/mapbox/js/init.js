mapboxgl.accessToken = 'pk.eyJ1IjoieWl0aWFveGlhbnl1MDkyNyIsImEiOiJjanY0ZTY4cDYycHpmM3lzMHdhZXN3d3djIn0.V5DAb09ivNYmrQPfTDXMyQ';
var map = new mapboxgl.Map({
    style: 'mapbox://styles/yitiaoxianyu0927/cjxpewciw0tzj1coc1nnp9vuj',
    center: [123.38, 41.8],
    zoom: 15.5,
    pitch: 45, //倾斜角度
    bearing: -17.6,
    container: 'map'
});


var marker = new mapboxgl.Marker({
       draggable: true
    })
    .setLngLat([123.38, 41.8])
    .addTo(map);
// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.




var THREE = window.THREE;
 
// configuration of the custom layer for a 3D model per the CustomLayerInterface
var customLayer = {

    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function(map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        
        // create two three.js lights to illuminate the model
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);
        
        var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);
        
        // use the three.js GLTF loader to add the 3D model to the three.js scene
        var loader = new THREE.GLTFLoader();
        loader.load('https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf', (function (gltf) {
        this.scene.add(gltf.scene);
        }).bind(this));
        this.map = map;
        
        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true
        });
        
        this.renderer.autoClear = false;
        },
        render: function(gl, matrix) {
        var rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), modelTransform.rotateX);
        var rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), modelTransform.rotateY);
        var rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), modelTransform.rotateZ);
        
        var m = new THREE.Matrix4().fromArray(matrix);
        var l = new THREE.Matrix4().makeTranslation(modelTransform.translateX, modelTransform.translateY, modelTransform.translateZ)
                                    .scale(new THREE.Vector3(modelTransform.scale, -modelTransform.scale, modelTransform.scale))
                                    .multiply(rotationX)
                                    .multiply(rotationY)
                                    .multiply(rotationZ);
                                    
        this.camera.projectionMatrix.elements = matrix;
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.state.reset();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
};
 
// map.on('style.load', function() {
//     map.addLayer(customLayer, 'waterway-label');
// });

map.on('load', function() {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "height"]
            ],
            'fill-extrusion-base': [
                "interpolate", ["linear"], ["zoom"],
                15, 0,
                15.05, ["get", "min_height"]
            ],
            'fill-extrusion-opacity': .6
        }
    }, labelLayerId);


    //map.addLayer(customLayer, 'waterway-label');

});