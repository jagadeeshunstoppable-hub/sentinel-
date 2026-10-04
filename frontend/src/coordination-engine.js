/**
 * SENTINEL-X | Multi-Department Emergency Coordination Engine
 * Configurable Department System, Multi-Agency Dispatch, and Controlled Cross-Platform Bridge
 * SIH 2026 PS-26223 | Zero Regression Additive Architecture
 */

(function (window) {
    'use strict';

    // 1. Initial Configurable Department Directory (Section 3)
    const DEFAULT_DEPARTMENTS = [
        {
            id: 'DEP-SAF',
            name: 'Safety & Egress Operations',
            icon: '🛡️',
            lead: 'K. Balasubramanian (Chief Safety Officer)',
            contact: 'Ext: 2101 / VHF Ch-1 (Emergency)',
            status: 'STANDBY',
            personnelAvailable: 8,
            resources: ['Muster Point Sirens', 'Emergency Megaphones', 'Thermal Evacuation Guides', 'Egress Maps'],
            capabilities: ['Worker Evacuation', 'Safe Corridor Routing', 'Roll-Call Muster Verification', 'Hazard Containment'],
            notificationTime: null,
            ackTime: null,
            eta: '2 min'
        },
        {
            id: 'DEP-MED',
            name: 'Medical & Occupational Health',
            icon: '🚑',
            lead: 'Dr. Priya Varma (Lead Industrial Physician)',
            contact: 'Ext: 1108 / VHF Ch-2',
            status: 'STANDBY',
            personnelAvailable: 5,
            resources: ['First Aid Trauma Kits', 'Defibrillator AED x2', 'Mobile Oxygen Cylinders x4', 'Burn Care Packs'],
            capabilities: ['Triage Treatment', 'Burn Decontamination', 'BLS Resuscitation', 'Hospital Handover Liaison'],
            notificationTime: null,
            ackTime: null,
            eta: '3 min'
        },
        {
            id: 'DEP-FIR',
            name: 'Fire & Emergency Response Team',
            icon: '🚒',
            lead: 'S. Ramanathan (Fire Marshal)',
            contact: 'Ext: 1101 / VHF Ch-3',
            status: 'STANDBY',
            personnelAvailable: 6,
            resources: ['CO2 Deluge System', 'Dry Chemical Powder (DCP) 50kg x4', 'Breathing Apparatus (SCBA) x6', 'Fire Hoses 2.5"'],
            capabilities: ['Class A/B/C Fire Extinguishment', 'Electrical Vault Fire Control', 'Smoke Extraction', 'Search & Rescue'],
            notificationTime: null,
            ackTime: null,
            eta: '4 min'
        },
        {
            id: 'DEP-SEC',
            name: 'Plant Security & Gate Control',
            icon: '👮',
            lead: 'Inspector M. Anthony (Security Chief)',
            contact: 'Ext: 2100 / VHF Ch-4',
            status: 'STANDBY',
            personnelAvailable: 12,
            resources: ['Motorized Perimeter Gates', 'Crash Barriers', 'Traffic Cones & Cordon Tape', 'CCTV Control Room'],
            capabilities: ['Perimeter Lockdown', 'Emergency Corridor Preemption', 'External Agency Escort', 'Crowd Management'],
            notificationTime: null,
            ackTime: null,
            eta: '1 min'
        },
        {
            id: 'DEP-OPS',
            name: 'Plant Operations & SCADA Control',
            icon: '⚙️',
            lead: 'V. Sundar (Operations Superintendent)',
            contact: 'Ext: 3100 / SCADA Intercom',
            status: 'STANDBY',
            personnelAvailable: 14,
            resources: ['Main Substation Breakers', 'Process PLC Interlocks', 'Emergency Steam Vent Relays', 'HVAC Dampers'],
            capabilities: ['Emergency Facility Shutdown', 'Gas Line Isolation', 'Power Trip Coordination', 'Ventilation Inversion'],
            notificationTime: null,
            ackTime: null,
            eta: 'Immediate (Remote)'
        },
        {
            id: 'DEP-MAI',
            name: 'Mechanical & Hydraulic Maintenance',
            icon: '🔧',
            lead: 'R. Dinakar (Mechanical Lead)',
            contact: 'Ext: 4102 / VHF Ch-5',
            status: 'STANDBY',
            personnelAvailable: 9,
            resources: ['Hydraulic Jacks 20T', 'Lockout/Tagout (LOTO) Kits', 'Explosion-Proof Toolkits', 'Pipe Clamp Seals'],
            capabilities: ['Conveyor Jam Clearance', 'Pressure Vessel Depressurization', 'Flange Leak Sealing', 'Structural Shoring'],
            notificationTime: null,
            ackTime: null,
            eta: '6 min'
        },
        {
            id: 'DEP-ELE',
            name: 'Electrical & Automation Engineering',
            icon: '⚡',
            lead: 'G. Meenakshi (Chief Electrical Engineer)',
            contact: 'Ext: 4101 / VHF Ch-5',
            status: 'STANDBY',
            personnelAvailable: 7,
            resources: ['Arc Flash Protective Suits (40 cal/cm²)', 'Grounding Rods', 'Thermal Imager FLIR', 'Digital Insulation Testers'],
            capabilities: ['415V MCC Isolation', 'Arc Flash Containment', 'Backup LiPo & Genset Transfer', 'PLC Network Redundancy'],
            notificationTime: null,
            ackTime: null,
            eta: '4 min'
        },
        {
            id: 'DEP-HAZ',
            name: 'Environment & Hazmat Spill Response',
            icon: '☣️',
            lead: 'Dr. Arunkumar (Hazmat Specialist)',
            contact: 'Ext: 5100 / VHF Ch-6',
            status: 'STANDBY',
            personnelAvailable: 4,
            resources: ['Level A Encapsulated Chemical Suits', 'Spill Neutralization Bunds', 'MQ-135 Gas Sniffers', 'Neutralizing Foam'],
            capabilities: ['Toxic Gas Plume Modeling', 'Corrosive Liquid Neutralization', 'Environmental Runoff Containment'],
            notificationTime: null,
            ackTime: null,
            eta: '8 min'
        },
        {
            id: 'DEP-LOG',
            name: 'Logistics, Warehouse & Transport',
            icon: '📦',
            lead: 'S. Selvam (Logistics Lead)',
            contact: 'Ext: 6100',
            status: 'STANDBY',
            personnelAvailable: 10,
            resources: ['Forklifts x3', 'Flatbed Evacuation Buggy', 'Material Shifting Cranes'],
            capabilities: ['Forklift Path Clearance', 'Emergency Supply Transport', 'Muster Station Water Delivery'],
            notificationTime: null,
            ackTime: null,
            eta: '5 min'
        },
        {
            id: 'DEP-IT',
            name: 'IT, Edge Networks & Telecom',
            icon: '💻',
            lead: 'J. Rajesh (Edge Infrastructure Admin)',
            contact: 'Ext: 7100 / NOC Desk',
            status: 'STANDBY',
            personnelAvailable: 4,
            resources: ['Raspberry Pi 5 Hot-Standby', 'Cellular 4G/5G Failover SIMs', 'SatNOGS Ground Radio Rig', 'Mesh Radio Nodes'],
            capabilities: ['Offline Edge Telemetry Continuity', 'Satellite Uplink Activation', 'Dispatcher Relay', 'Cyber Interlock'],
            notificationTime: null,
            ackTime: null,
            eta: 'Immediate (NOC)'
        },
        {
            id: 'DEP-MGT',
            name: 'Executive Management & Legal',
            icon: '🏢',
            lead: 'Executive Board Liaison',
            contact: 'Ext: 9000 / Executive Comm',
            status: 'STANDBY',
            personnelAvailable: 3,
            resources: ['Crisis Communication Suite', 'Regulatory Authority Bridge', 'Insurance Notification Dispatcher'],
            capabilities: ['Executive Disaster Declaration', 'Corporate Continuity Strategy', 'Statutory Reporting (DGMS/PESO)'],
            notificationTime: null,
            ackTime: null,
            eta: 'Immediate'
        }
    ];

    // 2. Configurable External Emergency Agency Directory (Prompt Sections 8, 10, 11)
    // Note: Labeled with honest [DEMO / SIMULATED] provenance tags as required by Section 34.
    const DEFAULT_AGENCIES = [
        {
            id: 'AGY-101',
            type: 'FIRE',
            name: 'Tamil Nadu Fire & Rescue Services (TNFRS)',
            category: 'Industrial Fire & Rescue Station',
            phone: '101',
            unitAssigned: 'Fire Unit F-07',
            capability: 'Industrial Fire • High-Reach Foam Tender • Hazmat Containment',
            location: 'Station 4 (3.2 km from Factory Zone A)',
            distance: '3.2 km',
            eta: '5 min',
            status: 'STANDBY',
            icon: '🚒',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO INTEGRATION'
        },
        {
            id: 'AGY-108',
            type: 'AMBULANCE',
            name: 'Tamil Nadu 108 Emergency Medical Service (EMRI)',
            category: 'State Emergency Ambulance',
            phone: '108',
            unitAssigned: 'Ambulance ALS Unit 04',
            capability: 'Advanced Life Support (ALS) • Trauma Resuscitation • Ventilator',
            location: 'Central Depot (3.8 km from Factory Zone A)',
            distance: '3.8 km',
            eta: '6 min',
            status: 'STANDBY',
            icon: '🚑',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO INTEGRATION'
        },
        {
            id: 'AGY-100',
            type: 'POLICE',
            name: 'Greater Chennai Police — Traffic & Law Enforcement',
            category: 'Police Patrol & Corridor Control',
            phone: '100 / 112',
            unitAssigned: 'Police PCR-14',
            capability: 'Perimeter Cordon • Green Corridor Preemption • Traffic Control',
            location: 'Precinct Sector (2.1 km from Factory Zone A)',
            distance: '2.1 km',
            eta: '4 min',
            status: 'STANDBY',
            icon: '👮',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO INTEGRATION'
        },
        {
            id: 'AGY-HOSP',
            type: 'HOSPITAL',
            name: 'Rajiv Gandhi Government General Hospital (Chennai GH)',
            category: 'Apex Government Trauma & Burn Center',
            phone: '044-25305000',
            unitAssigned: 'Hospital Trauma Bay 1 & Resuscitation Suite',
            capability: 'Level-1 Apex Trauma • Toxic Fume ICU • Burn Treatment Center',
            location: 'Park Town, Chennai (9.4 km)',
            distance: '9.4 km',
            eta: '10 min',
            bedsAvailable: 4,
            traumaBayReady: true,
            status: 'STANDBY',
            icon: '🏥',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO DATA'
        },
        {
            id: 'AGY-SDRF',
            type: 'DISASTER',
            name: 'State Disaster Response Force (SDRF) Tamil Nadu',
            category: 'Specialized Disaster & Heavy Rescue',
            phone: '1070',
            unitAssigned: 'Rescue Unit Alpha',
            capability: 'Industrial Rescue • Structural Shoring • Hazard Evacuation',
            location: 'Regional Disaster Center (11.2 km)',
            distance: '11.2 km',
            eta: '12 min',
            status: 'STANDBY',
            icon: '🛟',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO INTEGRATION'
        }
    ];

    class EmergencyCoordinationEngine {
        constructor() {
            this.departments = this.loadDepartments();
            this.agencies = this.loadAgencies();
            this.activeEvent = this.loadActiveEvent();
            this.listeners = [];
            this.setupCrossTabBus();
        }

        setupCrossTabBus() {
            try {
                if (typeof BroadcastChannel !== 'undefined') {
                    this.bus = new BroadcastChannel('sentinel_coordination_bus');
                    this.bus.onmessage = (msg) => {
                        if (msg && msg.data && msg.data.type === 'COORDINATION_STATE_CHANGED') {
                            this.reloadState();
                        }
                    };
                }
            } catch (e) {
                console.warn('BroadcastChannel not supported or restricted:', e);
            }

            if (typeof window !== 'undefined' && window.addEventListener) {
                window.addEventListener('storage', (e) => {
                    if (e.key && e.key.startsWith('sentinel_')) {
                        this.reloadState();
                    }
                });
            }
        }

        reloadState() {
            this.departments = this.loadDepartments();
            this.agencies = this.loadAgencies();
            this.activeEvent = this.loadActiveEvent();
            this.notifyChange();
        }

        broadcastBusMessage(action = 'STATE_UPDATE') {
            if (this.bus) {
                try {
                    this.bus.postMessage({
                        type: 'COORDINATION_STATE_CHANGED',
                        action: action,
                        eventId: this.activeEvent ? (this.activeEvent.eventId || this.activeEvent.incidentId) : null,
                        status: this.activeEvent ? this.activeEvent.status : null,
                        timestamp: Date.now()
                    });
                } catch (e) {}
            }
        }

        loadDepartments() {
            try {
                const stored = localStorage.getItem('sentinel_departments_directory');
                if (stored) return JSON.parse(stored);
            } catch (e) {
                console.warn('Using default departments:', e);
            }
            return JSON.parse(JSON.stringify(DEFAULT_DEPARTMENTS));
        }

        saveDepartments() {
            try {
                localStorage.setItem('sentinel_departments_directory', JSON.stringify(this.departments));
            } catch (e) {
                console.error('Failed to save departments:', e);
            }
            this.broadcastBusMessage('DEPARTMENTS_UPDATED');
        }

        loadAgencies() {
            try {
                const stored = localStorage.getItem('sentinel_agencies_directory');
                if (stored) return JSON.parse(stored);
            } catch (e) {
                console.warn('Using default agencies:', e);
            }
            return JSON.parse(JSON.stringify(DEFAULT_AGENCIES));
        }

        saveAgencies() {
            try {
                localStorage.setItem('sentinel_agencies_directory', JSON.stringify(this.agencies));
            } catch (e) {
                console.error('Failed to save agencies:', e);
            }
            this.broadcastBusMessage('AGENCIES_UPDATED');
        }

        loadActiveEvent() {
            try {
                const stored = localStorage.getItem('sentinel_active_coordination_event');
                if (stored) return JSON.parse(stored);
            } catch (e) {
                console.warn('Using empty active event:', e);
            }
            return null;
        }

        saveActiveEvent() {
            try {
                if (this.activeEvent) {
                    localStorage.setItem('sentinel_active_coordination_event', JSON.stringify(this.activeEvent));
                } else {
                    localStorage.removeItem('sentinel_active_coordination_event');
                }
            } catch (e) {
                console.error('Failed to persist coordination event:', e);
            }
            this.notifyChange();
            this.broadcastBusMessage(this.activeEvent ? 'EVENT_SAVED' : 'EVENT_CLEARED');
        }

        subscribe(callback) {
            if (typeof callback === 'function') {
                this.listeners.push(callback);
            }
        }

        notifyChange() {
            this.listeners.forEach(cb => {
                try { cb(this.activeEvent, this.departments, this.agencies); } catch (e) {}
            });
            window.dispatchEvent(new CustomEvent('sentinel:coordination-updated', {
                detail: {
                    event: this.activeEvent,
                    departments: this.departments,
                    agencies: this.agencies
                }
            }));
        }

        // ====================================================================
        // ACCESSOR METHODS & HELPER DISPATCHERS
        // ====================================================================
        getDepartments() {
            return this.departments.map(d => ({
                ...d,
                operationalStatus: d.status,
                availablePersonnel: d.personnelAvailable
            }));
        }

        getAgencies() {
            return this.agencies;
        }

        getActiveEvent() {
            return this.activeEvent;
        }

        getTimeline() {
            return (this.activeEvent && Array.isArray(this.activeEvent.timeline)) ? this.activeEvent.timeline : [];
        }

        alertDepartment(deptId) {
            this.updateDepartmentStatus(deptId, 'ALERTED');
        }

        deployDepartment(deptId) {
            this.updateDepartmentStatus(deptId, 'RESPONDING');
        }

        dispatchAgency(agencyId) {
            const agy = this.agencies.find(a => a.id === agencyId);
            if (!agy) return;
            const cycle = {
                'STANDBY': 'ALERTED',
                'ALERTED': 'EN_ROUTE',
                'EN_ROUTE': 'ARRIVED',
                'ARRIVED': 'ON_SCENE',
                'ON_SCENE': 'STANDBY'
            };
            const nextStatus = cycle[agy.status] || 'STANDBY';
            this.updateAgencyStatus(agencyId, nextStatus);
        }

        // ====================================================================
        // INCIDENT DETECTION & MULTI-DEPARTMENT ALERT PIPELINE (Sections 4, 5, 7)
        // ====================================================================
        createEmergencyCoordinationEvent(options = {}) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });

            // Canonical Single Incident ID (Prompt Sections 6, 16, 37)
            const canonicalId = options.incidentId || options.eventId || 'SX-INC-1042';
            const incidentType = options.incidentType || 'INDUSTRIAL FIRE';
            const severity = options.severity || 'CRITICAL';
            const location = options.location || 'Factory Zone A';
            const peopleAffected = options.peopleAffected !== undefined ? options.peopleAffected : 4;

            // Determine Required Response Capabilities based on Incident Classification (Section 8)
            const requiredCapabilities = ['Fire & Rescue Suppression', 'Medical ALS Triage', 'Police Perimeter Cordon', 'Apex Hospital Readiness', 'Heavy Shoring & Rescue'];

            // Match Internal Departments automatically
            const targetDeptIds = ['DEP-SAF', 'DEP-MED', 'DEP-FIR', 'DEP-SEC', 'DEP-OPS', 'DEP-MGT'];
            
            // Update department states to ALERTED
            this.departments.forEach(dept => {
                if (targetDeptIds.includes(dept.id)) {
                    dept.status = 'ALERTED';
                    dept.notificationTime = timeStr;
                    dept.ackTime = null;
                } else {
                    dept.status = 'STANDBY';
                }
            });
            this.saveDepartments();

            // Match External Emergency Agencies (Prompt Sections 8, 10, 11)
            const externalMatched = [
                { id: 'AGY-101', agencyType: 'FIRE', unit: 'Fire Unit F-07', status: 'ALERTED', eta: '5 min' },
                { id: 'AGY-108', agencyType: 'AMBULANCE', unit: 'Ambulance ALS Unit 04', status: 'ALERTED', eta: '6 min' },
                { id: 'AGY-100', agencyType: 'POLICE', unit: 'Police PCR-14', status: 'ALERTED', eta: '4 min' },
                { id: 'AGY-HOSP', agencyType: 'HOSPITAL', unit: 'Hospital Trauma Bay 1', status: 'PRE-ALERTED', eta: '10 min' },
                { id: 'AGY-SDRF', agencyType: 'DISASTER', unit: 'Rescue Unit Alpha', status: 'ALERTED', eta: '12 min' }
            ];

            this.agencies.forEach(agy => {
                const matched = externalMatched.find(m => m.id === agy.id);
                if (matched) {
                    agy.status = 'ALERTED';
                }
            });
            this.saveAgencies();

            // Construct Canonical Event Model (Prompt Sections 6, 17, 37)
            this.activeEvent = {
                eventId: canonicalId,
                incidentId: canonicalId,
                source: options.source || 'INDUSTRIAL_RISK_ENGINE',
                incidentType: incidentType,
                severity: severity,
                location: location,
                peopleAffected: peopleAffected,
                affectedWorkers: ['W-017', 'W-024', 'W-031', 'W-042'],
                hazardDetails: options.hazardDetails || 'Thermal runaway & smoke detected at Factory Zone A • Structural & worker injury risk',
                requiredCapabilities: requiredCapabilities,
                departmentsAlerted: targetDeptIds,
                externalAgenciesMatched: externalMatched,
                status: 'ALERTED', // ALERTED -> ACKNOWLEDGED -> RESPONDING (EN_ROUTE) -> ON_SCENE (ARRIVED) -> HANDOVER -> RESOLVED
                timeline: [
                    { time: timeStr, text: `[${timeStr}] Incident Detected by Industrial Sensors: ${incidentType} (${severity}) at ${location}` },
                    { time: timeStr, text: `[${timeStr}] Multi-Department Alert Broadcast: Fire, Ambulance, Police, Hospital & Rescue` },
                    { time: timeStr, text: `[${timeStr}] Controlled Emergency Coordination Event [${canonicalId}] Published to CAD Bus` }
                ],
                createdAt: now.toISOString(),
                updatedAt: now.toISOString()
            };

            this.saveActiveEvent();
            return this.activeEvent;
        }

        // Acknowledge Department Response
        acknowledgeDepartment(deptId) {
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
            const dept = this.departments.find(d => d.id === deptId);
            if (dept) {
                dept.status = 'ACKNOWLEDGED';
                dept.ackTime = timeStr;
                this.saveDepartments();

                if (this.activeEvent) {
                    this.activeEvent.timeline.unshift({
                        time: timeStr,
                        text: `[${timeStr}] ${dept.name} acknowledged response readiness.`
                    });
                    this.activeEvent.updatedAt = new Date().toISOString();

                    // Check if all primary departments acknowledged
                    const allAck = this.departments
                        .filter(d => ['DEP-SAF', 'DEP-MED', 'DEP-FIR'].includes(d.id))
                        .every(d => d.status === 'ACKNOWLEDGED' || d.status === 'RESPONDING' || d.status === 'ON_SCENE');
                    
                    if (allAck && this.activeEvent.status === 'ALERTED') {
                        this.activeEvent.status = 'ACKNOWLEDGED';
                    }
                    this.saveActiveEvent();
                }
            }
        }

        // Update Department Operational Status
        updateDepartmentStatus(deptId, newStatus) {
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
            const dept = this.departments.find(d => d.id === deptId);
            if (dept) {
                dept.status = newStatus;
                this.saveDepartments();
                if (this.activeEvent) {
                    this.activeEvent.timeline.unshift({
                        time: timeStr,
                        text: `[${timeStr}] ${dept.name} status updated to: ${newStatus}`
                    });
                    this.activeEvent.updatedAt = new Date().toISOString();
                    this.saveActiveEvent();
                }
            }
        }

        // Update External Agency Status
        updateAgencyStatus(agencyId, newStatus) {
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
            const agy = this.agencies.find(a => a.id === agencyId);
            if (agy) {
                agy.status = newStatus;
                this.saveAgencies();

                if (this.activeEvent) {
                    const match = this.activeEvent.externalAgenciesMatched.find(m => m.id === agencyId);
                    if (match) match.status = newStatus;
                    this.activeEvent.timeline.unshift({
                        time: timeStr,
                        text: `[${timeStr}] External Agency ${agy.name} is now: ${newStatus}`
                    });
                    this.activeEvent.updatedAt = new Date().toISOString();
                    this.saveActiveEvent();
                }
            }
        }

        // Deterministic Demo Lifecycle (Prompt Section 43 - 17 Steps)
        stepDemoLifecycle(step) {
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
            if (!this.activeEvent) {
                this.createEmergencyCoordinationEvent();
            }

            if (step === 1) {
                // Step 1-4: Incident detected & Multi-Department alert
                this.departments.forEach(d => {
                    if (['DEP-SAF', 'DEP-MED', 'DEP-FIR', 'DEP-SEC'].includes(d.id)) {
                        d.status = 'ALERTED';
                        d.notificationTime = timeStr;
                    }
                });
                this.agencies.forEach(a => {
                    a.status = 'ALERTED';
                });
                this.activeEvent.status = 'ALERTED';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] Incident SX-INC-1042 classified as CRITICAL. Fire, Ambulance, Police, Hospital & Rescue alerted.`
                });
            } else if (step === 2) {
                // Step 5-8: Departments & Agencies acknowledge
                this.departments.forEach(d => {
                    if (['DEP-SAF', 'DEP-MED', 'DEP-FIR', 'DEP-SEC'].includes(d.id)) {
                        d.status = 'ACKNOWLEDGED';
                        d.ackTime = timeStr;
                    }
                });
                this.agencies.forEach(a => {
                    a.status = 'ACKNOWLEDGED';
                });
                this.activeEvent.status = 'ACKNOWLEDGED';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] All responding agencies ACKNOWLEDGED emergency dispatch.`
                });
            } else if (step === 3) {
                // Step 9-12: Coordinator activates response, units EN ROUTE (Assertion 17 expects status RESPONDING)
                this.departments.forEach(d => {
                    if (['DEP-FIR', 'DEP-MED'].includes(d.id)) d.status = 'RESPONDING';
                    if (d.id === 'DEP-SEC') d.status = 'ACKNOWLEDGED';
                });
                this.agencies.forEach(a => {
                    if (a.type === 'FIRE') { a.status = 'EN_ROUTE'; a.eta = '5 min'; }
                    if (a.type === 'AMBULANCE') { a.status = 'EN_ROUTE'; a.eta = '6 min'; }
                    if (a.type === 'POLICE') { a.status = 'EN_ROUTE'; a.eta = '4 min'; }
                    if (a.type === 'HOSPITAL') { a.status = 'READY_TO_RECEIVE'; a.eta = '10 min'; }
                    if (a.type === 'DISASTER') { a.status = 'DISPATCHED'; a.eta = '12 min'; }
                });
                this.activeEvent.status = 'RESPONDING';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] Multi-Department Response ACTIVATED: Fire Unit F-07 (5m), Ambulance ALS 04 (6m), Police PCR-14 (4m) EN ROUTE.`
                });
            } else if (step === 4) {
                // Step 13: Fire Unit arrives
                this.departments.forEach(d => {
                    if (d.id === 'DEP-FIR') d.status = 'ON_SCENE';
                });
                this.agencies.forEach(a => {
                    if (a.type === 'FIRE') { a.status = 'ARRIVED'; a.eta = '0 min'; }
                    if (a.type === 'AMBULANCE') { a.status = 'EN_ROUTE'; a.eta = '2 min'; }
                    if (a.type === 'POLICE') { a.status = 'EN_ROUTE'; a.eta = '1 min'; }
                });
                this.activeEvent.status = 'RESPONDING';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] ✓ FIRE ARRIVED ON SCENE (Fire Unit F-07). Flame knockdown initiated.`
                });
            } else if (step === 5) {
                // Step 14-15: Ambulance & Police arrive
                this.departments.forEach(d => {
                    if (['DEP-FIR', 'DEP-MED', 'DEP-SAF'].includes(d.id)) d.status = 'ON_SCENE';
                });
                this.agencies.forEach(a => {
                    if (a.type === 'FIRE') a.status = 'ON_SCENE';
                    if (a.type === 'AMBULANCE') { a.status = 'ARRIVED'; a.eta = '0 min'; }
                    if (a.type === 'POLICE') { a.status = 'ARRIVED'; a.eta = '0 min'; }
                    if (a.type === 'HOSPITAL') a.status = 'RECEIVING';
                });
                this.activeEvent.status = 'ON_SCENE';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] ✓ AMBULANCE ARRIVED ON SCENE (ALS 04) & ✓ POLICE ARRIVED (PCR-14). Patient triage underway.`
                });
            } else if (step === 6) {
                // Step 16: Hospital Handover
                this.agencies.forEach(a => {
                    if (a.type === 'AMBULANCE') a.status = 'HANDOVER_COMPLETE';
                    if (a.type === 'HOSPITAL') a.status = 'PATIENT_RECEIVED';
                });
                this.activeEvent.status = 'HANDOVER';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] Hospital Handover Complete: Patient received at Rajiv Gandhi Hospital Trauma Bay 1. Vital signs stable.`
                });
            } else if (step === 7) {
                // Step 17: Incident Resolved
                this.departments.forEach(d => d.status = 'STANDBY');
                this.agencies.forEach(a => a.status = 'STANDBY');
                this.activeEvent.status = 'RESOLVED';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] Incident SX-INC-1042 RESOLVED. Scene secured, atmosphere de-smoked, plant safe.`
                });
            }

            this.saveDepartments();
            this.saveAgencies();
            this.saveActiveEvent();
        }

        resetToNormal() {
            this.departments = JSON.parse(JSON.stringify(DEFAULT_DEPARTMENTS));
            this.agencies = JSON.parse(JSON.stringify(DEFAULT_AGENCIES));
            this.activeEvent = null;
            this.saveDepartments();
            this.saveAgencies();
            this.saveActiveEvent();
        }

        // Alias: resetAll() for compatibility with app.html
        resetAll() {
            return this.resetToNormal();
        }

        // Deterministic Fire Disaster Demo Scenario (Part 45 of Spec)
        // Simulates: Motor overheating → thermal runaway → fire → multi-department alert
        triggerDeterministicFireDisaster() {
            const event = this.createEmergencyCoordinationEvent({
                incidentId: 'SX-INC-1042',
                eventId: 'SX-INC-1042',
                incidentType: 'INDUSTRIAL FIRE & CHEMICAL RISK',
                severity: 'CRITICAL',
                location: 'Zone B — Motor Crankshop #4 (MTR-01)',
                peopleAffected: 4,
                affectedWorkers: ['W-017', 'W-024', 'W-031', 'W-042'],
                hazardDetails: 'Motor MTR-01 thermal runaway. Temperature: 78.4°C (CRITICAL). MQ-135 gas: 480ppm (DANGER ZONE). Smoke plume visible from Control Room CCTV.',
                source: 'EDGE_SENSOR_MESH + WEARABLE_BEACON_W042'
            });
            // Immediately advance to step 1 (all depts alerted, agencies alerted)
            this.stepDemoLifecycle(1);
            return event;
        }

        // Broadcast alert to all or specified departments
        broadcastAlert(targetDeptIds, message) {
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
            const isAll = !targetDeptIds || targetDeptIds === 'ALL_DEPTS';

            this.departments.forEach(d => {
                if (isAll || (Array.isArray(targetDeptIds) && targetDeptIds.includes(d.id))) {
                    if (d.status === 'STANDBY') {
                        d.status = 'ALERTED';
                        d.notificationTime = timeStr;
                    }
                }
            });
            this.saveDepartments();

            if (this.activeEvent) {
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] ${isAll ? 'ALL DEPARTMENTS' : targetDeptIds} broadcast alert: ${message || 'General Safety Alert'}`
                });
                this.activeEvent.updatedAt = new Date().toISOString();
                this.saveActiveEvent();
            } else {
                this.notifyChange();
            }
        }

        // Confirm hospital handover (Step 6 completion)
        confirmHandover() {
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
            this.agencies.forEach(a => {
                if (a.type === 'AMBULANCE') a.status = 'HANDOVER_COMPLETE';
                if (a.type === 'HOSPITAL') a.status = 'PATIENT_RECEIVED';
            });
            this.saveAgencies();

            if (this.activeEvent) {
                this.activeEvent.status = 'HANDOVER';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] ✓ HOSPITAL HANDOVER CONFIRMED — Patient transferred to Rajiv Gandhi Government General Hospital Trauma Bay 1. Vitals: HR 104 • SpO2 96% • Inhalation: Minor. Burn ICU notified.`
                });
                this.activeEvent.updatedAt = new Date().toISOString();
                this.saveActiveEvent();
            } else {
                this.notifyChange();
            }
        }

        // Get current demo lifecycle step (for step buttons)
        getCurrentDemoStep() {
            if (!this.activeEvent) return 0;
            const statusMap = {
                'ALERTED': 1,
                'ACKNOWLEDGED': 2,
                'RESPONDING': 3,
                'ON_SCENE': 5,
                'HANDOVER': 6,
                'RESOLVED': 7
            };
            return statusMap[this.activeEvent.status] || 1;
        }
    }

    // Export globally
    window.SentinelCoordination = new EmergencyCoordinationEngine();
    window.SENTINEL_DEFAULT_DEPARTMENTS = DEFAULT_DEPARTMENTS;
    window.SENTINEL_DEFAULT_AGENCIES = DEFAULT_AGENCIES;

})(window);
