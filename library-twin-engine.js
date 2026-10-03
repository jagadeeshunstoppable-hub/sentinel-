/**
 * Sentinel-X Photo-Based Library / Campus Learning Space Digital Twin Engine
 * ==========================================================================
 * Reconstructed 3D spatial environment based on 4 real multi-angle site photographs.
 * 
 * Reconstructed Architectural Elements:
 * - Dual-surface floor with curved boundary: Royal purple carpet and warm light oak parquet.
 * - Cylindrical curved reception desk with white counter & deep forest green fluted paneling.
 * - Circular suspended LED halo fixture hovering above the reception desk.
 * - Secondary yellow fluted service counter and curved yellow modular snake sofa.
 * - 5-bay birch bookshelf wall populated with multi-colored books and warm shelf downlights.
 * - Casual lounge zone with scattered orange and indigo beanbags, green cylinder poufs, and armchairs.
 * - Open-plenum industrial ceiling with matte black HVAC ducts, red fire pipes, suspended geometric lights.
 * - Floor-to-ceiling modern architectural glass partition walls with black mullions and frosted doors.
 * - 4 calibrated camera viewpoints matching Photo 01, Photo 02, Photo 03, and Photo 04.
 * 
 * Version: 1.0.0
 * Architecture: Completely additive, decoupled, zero-interference with industrial twin.
 */

