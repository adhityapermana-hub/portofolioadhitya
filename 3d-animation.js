// 3D Background Animation using Three.js

function init3DAnimation() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.log('Three.js not loaded. 3D animation disabled.');
        return;
    }
    
    // Get container
    const container = document.getElementById('animation-3d');
    if (!container) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x3b82f6, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8
    });
    
    // Particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create geometric shapes
    const shapes = [];
    const geometryTypes = [
        () => new THREE.TetrahedronGeometry(0.5, 0),
        () => new THREE.OctahedronGeometry(0.4, 0),
        () => new THREE.IcosahedronGeometry(0.6, 0),
        () => new THREE.TorusGeometry(0.3, 0.1, 16, 100)
    ];
    
    // Add shapes to scene
    for (let i = 0; i < 8; i++) {
        const geometry = geometryTypes[i % geometryTypes.length]();
        const material = new THREE.MeshPhongMaterial({
            color: i % 2 === 0 ? 0x3b82f6 : 0x8b5cf6,
            transparent: true,
            opacity: 0.6,
            shininess: 100,
            specular: 0x444444
        });
        
        const shape = new THREE.Mesh(geometry, material);
        
        // Random position
        shape.position.x = (Math.random() - 0.5) * 10;
        shape.position.y = (Math.random() - 0.5) * 10;
        shape.position.z = (Math.random() - 0.5) * 10;
        
        // Random rotation speed
        shape.userData = {
            rotationSpeed: {
                x: Math.random() * 0.02,
                y: Math.random() * 0.02,
                z: Math.random() * 0.02
            },
            moveSpeed: Math.random() * 0.005 + 0.001,
            direction: new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize()
        };
        
        scene.add(shape);
        shapes.push(shape);
    }
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        
        // Update shapes
        shapes.forEach(shape => {
            // Rotate
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            // Move
            shape.position.x += shape.userData.direction.x * shape.userData.moveSpeed;
            shape.position.y += shape.userData.direction.y * shape.userData.moveSpeed;
            shape.position.z += shape.userData.direction.z * shape.userData.moveSpeed;
            
            // Bounce off boundaries
            const boundary = 8;
            if (Math.abs(shape.position.x) > boundary) shape.userData.direction.x *= -1;
            if (Math.abs(shape.position.y) > boundary) shape.userData.direction.y *= -1;
            if (Math.abs(shape.position.z) > boundary) shape.userData.direction.z *= -1;
            
            // Follow mouse slightly
            shape.position.x += mouseX * 0.05;
            shape.position.y += mouseY * 0.05;
        });
        
        // Slowly rotate camera
        camera.position.x = Math.sin(Date.now() * 0.0005) * 5;
        camera.position.z = Math.cos(Date.now() * 0.0005) * 5;
        camera.lookAt(0, 0, 0);
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
}

// Initialize 3D animation when page loads
window.addEventListener('load', init3DAnimation);