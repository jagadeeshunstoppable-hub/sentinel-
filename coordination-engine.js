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

    // 2. Configurable External Emergency Agency Directory (Section 6)
    // Note: Labeled with honest [DEMO / SIMULATED] provenance tags as required by Section 6 & 30.
    const DEFAULT_AGENCIES = [
        {
            id: 'AGY-108',
            type: 'AMBULANCE',
            name: 'Tamil Nadu 108 Emergency Medical Service (EMRI)',
            category: 'State Emergency Ambulance',
            phone: '108',
            unitAssigned: 'TN-108-ALS-04',
            capability: 'Advanced Life Support (ALS) • Trauma • Ventilator',
            location: 'Anna Nagar Depot (1.8 km from Gate 01)',
            eta: '4 min',
            status: 'STANDBY',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO INTEGRATION'
        },
        {
            id: 'AGY-101',
            type: 'FIRE',
            name: 'Tamil Nadu Fire & Rescue Services (TNFRS)',
            category: 'Industrial Fire & Rescue Station',
            phone: '101',
            unitAssigned: 'TNFRS-FT-02 (Ennore Sector)',
            capability: 'High-Reach Water Tender • Hazmat Chemical Foam • Hydraulic Cutter',
            location: 'Ambattur / Ennore Fire Station (3.2 km)',
            eta: '6 min',
            status: 'STANDBY',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO INTEGRATION'
        },
        {
            id: 'AGY-100',
            type: 'POLICE',
            name: 'Greater Chennai Police — Traffic & Law Enforcement',
            category: 'Police Patrol & Corridor Control',
            phone: '100 / 112',
            unitAssigned: 'PCR-14 / Traffic Sector 3',
            capability: 'Green Corridor Traffic Signal Preemption • Facility Perimeter Cordon',
            location: 'Sector Checkpost (1.2 km)',
            eta: '3 min',
            status: 'STANDBY',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO INTEGRATION'
        },
        {
            id: 'AGY-HOSP',
            type: 'HOSPITAL',
            name: 'Rajiv Gandhi Government General Hospital (Chennai GH)',
            category: 'Apex Government Trauma & Burn Center',
            phone: '044-25305000',
            unitAssigned: 'Trauma Bay 1 & Resuscitation Suite',
            capability: 'Level-1 Apex Trauma • Toxic Fume ICU • Burn Treatment Center',
            location: 'Park Town, Chennai (9.4 km)',
            eta: '11 min',
            bedsAvailable: 4,
            traumaBayReady: true,
            status: 'STANDBY',
            isDemo: true,
            demoLabel: 'SIMULATED DEMO DATA'
        },
        {
            id: 'AGY-SDRF',
            type: 'DISASTER',
            name: 'State Disaster Response Force (SDRF) Tamil Nadu',
            category: 'Specialized Disaster & Heavy Rescue',
            phone: '1070',
            unitAssigned: 'SDRF Alpha Rescue Battalion',
            capability: 'Confined Space Rescue • Structural Collapse Shoring • NBC Hazmat',
            location: 'Regional Disaster Center (14.0 km)',
            eta: '18 min',
            status: 'STANDBY',
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
        // INCIDENT DETECTION & MULTI-DEPARTMENT ALERT PIPELINE (Sections 4, 5, 7)
        // ====================================================================
        createEmergencyCoordinationEvent(options = {}) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });
            const dateStr = now.toISOString().slice(0, 10);

            const incidentType = options.incidentType || 'FACTORY FIRE + WORKER INJURY';
            const severity = options.severity || 'CRITICAL';
            const location = options.location || 'Unit 01, Zone B (Rotating Equipment Bay)';
            const peopleAffected = options.peopleAffected || 4;

            // Determine Required Response Capabilities based on Incident Classification
            const requiredCapabilities = ['Fire Suppression', 'Medical Triage', 'Security Cordon', 'Egress Evacuation', 'Process Shutoff'];

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

            // Match External Emergency Agencies
            const externalMatched = [
                { id: 'AGY-108', agencyType: 'AMBULANCE', unit: 'TN-108-ALS-04', status: 'ALERTED', eta: '4 min' },
                { id: 'AGY-101', agencyType: 'FIRE', unit: 'TNFRS-FT-02', status: 'ALERTED', eta: '6 min' },
                { id: 'AGY-100', agencyType: 'POLICE', unit: 'PCR-14', status: 'ALERTED', eta: '3 min' },
                { id: 'AGY-HOSP', agencyType: 'HOSPITAL', unit: 'Chennai GH Trauma Bay 1', status: 'PRE-ALERTED', eta: '11 min' }
            ];

            this.agencies.forEach(agy => {
                const matched = externalMatched.find(m => m.id === agy.id);
                if (matched) {
                    agy.status = 'ALERTED';
                }
            });
            this.saveAgencies();

            // Construct Canonical Event Model (Section 18)
            this.activeEvent = {
                eventId: options.eventId || `SX-EMG-${dateStr.replace(/-/g, '')}-${Math.floor(Math.random() * 9000 + 1000)}`,
                source: options.source || 'INDUSTRIAL_RISK_ENGINE',
                incidentType: incidentType,
                severity: severity,
                location: location,
                peopleAffected: peopleAffected,
                hazardDetails: options.hazardDetails || 'MQ-135 Gas Plume > 390 PPM + Thermal Escalation 45.2°C + ADXL345 Resonance 0.88g',
                requiredCapabilities: requiredCapabilities,
                departmentsAlerted: targetDeptIds,
                externalAgenciesMatched: externalMatched,
                status: 'ALERTED', // ALERTED -> ACKNOWLEDGED -> RESPONDING -> ON_SCENE -> HANDOVER -> RESOLVED
                timeline: [
                    { time: timeStr, text: `[${timeStr}] Incident Detected by Industrial Sensor Fusion: ${incidentType} (${severity})` },
                    { time: timeStr, text: `[${timeStr}] Multi-Department Alert Broadcast: Safety, Medical, Fire, Security & Operations` },
                    { time: timeStr, text: `[${timeStr}] Controlled Emergency Coordination Event Published to Dispatcher Bus` }
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

        // Update Department Operational Status (ALERTED -> ACKNOWLEDGED -> RESPONDING -> ON_SCENE -> RESOLVED)
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

        // Full Progression Simulation (Judge Demo Scenario - Section 29)
        stepDemoLifecycle(step) {
            const timeStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
            if (!this.activeEvent) {
                this.createEmergencyCoordinationEvent();
            }

            if (step === 1) {
                // Initial detection & alert
                this.departments.forEach(d => {
                    if (['DEP-SAF', 'DEP-MED', 'DEP-FIR', 'DEP-SEC'].includes(d.id)) {
                        d.status = 'ALERTED';
                        d.notificationTime = timeStr;
                    }
                });
                this.activeEvent.status = 'ALERTED';
            } else if (step === 2) {
                // Internal acknowledgements
                this.departments.forEach(d => {
                    if (['DEP-SAF', 'DEP-MED', 'DEP-FIR'].includes(d.id)) {
                        d.status = 'ACKNOWLEDGED';
                        d.ackTime = timeStr;
                    }
                });
                this.activeEvent.status = 'ACKNOWLEDGED';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] Safety, Medical & Fire response units ACKNOWLEDGED emergency dispatch.`
                });
            } else if (step === 3) {
                // External agencies dispatched
                this.departments.forEach(d => {
                    if (['DEP-FIR', 'DEP-MED'].includes(d.id)) d.status = 'RESPONDING';
                });
                this.agencies.forEach(a => {
                    if (a.type === 'AMBULANCE' || a.type === 'FIRE') a.status = 'EN_ROUTE';
                    if (a.type === 'POLICE') a.status = 'CORDON_ACTIVE';
                    if (a.type === 'HOSPITAL') a.status = 'PRE_ALERT_SENT';
                });
                this.activeEvent.status = 'RESPONDING';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] External Dispatch: Ambulance TN-108 EN ROUTE (4 min) • Fire FT-02 EN ROUTE (6 min).`
                });
            } else if (step === 4) {
                // On Scene
                this.departments.forEach(d => {
                    if (['DEP-FIR', 'DEP-SAF'].includes(d.id)) d.status = 'ON_SCENE';
                });
                this.agencies.forEach(a => {
                    if (a.type === 'FIRE') a.status = 'ON_SCENE';
                    if (a.type === 'AMBULANCE') a.status = 'ON_SCENE';
                });
                this.activeEvent.status = 'ON_SCENE';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] Units ON SCENE at Gate 01 / Zone B. Flame knockdown in progress; patient stabilized.`
                });
            } else if (step === 5) {
                // Hospital Handover
                this.agencies.forEach(a => {
                    if (a.type === 'AMBULANCE') a.status = 'HANDOVER_COMPLETE';
                    if (a.type === 'HOSPITAL') a.status = 'PATIENT_RECEIVED';
                });
                this.activeEvent.status = 'HANDOVER';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] Patient successfully transferred to RGGGH Trauma Bay 1. Vital signs stable.`
                });
            } else if (step === 6) {
                // Resolved
                this.departments.forEach(d => d.status = 'STANDBY');
                this.agencies.forEach(a => a.status = 'STANDBY');
                this.activeEvent.status = 'RESOLVED';
                this.activeEvent.timeline.unshift({
                    time: timeStr,
                    text: `[${timeStr}] Emergency incident RESOLVED. Zone B de-smoked; transition to Lockout/Tagout recovery.`
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
    }

    // Export globally
    window.SentinelCoordination = new EmergencyCoordinationEngine();
    window.SENTINEL_DEFAULT_DEPARTMENTS = DEFAULT_DEPARTMENTS;
    window.SENTINEL_DEFAULT_AGENCIES = DEFAULT_AGENCIES;

})(window);