(function(window) {
    'use strict';

    if (typeof THREE === 'undefined') {
        console.warn('Three.js (r128) must be loaded before library-twin-engine.js');
    }

    class LibraryTwinEngine {
        constructor(containerId, options = {}) {
            this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
            if (!this.container) {
                console.error('LibraryTwinEngine: Container not found:', containerId);
                return;
            }

            this.options = Object.assign({
                onSelectObject: null,
                onViewChanged: null
            }, options);

            this.scene = null;
            this.camera = null;
            this.renderer = null;
            this.animId = null;
            this.isRunning = false;

            // Camera Motion & Target
            this.camPos = new THREE.Vector3(0, 8.5, 13.5);
            this.camTargetPos = new THREE.Vector3(0, 8.5, 13.5);
            this.camLook = new THREE.Vector3(0, 1.2, 0);
            this.camTargetLook = new THREE.Vector3(0, 1.2, 0);
            this.currentPresetKey = 'OVERVIEW';

            // Interaction & Raycasting
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.isMouseDown = false;
            this.prevMouse = { x: 0, y: 0 };
            this.orbitRadius = 14;
            this.orbitTheta = 0;
            this.orbitPhi = Math.PI / 4;

            // Layer Groups
            this.layers = {
                architecture: new THREE.Group(),
                furniture: new THREE.Group(),
                lighting: new THREE.Group(),
                bookshelves: new THREE.Group(),
                zones: new THREE.Group(),
                pois: new THREE.Group(),
                safeRoute: new THREE.Group()
            };

            this.layersVisibility = {
                zones: false,
                pois: true,
                safeRoute: false,
                occupancy: true
            };

            // Preset Viewpoints (calibrated to the 4 photos + operational angles)
            this.presets = {
                OVERVIEW: {
                    pos: new THREE.Vector3(0, 9.2, 14.5),
                    look: new THREE.Vector3(0, 1.0, 0),
                    title: "OVERVIEW (CAMPUS LEARNING COMMONS)",
                    desc: "Elevated perspective showing dual-material floor zoning, reception hub, and bookshelf wall."
                },
                RECEPTION: {
                    pos: new THREE.Vector3(-4.2, 1.6, 3.2),
                    look: new THREE.Vector3(-6.0, 1.1, -0.2),
                    title: "CURVED RECEPTION DESK & HALO LIGHT",
                    desc: "Close-up of the forest green fluted reception counter with solid white top and overhead LED ring."
                },
                BOOKSHELVES: {
                    pos: new THREE.Vector3(0, 1.8, -1.2),
                    look: new THREE.Vector3(0, 1.6, -7.5),
                    title: "MAIN LIBRARY BOOKSHELF ARRAY",
                    desc: "5-bay timber shelving structure with thousands of cataloged volumes and illuminated bays."
                },
                SEATING: {
                    pos: new THREE.Vector3(2.5, 1.6, 2.8),
                    look: new THREE.Vector3(0.8, 0.8, -1.2),
                    title: "INFORMAL LEARNING & BEANBAG LOUNGE",
                    desc: "Vibrant purple carpet relaxation area with orange and indigo beanbags and modular seating."
                },
                PHOTO_01: {
                    pos: new THREE.Vector3(-6.8, 1.65, 5.2),
                    look: new THREE.Vector3(1.8, 1.35, -5.8),
                    title: "PHOTO VIEW 01: GREEN RECEPTION → BOOKSHELVES",
                    desc: "Matches physical photograph 01: foreground green counter, purple carpet, distant shelves."
                },
                PHOTO_02: {
                    pos: new THREE.Vector3(5.2, 1.75, 4.6),
                    look: new THREE.Vector3(-2.2, 1.15, -3.2),
                    title: "PHOTO VIEW 02: WOOD FLOOR & YELLOW SERPENTINE SOFA",
                    desc: "Matches physical photograph 02: light oak floor transition, yellow counter, modular sofa, glass doors."
                },
                PHOTO_03: {
                    pos: new THREE.Vector3(-7.4, 1.7, 4.2),
                    look: new THREE.Vector3(2.6, 1.3, -4.8),
                    title: "PHOTO VIEW 03: WIDE CARPET & CENTRAL STUDY ZONES",
                    desc: "Matches physical photograph 03: expansive purple carpet perspective and ceiling ductwork."
                },
                PHOTO_04: {
                    pos: new THREE.Vector3(3.8, 1.8, 6.2),
                    look: new THREE.Vector3(-2.8, 1.2, 0.8),
                    title: "PHOTO VIEW 04: FULL ROOM ACROSS YELLOW & GREEN COUNTERS",
                    desc: "Matches physical photograph 04: panoramic line of sight showing both service desks simultaneously."
                }
            };

            this.interactiveObjects = [];
            this.init();
        }

        init() {
            const width = this.container.clientWidth || 800;
            const height = this.container.clientHeight || 500;

            // 1. Scene
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x0b0f17);
            this.scene.fog = new THREE.FogExp2(0x0b0f17, 0.012);

            // 2. Camera
            this.camera = new THREE.PerspectiveCamera(54, width / height, 0.1, 100);
            this.camera.position.copy(this.camPos);
            this.camera.lookAt(this.camLook);

            // 3. Renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.15;
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Clear previous canvas if any
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
            this.container.appendChild(this.renderer.domElement);

            // 4. Attach Layer Groups
            Object.values(this.layers).forEach(group => this.scene.add(group));

            // 5. Build Environment
            this.buildLighting();
            this.buildFloor();
            this.buildWallsAndGlass();
            this.buildCeilingAndServices();
            this.buildGreenReceptionDesk();
            this.buildYellowCounterAndLounge();
            this.buildBookshelfWall();
            this.buildBeanbagsAndPoufs();
            this.buildDemoOverlays();

            // 6. Setup Mouse / Touch Controls
            this.setupControls();

            // 7. Start Render Loop
            this.start();
        }

        // =========================================================================
        // LIGHTING ARCHITECTURE (Accurately reflecting institutional photo lighting)
        // =========================================================================
        buildLighting() {
            const lightGroup = this.layers.lighting;

            // Soft Ambient
            const ambient = new THREE.AmbientLight(0xdde3ed, 0.55);
            lightGroup.add(ambient);

            // Main Directional Fill
            const dirLight = new THREE.DirectionalLight(0xfff8ee, 0.7);
            dirLight.position.set(5, 12, 6);
            dirLight.castShadow = true;
            dirLight.shadow.mapSize.width = 2048;
            dirLight.shadow.mapSize.height = 2048;
            dirLight.shadow.camera.near = 0.5;
            dirLight.shadow.camera.far = 30;
            dirLight.shadow.camera.left = -12;
            dirLight.shadow.camera.right = 12;
            dirLight.shadow.camera.top = 10;
            dirLight.shadow.camera.bottom = -10;
            dirLight.shadow.bias = -0.0005;
            lightGroup.add(dirLight);

            // Secondary Cool Blue Bounce from Glass Partitions
            const bounceLight = new THREE.DirectionalLight(0x93c5fd, 0.35);
            bounceLight.position.set(-8, 6, -6);
            lightGroup.add(bounceLight);

            // Warm halo glow spot right above Green Reception desk (from Photos 1, 3, 4)
            const haloSpot = new THREE.PointLight(0xfff5db, 1.4, 8, 1.2);
            haloSpot.position.set(-6.2, 3.1, 0.4);
            lightGroup.add(haloSpot);

            // Bookshelf illumination wash
            const shelfWash = new THREE.PointLight(0xffedd5, 1.1, 10, 1.1);
            shelfWash.position.set(0, 2.8, -6.5);
            lightGroup.add(shelfWash);

            // Lounge area warm fill
            const loungeFill = new THREE.PointLight(0xfef3c7, 0.9, 9, 1.2);
            loungeFill.position.set(3.5, 2.9, 0.5);
            lightGroup.add(loungeFill);
        }

        // =========================================================================
        // PROCEDURAL TEXTURE GENERATORS
        // =========================================================================
        createPurpleCarpetTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#6b1b88'; // Vibrant base purple
            ctx.fillRect(0, 0, 512, 512);

            // Add fine textile weave noise
            for (let i = 0; i < 40000; i++) {
                const x = Math.random() * 512;
                const y = Math.random() * 512;
                const shade = Math.random() > 0.5 ? '#7d229d' : '#581370';
                ctx.fillStyle = shade;
                ctx.fillRect(x, y, 1.5, 1.5);
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10, 8);
            return texture;
        }

        createOakWoodTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#c89d6e'; // Light natural oak
            ctx.fillRect(0, 0, 512, 512);

            // Wood planks
            const plankH = 32;
            for (let y = 0; y < 512; y += plankH) {
                ctx.strokeStyle = '#a47c51';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(512, y);
                ctx.stroke();

                // Subtle wood grain lines
                for (let g = 0; g < 6; g++) {
                    ctx.strokeStyle = Math.random() > 0.5 ? '#d2a778' : '#b88f62';
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(0, y + Math.random() * plankH);
                    ctx.bezierCurveTo(150, y + Math.random() * plankH, 350, y + Math.random() * plankH, 512, y + Math.random() * plankH);
                    ctx.stroke();
                }
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(6, 6);
            return texture;
        }

        // =========================================================================
        // DUAL-MATERIAL FLOOR (Curved Boundary between Carpet and Oak Parquet)
        // =========================================================================
        buildFloor() {
            const group = this.layers.architecture;

            // 1. Base floor slab (Dark base)
            const baseGeo = new THREE.BoxGeometry(25, 0.2, 19);
            const baseMat = new THREE.MeshStandardMaterial({ color: 0x111620, roughness: 0.9 });
            const baseMesh = new THREE.Mesh(baseGeo, baseMat);
            baseMesh.position.y = -0.11;
            group.add(baseMesh);

            // 2. Purple Carpet Main Area (Left and Central floor)
            const carpetTex = this.createPurpleCarpetTexture();
            const carpetMat = new THREE.MeshStandardMaterial({
                map: carpetTex,
                roughness: 0.95,
                metalness: 0.05,
                color: 0xffffff
            });

            // Shape for carpet following the elegant curve visible in Photo 1, 2, 4
            const carpetShape = new THREE.Shape();
            carpetShape.moveTo(-12, -9);
            carpetShape.lineTo(2, -9);
            carpetShape.bezierCurveTo(4, -4, 6, 0, 4.5, 4);
            carpetShape.bezierCurveTo(3.5, 7, 1.5, 8.5, 0, 9);
            carpetShape.lineTo(-12, 9);
            carpetShape.closePath();

            const carpetGeo = new THREE.ShapeGeometry(carpetShape);
            const carpetMesh = new THREE.Mesh(carpetGeo, carpetMat);
            carpetMesh.rotation.x = -Math.PI / 2;
            carpetMesh.position.y = 0.002;
            carpetMesh.receiveShadow = true;
            group.add(carpetMesh);

            // 3. Light Oak Wood Floor (Right side and raised study alcove)
            const woodTex = this.createOakWoodTexture();
            const woodMat = new THREE.MeshStandardMaterial({
                map: woodTex,
                roughness: 0.45,
                metalness: 0.08
            });

            const woodShape = new THREE.Shape();
            woodShape.moveTo(2, -9);
            woodShape.lineTo(12, -9);
            woodShape.lineTo(12, 9);
            woodShape.lineTo(0, 9);
            woodShape.bezierCurveTo(1.5, 8.5, 3.5, 7, 4.5, 4);
            woodShape.bezierCurveTo(6, 0, 4, -4, 2, -9);
            woodShape.closePath();

            const woodGeo = new THREE.ShapeGeometry(woodShape);
            const woodMesh = new THREE.Mesh(woodGeo, woodMat);
            woodMesh.rotation.x = -Math.PI / 2;
            woodMesh.position.y = 0.003;
            woodMesh.receiveShadow = true;
            group.add(woodMesh);

            // 4. Subtle brass transition inlay trim along the curve
            const curvePoints = [];
            for (let t = 0; t <= 30; t++) {
                const u = t / 30;
                // sample curve
                let x, z;
                if (u < 0.5) {
                    const k = u / 0.5;
                    x = 2 + (4.5 - 2) * k;
                    z = -9 + (4 - (-9)) * k;
                } else {
                    const k = (u - 0.5) / 0.5;
                    x = 4.5 + (0 - 4.5) * k;
                    z = 4 + (9 - 4) * k;
                }
                curvePoints.push(new THREE.Vector3(x, 0.005, z));
            }
            const trimCurve = new THREE.CatmullRomCurve3(curvePoints);
            const trimGeo = new THREE.TubeGeometry(trimCurve, 40, 0.015, 6, false);
            const trimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.25 });
            const trimMesh = new THREE.Mesh(trimGeo, trimMat);
            group.add(trimMesh);
        }

        // =========================================================================
        // WALLS & GLASS PARTITIONS (Modern floor-to-ceiling glass & meeting rooms)
        // =========================================================================
        buildWallsAndGlass() {
            const group = this.layers.architecture;

            // Back wall (behind bookshelves)
            const backWallGeo = new THREE.BoxGeometry(24.5, 3.8, 0.2);
            const backWallMat = new THREE.MeshStandardMaterial({ color: 0x22262e, roughness: 0.8 });
            const backWall = new THREE.Mesh(backWallGeo, backWallMat);
            backWall.position.set(0, 1.9, -9.1);
            group.add(backWall);

            // Left architectural perimeter wall with glass insets
            const leftWallGeo = new THREE.BoxGeometry(0.2, 3.8, 18);
            const leftWallMat = new THREE.MeshStandardMaterial({ color: 0x1f232b, roughness: 0.85 });
            const leftWall = new THREE.Mesh(leftWallGeo, leftWallMat);
            leftWall.position.set(-12.1, 1.9, 0);
            group.add(leftWall);

            // Glass Partition Wall with Black Mullions (Meeting rooms seen in Photo 2 & 4)
            const glassMat = new THREE.MeshPhysicalMaterial({
                color: 0xdbeafe,
                transparent: true,
                opacity: 0.32,
                roughness: 0.08,
                metalness: 0.12,
                transmission: 0.7,
                ior: 1.5
            });

            const frameMat = new THREE.MeshStandardMaterial({
                color: 0x181a1f,
                metalness: 0.7,
                roughness: 0.3
            });

            // 6 Glass Bays along the right rear wall (x: 5 to 12, z: -5 to 6)
            for (let i = 0; i < 5; i++) {
                const gz = -4 + i * 2.4;
                const glassPane = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.4, 2.2), glassMat);
                glassPane.position.set(11.8, 1.7, gz);
                group.add(glassPane);

                // Vertical Mullions
                const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.5, 0.08), frameMat);
                mullion.position.set(11.8, 1.75, gz - 1.1);
                group.add(mullion);

                // Horizontal Top & Bottom Frame Rails
                const railTop = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 2.3), frameMat);
                railTop.position.set(11.8, 3.4, gz);
                group.add(railTop);

                const railBtm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 2.3), frameMat);
                railBtm.position.set(11.8, 0.04, gz);
                group.add(railBtm);
            }

            // Concrete Structural Columns (visible in Photo 2 and 4)
            const colMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.75 });
            const colPositions = [
                new THREE.Vector3(-4.5, 1.8, -3.5),
                new THREE.Vector3(3.2, 1.8, -4.0),
                new THREE.Vector3(-8.5, 1.8, 2.0),
                new THREE.Vector3(7.5, 1.8, 2.5)
            ];

            colPositions.forEach(pos => {
                const colGeo = new THREE.BoxGeometry(0.7, 3.6, 0.7);
                const col = new THREE.Mesh(colGeo, colMat);
                col.position.copy(pos);
                col.castShadow = true;
                col.receiveShadow = true;
                group.add(col);
            });
        }

        // =========================================================================
        // EXPOSED INDUSTRIAL CEILING & SERVICES (Ducts, Red Sprinklers, LED Fixtures)
        // =========================================================================
        buildCeilingAndServices() {
            const group = this.layers.lighting;

            // Matte Dark Ceiling Slab at 3.6m
            const ceilGeo = new THREE.BoxGeometry(24.5, 0.1, 18.5);
            const ceilMat = new THREE.MeshStandardMaterial({ color: 0x101319, roughness: 0.95 });
            const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
            ceiling.position.y = 3.65;
            group.add(ceiling);

            // 1. Large Circular HVAC Spiral Ducts (Matte Black, visible in all 4 photos)
            const ductMat = new THREE.MeshStandardMaterial({ color: 0x1c2128, metalness: 0.6, roughness: 0.4 });
            const ductGeo1 = new THREE.CylinderGeometry(0.24, 0.24, 22, 24);
            const ductMesh1 = new THREE.Mesh(ductGeo1, ductMat);
            ductMesh1.rotation.z = Math.PI / 2;
            ductMesh1.position.set(0, 3.25, -2);
            group.add(ductMesh1);

            const ductMesh2 = new THREE.Mesh(ductGeo1, ductMat);
            ductMesh2.rotation.x = Math.PI / 2;
            ductMesh2.position.set(1.5, 3.25, 0);
            group.add(ductMesh2);

            // 2. Red Safety Fire Sprinkler Pipe (prominent in Photos 1, 2, 4)
            const pipeMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.5, metalness: 0.3 });
            const pipeGeo = new THREE.CylinderGeometry(0.035, 0.035, 20, 12);
            const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
            pipeMesh.rotation.z = Math.PI / 2;
            pipeMesh.position.set(0, 3.15, 1.5);
            group.add(pipeMesh);

            // 3. Circular LED Halo Fixture (HOVERING ABOVE RECEPTION DESK - Photos 1, 3, 4)
            const haloGeo = new THREE.TorusGeometry(1.65, 0.045, 16, 64);
            const haloMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xfff6dc,
                emissiveIntensity: 2.2,
                roughness: 0.1
            });
            const halo = new THREE.Mesh(haloGeo, haloMat);
            halo.rotation.x = Math.PI / 2;
            halo.position.set(-6.2, 3.05, 0.4);
            group.add(halo);

            // Halo Suspension Wires (4 thin steel cables)
            const wireMat = new THREE.MeshBasicMaterial({ color: 0x555555 });
            for (let a = 0; a < 4; a++) {
                const ang = (a * Math.PI) / 2;
                const wx = -6.2 + Math.cos(ang) * 1.6;
                const wz = 0.4 + Math.sin(ang) * 1.6;
                const wireGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.55, 6);
                const wire = new THREE.Mesh(wireGeo, wireMat);
                wire.position.set(wx, 3.32, wz);
                group.add(wire);
            }

            // 4. Rectangular Suspended LED Frame (Center ceiling in Photo 1 & 3)
            const frameLightMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xfef08a,
                emissiveIntensity: 1.8
            });
            const rectPts = [
                new THREE.Vector3(-1.8, 3.1, -1.2),
                new THREE.Vector3(1.8, 3.1, -1.2),
                new THREE.Vector3(1.8, 3.1, 1.2),
                new THREE.Vector3(-1.8, 3.1, 1.2),
                new THREE.Vector3(-1.8, 3.1, -1.2)
            ];
            const rectCurve = new THREE.CatmullRomCurve3(rectPts, true);
            const rectLightMesh = new THREE.Mesh(new THREE.TubeGeometry(rectCurve, 32, 0.025, 8, true), frameLightMat);
            group.add(rectLightMesh);

            // 5. Angular Zigzag Linear Light Strips (visible in Photos 1 & 3)
            const zzPts = [
                new THREE.Vector3(-4.5, 3.12, -4.5),
                new THREE.Vector3(-2.0, 3.12, -3.8),
                new THREE.Vector3(0.5, 3.12, -4.6),
                new THREE.Vector3(3.2, 3.12, -3.9)
            ];
            const zzCurve = new THREE.CatmullRomCurve3(zzPts);
            const zzMesh = new THREE.Mesh(new THREE.TubeGeometry(zzCurve, 24, 0.02, 6, false), frameLightMat);
            group.add(zzMesh);

            // 6. Hanging Frosted Glass Globe Cluster (Photos 1, 3, 4)
            const globeMat = new THREE.MeshStandardMaterial({
                color: 0xffffff,
                emissive: 0xfffbeb,
                emissiveIntensity: 2.0,
                roughness: 0.1
            });
            [
                new THREE.Vector3(-5.0, 2.4, -1.8),
                new THREE.Vector3(-4.8, 2.25, -1.6),
                new THREE.Vector3(-5.3, 2.32, -1.5)
            ].forEach(p => {
                const globe = new THREE.Mesh(new THREE.SphereGeometry(0.14, 18, 18), globeMat);
                globe.position.copy(p);
                group.add(globe);

                // Hanging cable to ceiling
                const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 3.65 - p.y, 6), wireMat);
                cable.position.set(p.x, p.y + (3.65 - p.y) / 2, p.z);
                group.add(cable);
            });
        }

        // =========================================================================
        // CURVED GREEN RECEPTION DESK (Photos 1, 3, 4 Signature Architectural Centerpiece)
        // =========================================================================
        buildGreenReceptionDesk() {
            const group = this.layers.furniture;

            // Circular curved reception counter
            // Base: Deep Forest Green vertical ribbed fluting (#144a3e)
            const baseMat = new THREE.MeshStandardMaterial({
                color: 0x144a3e,
                roughness: 0.6,
                metalness: 0.15
            });

            // Solid clean white countertop with overhang (#f8fafc)
            const topMat = new THREE.MeshStandardMaterial({
                color: 0xf8fafc,
                roughness: 0.25,
                metalness: 0.05
            });

            const center = new THREE.Vector3(-6.2, 0, 0.4);
            const deskRadius = 2.4;
            const startAngle = Math.PI * 0.25;
            const endAngle = Math.PI * 0.95;
            const segments = 24;

            // Fluted Desk Body Mesh
            const deskBodyGeo = new THREE.CylinderGeometry(deskRadius, deskRadius, 1.05, segments, 1, true, startAngle, endAngle - startAngle);
            const deskBody = new THREE.Mesh(deskBodyGeo, baseMat);
            deskBody.position.set(center.x, 0.525, center.z);
            deskBody.castShadow = true;
            deskBody.receiveShadow = true;
            group.add(deskBody);

            // Fluted vertical ribs texture simulation
            for (let i = 0; i <= segments; i++) {
                const theta = startAngle + (i / segments) * (endAngle - startAngle);
                const rx = center.x + Math.sin(theta) * deskRadius;
                const rz = center.z + Math.cos(theta) * deskRadius;
                const ribGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.05, 8);
                const rib = new THREE.Mesh(ribGeo, baseMat);
                rib.position.set(rx, 0.525, rz);
                group.add(rib);
            }

            // White Top Countertop with slight overhang
            const topGeo = new THREE.CylinderGeometry(deskRadius + 0.12, deskRadius + 0.12, 0.08, segments, 1, false, startAngle - 0.05, (endAngle - startAngle) + 0.1);
            const deskTop = new THREE.Mesh(topGeo, topMat);
            deskTop.position.set(center.x, 1.09, center.z);
            deskTop.castShadow = true;
            group.add(deskTop);

            // Reception Terminal (Laptop & welcome display)
            const screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
            const screenGeo = new THREE.BoxGeometry(0.35, 0.25, 0.02);
            const screen = new THREE.Mesh(screenGeo, screenMat);
            screen.position.set(center.x + 0.3, 1.25, center.z + 1.2);
            screen.rotation.y = -Math.PI * 0.3;
            group.add(screen);

            // Interactive Click Target
            const hitBox = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.4, 3.5), new THREE.MeshBasicMaterial({ visible: false }));
            hitBox.position.set(center.x, 0.7, center.z);
            hitBox.userData = {
                name: "RECEPTION_DESK",
                title: "CAMPUS RECEPTION & INFORMATION HUB",
                desc: "Curved architectural counter with white solid-surface top, forest green fluted paneling, and halo light."
            };
            group.add(hitBox);
            this.interactiveObjects.push(hitBox);
        }

        // =========================================================================
        // SECONDARY YELLOW COUNTER & MODULAR SNAKE SOFA (Photos 2 & 4)
        // =========================================================================
        buildYellowCounterAndLounge() {
            const group = this.layers.furniture;

            // 1. Yellow Service Counter (Photo 2 & 4)
            const yellowBaseMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.5, metalness: 0.1 });
            const whiteTopMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });

            const yCounterBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, 0.9), yellowBaseMat);
            yCounterBase.position.set(3.5, 0.5, -3.2);
            yCounterBase.castShadow = true;
            yCounterBase.receiveShadow = true;
            group.add(yCounterBase);

            const yCounterTop = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.08, 1.02), whiteTopMat);
            yCounterTop.position.set(3.5, 1.04, -3.2);
            yCounterTop.castShadow = true;
            group.add(yCounterTop);

            // 2. Yellow Curved Modular Snake Sofa (Centerpiece on Oak Floor, Photos 2 & 4)
            const sofaMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.8, metalness: 0.05 });
            const sofaSegments = 5;
            for (let s = 0; s < sofaSegments; s++) {
                const u = s / (sofaSegments - 1);
                const angle = -0.4 + u * 1.5;
                const dist = 3.6;
                const sx = 3.8 + Math.sin(angle) * dist;
                const sz = 1.0 + Math.cos(angle) * dist;

                const segGeo = new THREE.BoxGeometry(0.75, 0.42, 0.75);
                const segMesh = new THREE.Mesh(segGeo, sofaMat);
                segMesh.position.set(sx, 0.21, sz);
                segMesh.rotation.y = angle;
                segMesh.castShadow = true;
                segMesh.receiveShadow = true;
                group.add(segMesh);
            }

            // 3. Lounge Armchairs on Wood Floor (Cognac / Camel leather, Photo 2)
            const chairMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.7 });
            const chairPositions = [
                new THREE.Vector3(7.8, 0.38, -1.5),
                new THREE.Vector3(8.5, 0.38, 0.2),
                new THREE.Vector3(8.2, 0.38, 1.8)
            ];

            chairPositions.forEach((cp, idx) => {
                const seatGeo = new THREE.BoxGeometry(0.75, 0.4, 0.75);
                const seat = new THREE.Mesh(seatGeo, chairMat);
                seat.position.copy(cp);
                seat.rotation.y = -Math.PI * 0.4 + idx * 0.25;
                seat.castShadow = true;
                group.add(seat);

                const backGeo = new THREE.BoxGeometry(0.75, 0.5, 0.15);
                const back = new THREE.Mesh(backGeo, chairMat);
                back.position.set(cp.x + 0.3, cp.y + 0.35, cp.z);
                back.rotation.y = seat.rotation.y;
                group.add(back);
            });

            // Interactive target for lounge
            const loungeHit = new THREE.Mesh(new THREE.BoxGeometry(4.0, 1.0, 4.0), new THREE.MeshBasicMaterial({ visible: false }));
            loungeHit.position.set(5.5, 0.5, 0.5);
            loungeHit.userData = {
                name: "LOUNGE_COLLAB_ZONE",
                title: "COLLABORATION & CASUAL STUDY ALCOVE",
                desc: "Raised light oak floor section featuring yellow serpentine modular sofa and collaborative seating."
            };
            group.add(loungeHit);
            this.interactiveObjects.push(loungeHit);
        }

        // =========================================================================
        // THE MAIN BOOKSHELF WALL (5 Interconnected Bays with Multicolored Books)
        // =========================================================================
        buildBookshelfWall() {
            const group = this.layers.bookshelves;

            const woodShelfMat = new THREE.MeshStandardMaterial({
                color: 0xc49a6c, // Light natural birch
                roughness: 0.6,
                metalness: 0.1
            });

            const bookColors = [
                0x991b1b, 0x1e40af, 0x065f46, 0xb45309, 0x475569,
                0x0284c7, 0x7c3aed, 0xd97706, 0x15803d, 0xf8fafc
            ];

            const bayWidth = 2.1;
            const shelfDepth = 0.45;
            const shelfHeight = 2.3;
            const numBays = 5;
            const tiers = 5;

            for (let b = 0; b < numBays; b++) {
                const bx = -4.5 + b * (bayWidth + 0.1);
                const bz = -8.2;

                // Vertical Frame Sides
                const sideGeo = new THREE.BoxGeometry(0.06, shelfHeight, shelfDepth);
                const leftSide = new THREE.Mesh(sideGeo, woodShelfMat);
                leftSide.position.set(bx - bayWidth / 2, shelfHeight / 2, bz);
                leftSide.castShadow = true;
                group.add(leftSide);

                const rightSide = new THREE.Mesh(sideGeo, woodShelfMat);
                rightSide.position.set(bx + bayWidth / 2, shelfHeight / 2, bz);
                rightSide.castShadow = true;
                group.add(rightSide);

                // Back panel
                const backPanel = new THREE.Mesh(new THREE.BoxGeometry(bayWidth, shelfHeight, 0.03), woodShelfMat);
                backPanel.position.set(bx, shelfHeight / 2, bz - shelfDepth / 2 + 0.015);
                group.add(backPanel);

                // Horizontal Shelf Planks
                for (let t = 0; t <= tiers; t++) {
                    const ty = 0.1 + t * (shelfHeight / tiers);
                    const shelfPlank = new THREE.Mesh(new THREE.BoxGeometry(bayWidth, 0.04, shelfDepth), woodShelfMat);
                    shelfPlank.position.set(bx, ty, bz);
                    shelfPlank.castShadow = true;
                    shelfPlank.receiveShadow = true;
                    group.add(shelfPlank);

                    // Populate Shelf with Books
                    if (t < tiers) {
                        let currentX = bx - bayWidth / 2 + 0.12;
                        while (currentX < bx + bayWidth / 2 - 0.15) {
                            const bookW = 0.04 + Math.random() * 0.04;
                            const bookH = (shelfHeight / tiers) * (0.65 + Math.random() * 0.28);
                            const bookD = shelfDepth * 0.75;
                            const c = bookColors[Math.floor(Math.random() * bookColors.length)];

                            const bookMat = new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 });
                            const bookMesh = new THREE.Mesh(new THREE.BoxGeometry(bookW, bookH, bookD), bookMat);
                            bookMesh.position.set(currentX + bookW / 2, ty + bookH / 2 + 0.02, bz);
                            bookMesh.castShadow = true;
                            group.add(bookMesh);

                            currentX += bookW + 0.01;
                        }
                    }
                }
            }

            // Interactive Target for Bookshelves
            const bookHit = new THREE.Mesh(new THREE.BoxGeometry(11.5, 2.5, 1.2), new THREE.MeshBasicMaterial({ visible: false }));
            bookHit.position.set(0, 1.25, -8.2);
            bookHit.userData = {
                name: "LIBRARY_CATALOG_SHELVES",
                title: "CENTRAL RESEARCH & LEARNING STACKS",
                desc: "5-bay timber shelving structure housing institutional journals, engineering catalogs, and reading bays."
            };
            group.add(bookHit);
            this.interactiveObjects.push(bookHit);
        }

        // =========================================================================
        // SCATTERED BEANBAGS & INFORMAL SEATING (Prominent in all 4 Photos)
        // =========================================================================
        buildBeanbagsAndPoufs() {
            const group = this.layers.furniture;

            const orangeMat = new THREE.MeshStandardMaterial({ color: 0xe65100, roughness: 0.85, metalness: 0.05 });
            const purpleMat = new THREE.MeshStandardMaterial({ color: 0x312e81, roughness: 0.85, metalness: 0.05 });
            const greenPoufMat = new THREE.MeshStandardMaterial({ color: 0x365314, roughness: 0.7 });

            // Create Beanbag Mesh (Squashed pear/teardrop geometry)
            const createBeanbag = (mat, scale = 1.0) => {
                const bGroup = new THREE.Group();
                const baseGeo = new THREE.SphereGeometry(0.55 * scale, 18, 14);
                baseGeo.scale(1.15, 0.75, 1.15); // flatten base
                const base = new THREE.Mesh(baseGeo, mat);
                base.position.y = 0.38 * scale;
                base.castShadow = true;
                base.receiveShadow = true;
                bGroup.add(base);

                // Upper teardrop top
                const topGeo = new THREE.ConeGeometry(0.35 * scale, 0.45 * scale, 16);
                const top = new THREE.Mesh(topGeo, mat);
                top.position.set(0.1 * scale, 0.75 * scale, -0.05 * scale);
                top.rotation.z = -0.2;
                bGroup.add(top);
                return bGroup;
            };

            // Reconstruct Exact Beanbag Layout from Photos 1, 2, 3, 4:
            const beanbagConfigs = [
                { pos: new THREE.Vector3(-3.2, 0, -2.8), mat: orangeMat, scale: 1.1, rot: 0.5 },
                { pos: new THREE.Vector3(-1.8, 0, -3.2), mat: purpleMat, scale: 1.0, rot: -0.8 },
                { pos: new THREE.Vector3(0.5, 0, -1.8), mat: orangeMat, scale: 1.15, rot: 1.2 },
                { pos: new THREE.Vector3(2.2, 0, -1.2), mat: purpleMat, scale: 1.1, rot: 0.2 },
                { pos: new THREE.Vector3(1.2, 0, 1.2), mat: purpleMat, scale: 1.05, rot: -0.4 },
                { pos: new THREE.Vector3(-0.8, 0, 2.2), mat: orangeMat, scale: 1.2, rot: 2.1 },
                { pos: new THREE.Vector3(5.5, 0, 5.5), mat: orangeMat, scale: 1.15, rot: -1.5 },
                { pos: new THREE.Vector3(6.8, 0, 5.2), mat: orangeMat, scale: 1.05, rot: 0.7 }
            ];

            beanbagConfigs.forEach(cfg => {
                const bb = createBeanbag(cfg.mat, cfg.scale);
                bb.position.copy(cfg.pos);
                bb.rotation.y = cfg.rot;
                group.add(bb);
            });

            // Cylindrical poufs (Green & Grey)
            const poufGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.38, 18);
            const pouf1 = new THREE.Mesh(poufGeo, greenPoufMat);
            pouf1.position.set(-1.2, 0.19, -2.0);
            pouf1.castShadow = true;
            group.add(pouf1);

            const pouf2 = new THREE.Mesh(poufGeo, greenPoufMat);
            pouf2.position.set(4.2, 0.19, 4.2);
            pouf2.castShadow = true;
            group.add(pouf2);
        }

        // =========================================================================
        // DEMO & CAMPUS OPERATIONAL OVERLAYS (Zones, POIs, Egress Safe Route)
        // =========================================================================
        buildDemoOverlays() {
            // 1. Zone Outlines
            const zoneGroup = this.layers.zones;
            zoneGroup.visible = this.layersVisibility.zones;

            const makeZonePlate = (x, z, w, d, color, label) => {
                const pGeo = new THREE.PlaneGeometry(w, d);
                const pMat = new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.18,
                    side: THREE.DoubleSide
                });
                const pMesh = new THREE.Mesh(pGeo, pMat);
                pMesh.rotation.x = -Math.PI / 2;
                pMesh.position.set(x, 0.015, z);
                zoneGroup.add(pMesh);

                const borderGeo = new THREE.EdgesGeometry(pGeo);
                const borderMat = new THREE.LineBasicMaterial({ color: color, linewidth: 2 });
                const border = new THREE.LineSegments(borderGeo, borderMat);
                border.rotation.x = -Math.PI / 2;
                border.position.set(x, 0.016, z);
                zoneGroup.add(border);
            };

            makeZonePlate(-6.5, 0.5, 6, 7, 0x10b981, "ZONE A: RECEPTION HUB");
            makeZonePlate(0, -6.5, 11, 4, 0x06b6d4, "ZONE B: LIBRARY CATALOG STACKS");
            makeZonePlate(5.5, 0.5, 7, 8, 0xf59e0b, "ZONE C: COLLABORATIVE STUDY ALCOVE");
            makeZonePlate(0, 1.5, 6, 6, 0x8b5cf6, "ZONE D: INFORMAL READING COMMONS");

            // 2. Safe Egress Route Ribbon (glowing green path towards exit doors)
            const routeGroup = this.layers.safeRoute;
            routeGroup.visible = this.layersVisibility.safeRoute;

            const routePts = [
                new THREE.Vector3(0, 0.02, -6.0),
                new THREE.Vector3(0, 0.02, -1.0),
                new THREE.Vector3(-3.5, 0.02, 1.5),
                new THREE.Vector3(-8.5, 0.02, 5.0),
                new THREE.Vector3(-11.5, 0.02, 5.5) // Exit doors
            ];
            const routeCurve = new THREE.CatmullRomCurve3(routePts);
            const routeGeo = new THREE.TubeGeometry(routeCurve, 40, 0.06, 8, false);
            const routeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
            const routeMesh = new THREE.Mesh(routeGeo, routeMat);
            routeGroup.add(routeMesh);

            // 3. Points of Interest (POIs) Billboard Pins
            const poiGroup = this.layers.pois;
            poiGroup.visible = this.layersVisibility.pois;

            const poiDefs = [
                { pos: new THREE.Vector3(-6.2, 2.0, 0.4), label: "📍 INFORMATION DESK", color: "#10b981" },
                { pos: new THREE.Vector3(0, 2.5, -8.0), label: "📚 RESEARCH STACKS", color: "#06b6d4" },
                { pos: new THREE.Vector3(0.5, 1.5, -0.5), label: "🛋️ BEANBAG COMMONS", color: "#8b5cf6" },
                { pos: new THREE.Vector3(4.5, 1.8, -1.5), label: "🤝 DISCUSSION ALCOVE", color: "#f59e0b" },
                { pos: new THREE.Vector3(-11.2, 2.2, 5.5), label: "🚪 EMERGENCY EXIT", color: "#ef4444" }
            ];

            poiDefs.forEach(p => {
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 64;
                const ctx = canvas.getContext('2d');

                ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
                ctx.roundRect(4, 4, 248, 56, 12);
                ctx.fill();

                ctx.strokeStyle = p.color;
                ctx.lineWidth = 3;
                ctx.roundRect(4, 4, 248, 56, 12);
                ctx.stroke();

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 18px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.label, 128, 32);

                const tex = new THREE.CanvasTexture(canvas);
                const spriteMat = new THREE.SpriteMaterial({ map: tex, depthTest: false });
                const sprite = new THREE.Sprite(spriteMat);
                sprite.position.copy(p.pos);
                sprite.scale.set(2.4, 0.6, 1.0);
                poiGroup.add(sprite);

                // Small vertical beacon needle
                const needleGeo = new THREE.CylinderGeometry(0.015, 0.015, p.pos.y, 6);
                const needleMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(p.color) });
                const needle = new THREE.Mesh(needleGeo, needleMat);
                needle.position.set(p.pos.x, p.pos.y / 2, p.pos.z);
                poiGroup.add(needle);
            });
        }

        // =========================================================================
        // INTERACTIVE CONTROLS (Orbit, Pan, Zoom & Raycasting)
        // =========================================================================
        setupControls() {
            const dom = this.renderer.domElement;

            const onPointerDown = (e) => {
                this.isMouseDown = true;
                this.prevMouse.x = e.clientX;
                this.prevMouse.y = e.clientY;
            };

            const onPointerMove = (e) => {
                const rect = dom.getBoundingClientRect();
                this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

                if (this.isMouseDown) {
                    const deltaX = e.clientX - this.prevMouse.x;
                    const deltaY = e.clientY - this.prevMouse.y;
                    this.prevMouse.x = e.clientX;
                    this.prevMouse.y = e.clientY;

                    // Manual orbit rotation
                    this.orbitTheta -= deltaX * 0.006;
                    this.orbitPhi = Math.max(0.15, Math.min(Math.PI / 2.1, this.orbitPhi + deltaY * 0.006));

                    const x = this.camTargetLook.x + this.orbitRadius * Math.sin(this.orbitPhi) * Math.sin(this.orbitTheta);
                    const y = this.camTargetLook.y + this.orbitRadius * Math.cos(this.orbitPhi);
                    const z = this.camTargetLook.z + this.orbitRadius * Math.sin(this.orbitPhi) * Math.cos(this.orbitTheta);

                    this.camTargetPos.set(x, y, z);
                }
            };

            const onPointerUp = (e) => {
                if (!this.isMouseDown) return;
                this.isMouseDown = false;

                // Raycast on click
                this.raycaster.setFromCamera(this.mouse, this.camera);
                const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);
                if (intersects.length > 0) {
                    const obj = intersects[0].object;
                    if (obj.userData && obj.userData.title && typeof this.options.onSelectObject === 'function') {
                        this.options.onSelectObject(obj.userData);
                    }
                }
            };

            const onWheel = (e) => {
                e.preventDefault();
                const zoomDelta = e.deltaY * 0.008;
                this.orbitRadius = Math.max(3.5, Math.min(24.0, this.orbitRadius + zoomDelta));
                const dir = new THREE.Vector3().subVectors(this.camTargetPos, this.camTargetLook).normalize();
                this.camTargetPos.copy(this.camTargetLook).addScaledVector(dir, this.orbitRadius);
            };

            dom.addEventListener('mousedown', onPointerDown);
            window.addEventListener('mousemove', onPointerMove);
            window.addEventListener('mouseup', onPointerUp);
            dom.addEventListener('wheel', onWheel, { passive: false });

            // Touch support for tablets/smartphones
            dom.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    onPointerDown(e.touches[0]);
                }
            }, { passive: true });

            window.addEventListener('touchmove', (e) => {
                if (e.touches.length === 1 && this.isMouseDown) {
                    onPointerMove(e.touches[0]);
                }
            }, { passive: true });

            window.addEventListener('touchend', (e) => {
                onPointerUp(e);
            }, { passive: true });
        }

        // =========================================================================
        // VIEW TRANSITIONS & PRESETS
        // =========================================================================
        setPreset(presetKey) {
            const p = this.presets[presetKey];
            if (!p) return;
            this.currentPresetKey = presetKey;
            this.camTargetPos.copy(p.pos);
            this.camTargetLook.copy(p.look);

            // Re-sync orbit radius and angles
            const offset = new THREE.Vector3().subVectors(p.pos, p.look);
            this.orbitRadius = offset.length();
            this.orbitPhi = Math.acos(Math.max(-1, Math.min(1, offset.y / this.orbitRadius)));
            this.orbitTheta = Math.atan2(offset.x, offset.z);

            if (typeof this.options.onViewChanged === 'function') {
                this.options.onViewChanged(presetKey, p);
            }
        }

        toggleLayer(layerKey, isVisible) {
            if (this.layers[layerKey]) {
                const vis = (typeof isVisible === 'boolean') ? isVisible : !this.layers[layerKey].visible;
                this.layers[layerKey].visible = vis;
                this.layersVisibility[layerKey] = vis;
            }
        }

        // =========================================================================
        // LIFECYCLE & RESIZE
        // =========================================================================
        start() {
            if (this.isRunning) return;
            this.isRunning = true;

            const animate = () => {
                if (!this.isRunning) return;
                this.animId = requestAnimationFrame(animate);

                // Smooth camera damping
                this.camPos.lerp(this.camTargetPos, 0.08);
                this.camLook.lerp(this.camTargetLook, 0.08);
                this.camera.position.copy(this.camPos);
                this.camera.lookAt(this.camLook);

                this.renderer.render(this.scene, this.camera);
            };

            animate();
        }

        pause() {
            this.isRunning = false;
            if (this.animId) {
                cancelAnimationFrame(this.animId);
                this.animId = null;
            }
        }

        onWindowResize() {
            if (!this.container || !this.renderer || !this.camera) return;
            const w = this.container.clientWidth;
            const h = this.container.clientHeight;
            if (w === 0 || h === 0) return;

            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        }

        destroy() {
            this.pause();
            if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
            if (this.renderer) {
                this.renderer.dispose();
            }
        }
    }

    // Export globally
    window.LibraryTwinEngine = LibraryTwinEngine;

})(window);
