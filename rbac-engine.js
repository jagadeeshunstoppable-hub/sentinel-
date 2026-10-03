/**
 * SENTINEL-X | Role-Based Access Control (RBAC) Engine
 * Enterprise Multi-Role Authorization & Route Guard for Industrial & Civilian Platforms
 * SIH 2026 PS-26223 | Zero Regression Additive Architecture
 */

(function (window) {
    'use strict';

    // 1. Core Role Definitions
    const ROLES = {
        WORKER: 'WORKER',
        SUPERVISOR: 'SUPERVISOR',
        ADMIN: 'ADMIN',
        OWNER: 'OWNER',
        COORDINATOR: 'COORDINATOR'
    };

    // 2. Permission Registry
    const PERMISSIONS = {
        // Worker-level permissions
        VIEW_PERSONAL_SAFETY: 'view_personal_safety',
        VIEW_EVACUATION_ROUTES: 'view_evacuation_routes',
        TRIGGER_PERSONAL_SOS: 'trigger_personal_sos',
        REPORT_INCIDENT: 'report_incident',
        VIEW_ASSIGNED_ALERTS: 'view_assigned_alerts',

        // Supervisor-level permissions
        VIEW_TEAM_WORKERS: 'view_team_workers',
        VIEW_ZONE_STATUS: 'view_zone_status',
        VIEW_COMMAND_CENTER: 'view_command_center',
        VIEW_DIGITAL_TWIN: 'view_digital_twin',
        ACKNOWLEDGE_INCIDENTS: 'acknowledge_incidents',
        ESCALATE_INCIDENT: 'escalate_incident',
        INITIATE_DEPARTMENT_ALERT: 'initiate_department_alert',

        // Owner-level permissions
        VIEW_EXECUTIVE_SUMMARY: 'view_executive_summary',
        VIEW_FACILITY_SAFETY_STATUS: 'view_facility_safety_status',
        VIEW_OPERATIONAL_CONTINUITY: 'view_operational_continuity',
        VIEW_COORDINATION_SUMMARY: 'view_coordination_summary',
        VIEW_RESILIENCE_METRICS: 'view_resilience_metrics',

        // Admin-level permissions
        MANAGE_USERS_ROLES: 'manage_users_roles',
        MANAGE_DEPARTMENTS: 'manage_departments',
        MANAGE_AGENCIES: 'manage_agencies',
        MANAGE_SYSTEM_CONFIG: 'manage_system_config',
        VIEW_RAW_TELEMETRY: 'view_raw_telemetry',
        VIEW_HARDWARE_PROTOTYPE: 'view_hardware_prototype',
        VIEW_SATELLITE_UPLINK: 'view_satellite_uplink',
        VIEW_FORENSIC_LEDGER: 'view_forensic_ledger',

        // Emergency Coordinator permissions
        MANAGE_EMERGENCY_DISPATCH: 'manage_emergency_dispatch',
        COORDINATE_EXTERNAL_AGENCIES: 'coordinate_external_agencies',
        UPDATE_DEPARTMENT_READINESS: 'update_department_readiness'
    };

    // 3. Access Control Matrix (Role -> Allowed Permissions)
    const ROLE_PERMISSIONS = {
        [ROLES.WORKER]: [
            PERMISSIONS.VIEW_PERSONAL_SAFETY,
            PERMISSIONS.VIEW_EVACUATION_ROUTES,
            PERMISSIONS.TRIGGER_PERSONAL_SOS,
            PERMISSIONS.REPORT_INCIDENT,
            PERMISSIONS.VIEW_ASSIGNED_ALERTS
        ],
        [ROLES.SUPERVISOR]: [
            PERMISSIONS.VIEW_PERSONAL_SAFETY,
            PERMISSIONS.VIEW_EVACUATION_ROUTES,
            PERMISSIONS.TRIGGER_PERSONAL_SOS,
            PERMISSIONS.REPORT_INCIDENT,
            PERMISSIONS.VIEW_ASSIGNED_ALERTS,
            PERMISSIONS.VIEW_TEAM_WORKERS,
            PERMISSIONS.VIEW_ZONE_STATUS,
            PERMISSIONS.VIEW_COMMAND_CENTER,
            PERMISSIONS.VIEW_DIGITAL_TWIN,
            PERMISSIONS.ACKNOWLEDGE_INCIDENTS,
            PERMISSIONS.ESCALATE_INCIDENT,
            PERMISSIONS.INITIATE_DEPARTMENT_ALERT,
            PERMISSIONS.COORDINATE_EXTERNAL_AGENCIES
        ],
        [ROLES.OWNER]: [
            PERMISSIONS.VIEW_EXECUTIVE_SUMMARY,
            PERMISSIONS.VIEW_FACILITY_SAFETY_STATUS,
            PERMISSIONS.VIEW_OPERATIONAL_CONTINUITY,
            PERMISSIONS.VIEW_COORDINATION_SUMMARY,
            PERMISSIONS.VIEW_RESILIENCE_METRICS,
            PERMISSIONS.VIEW_COMMAND_CENTER,
            PERMISSIONS.VIEW_DIGITAL_TWIN,
            PERMISSIONS.VIEW_ZONE_STATUS,
            PERMISSIONS.VIEW_TEAM_WORKERS,
            PERMISSIONS.VIEW_ASSIGNED_ALERTS
        ],
        [ROLES.COORDINATOR]: [
            PERMISSIONS.MANAGE_EMERGENCY_DISPATCH,
            PERMISSIONS.COORDINATE_EXTERNAL_AGENCIES,
            PERMISSIONS.UPDATE_DEPARTMENT_READINESS,
            PERMISSIONS.VIEW_ZONE_STATUS,
            PERMISSIONS.ACKNOWLEDGE_INCIDENTS,
            PERMISSIONS.ESCALATE_INCIDENT,
            PERMISSIONS.INITIATE_DEPARTMENT_ALERT,
            PERMISSIONS.VIEW_EVACUATION_ROUTES
        ],
        [ROLES.ADMIN]: Object.values(PERMISSIONS) // Admin has full privileges
    };

    // 4. Role to Authorized Workspace Indices Mapping (app.html 16 workspaces)
    // 0: Command Center, 1: Digital Twin, 2: Disaster Readiness, 3: Edge Telemetry,
    // 4: Risk Field, 5: Workers, 6: Machines, 7: Incidents, 8: Response/Evacuation,
    // 9: Recovery, 10: Event Ledger, 11: Resilience, 12: System, 13: Physical Prototype,
    // 14: Satellite Uplink, 15: PPE Detection, 16: Multi-Department Emergency Coordination,
    // 17: Owner Executive Overview
    const ROLE_WORKSPACES = {
        [ROLES.WORKER]: [
            { idx: 8, label: 'MY SAFETY & EVACUATION', icon: 'shield-alert', badge: 'WORKER SAFETY' },
            { idx: 7, label: 'INCIDENTS & REPORTING', icon: 'alert-triangle', badge: 'REPORTING' }
        ],
        [ROLES.SUPERVISOR]: [
            { idx: 0, label: 'COMMAND CENTER', icon: 'activity', badge: 'OPERATIONS' },
            { idx: 1, label: 'DIGITAL TWIN', icon: 'box', badge: '3D TWIN' },
            { idx: 4, label: 'RISK FIELD', icon: 'layers', badge: 'HAZARDS' },
            { idx: 5, label: 'TEAM & WORKERS', icon: 'users', badge: 'PERSONNEL' },
            { idx: 6, label: 'MACHINES & TELEMETRY', icon: 'cpu', badge: 'ASSETS' },
            { idx: 7, label: 'INCIDENTS', icon: 'alert-triangle', badge: 'ACTIVE' },
            { idx: 8, label: 'EMERGENCY RESPONSE', icon: 'shield', badge: 'EGRESS' },
            { idx: 16, label: 'DEPT COORDINATION', icon: 'share-2', badge: 'DISPATCH' }
        ],
        [ROLES.OWNER]: [
            { idx: 17, label: 'EXECUTIVE OVERVIEW', icon: 'briefcase', badge: 'EXECUTIVE' },
            { idx: 0, label: 'COMMAND CENTER', icon: 'activity', badge: 'OVERVIEW' },
            { idx: 1, label: 'DIGITAL TWIN', icon: 'box', badge: 'FACILITY' },
            { idx: 7, label: 'ACTIVE INCIDENTS', icon: 'alert-triangle', badge: 'HAZARDS' },
            { idx: 16, label: 'DEPT COORDINATION', icon: 'share-2', badge: 'EMERGENCY' },
            { idx: 9, label: 'BUSINESS RECOVERY', icon: 'refresh-cw', badge: 'STABILIZATION' },
            { idx: 11, label: 'CONTINUITY & RESILIENCE', icon: 'shield-check', badge: 'CONTINUITY' }
        ],
        [ROLES.COORDINATOR]: [
            { idx: 16, label: 'EMERGENCY COORDINATION', icon: 'share-2', badge: 'COORDINATION' },
            { idx: 7, label: 'INCIDENT LOG', icon: 'alert-triangle', badge: 'TRIAGE' },
            { idx: 8, label: 'EVACUATION ROUTES', icon: 'shield', badge: 'MUSTERING' },
            { idx: 0, label: 'COMMAND CENTER', icon: 'activity', badge: 'OVERVIEW' }
        ],
        [ROLES.ADMIN]: [
            { idx: 0, label: '01 COMMAND CENTER' },
            { idx: 1, label: '02 DIGITAL TWIN' },
            { idx: 2, label: '03 DISASTER READINESS' },
            { idx: 3, label: '04 EDGE TELEMETRY' },
            { idx: 4, label: '05 RISK FIELD' },
            { idx: 5, label: '06 WORKERS' },
            { idx: 6, label: '07 MACHINES' },
            { idx: 7, label: '08 INCIDENTS' },
            { idx: 8, label: '09 RESPONSE' },
            { idx: 9, label: '10 RECOVERY' },
            { idx: 10, label: '11 EVENT LEDGER' },
            { idx: 11, label: '12 RESILIENCE' },
            { idx: 12, label: '13 SYSTEM CONFIG' },
            { idx: 13, label: '14 PHYSICAL PROTOTYPE' },
            { idx: 14, label: '15 SATELLITE SAT-COM' },
            { idx: 15, label: '16 AI PPE DETECTION' },
            { idx: 16, label: '17 DEPT COORDINATION' },
            { idx: 17, label: '18 OWNER EXECUTIVE' }
        ]
    };

    // Role Metadata for Display
    const ROLE_METADATA = {
        [ROLES.WORKER]: {
            title: 'Worker Safety Profile',
            badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
            description: 'Focused on personal safety, assigned zone alerts, evacuation egress routes, and rapid SOS reporting.',
            defaultWorkspace: 8
        },
        [ROLES.SUPERVISOR]: {
            title: 'Operations Supervisor',
            badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
            description: 'Responsible for active personnel safety, machine telemetry, incident triage, and department escalations.',
            defaultWorkspace: 0
        },
        [ROLES.ADMIN]: {
            title: 'System Administrator',
            badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
            description: 'Full operational control, security architecture, system configurations, edge node provision, and audit ledger.',
            defaultWorkspace: 0
        },
        [ROLES.OWNER]: {
            title: 'Executive Facility Owner',
            badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
            description: 'Executive-level situational awareness, business continuity, worker welfare metrics, and multi-agency liaison.',
            defaultWorkspace: 17
        },
        [ROLES.COORDINATOR]: {
            title: 'Department Emergency Coordinator',
            badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
            description: 'Dedicated multi-department dispatch, internal readiness management, and external public safety liaison.',
            defaultWorkspace: 16
        }
    };

    class SentinelRBAC {
        constructor() {
            this.currentRole = this.resolveActiveRole();
        }

        // Resolves role from session storage or URL query param
        resolveActiveRole() {
            const urlParams = new URLSearchParams(window.location.search);
            const queryRole = urlParams.get('role');
            if (queryRole && ROLES[queryRole.toUpperCase()]) {
                const normalized = ROLES[queryRole.toUpperCase()];
                sessionStorage.setItem('userRole', normalized);
                sessionStorage.setItem('authenticated', 'true');
                return normalized;
            }

            const storedRole = sessionStorage.getItem('userRole');
            if (storedRole) {
                const upper = storedRole.toUpperCase();
                if (upper.includes('WORKER')) return ROLES.WORKER;
                if (upper.includes('SUPERVISOR')) return ROLES.SUPERVISOR;
                if (upper.includes('OWNER') || upper.includes('EXECUTIVE')) return ROLES.OWNER;
                if (upper.includes('COORDINAT') || upper.includes('DEPARTMENT')) return ROLES.COORDINATOR;
                if (upper.includes('ADMIN')) return ROLES.ADMIN;
            }

            // Default fallback is ADMIN for full demonstration or SUPERVISOR
            return ROLES.ADMIN;
        }

        getActiveRole() {
            return this.currentRole;
        }

        getCurrentRole() {
            return this.currentRole;
        }

        getRoleMetadata(role = this.currentRole) {
            const normalized = typeof role === 'string' ? (ROLES[role.toUpperCase()] || role) : role;
            return ROLE_METADATA[normalized] || ROLE_METADATA[ROLES.ADMIN];
        }

        setActiveRole(roleName) {
            const upper = String(roleName).toUpperCase();
            if (ROLES[upper]) {
                this.currentRole = ROLES[upper];
                sessionStorage.setItem('userRole', this.currentRole);
                sessionStorage.setItem('sentinel_role', this.currentRole);
                sessionStorage.setItem('authenticated', 'true');
                
                // Dispatch event so UI components can re-render reactively
                window.dispatchEvent(new CustomEvent('sentinel:role-changed', {
                    detail: { role: this.currentRole, meta: this.getRoleMetadata(this.currentRole) }
                }));

                return true;
            }
            return false;
        }

        setCurrentRole(roleName) {
            return this.setActiveRole(roleName);
        }

        hasPermission(permission) {
            const allowed = ROLE_PERMISSIONS[this.currentRole] || [];
            return allowed.includes(permission);
        }

        getRequiredRoleForWorkspace(workspaceIndex) {
            const idx = parseInt(workspaceIndex, 10);
            if (idx === 17) return 'OWNER / EXECUTIVE';
            if (idx === 16) return 'COORDINATOR / ADMIN';
            if ([12, 13, 14, 15].includes(idx)) return 'ADMIN / SYSTEMS ENGINEER';
            if ([0, 1, 2, 3, 4, 5, 6].includes(idx)) return 'SUPERVISOR / ADMIN';
            return 'AUTHORIZATION REQUIRED';
        }

        canAccessWorkspace(workspaceIndex, roleOverride) {
            const idx = parseInt(workspaceIndex, 10);
            const targetRole = roleOverride ? (ROLES[String(roleOverride).toUpperCase()] || this.currentRole) : this.currentRole;
            if (targetRole === ROLES.ADMIN) return true;

            const allowedWorkspaces = ROLE_WORKSPACES[targetRole] || [];
            return allowedWorkspaces.some(w => w.idx === idx);
        }

        getAllowedWorkspaces() {
            return ROLE_WORKSPACES[this.currentRole] || ROLE_WORKSPACES[ROLES.ADMIN];
        }

        getDefaultWorkspace(roleOverride) {
            const targetRole = roleOverride ? (ROLES[String(roleOverride).toUpperCase()] || this.currentRole) : this.currentRole;
            const meta = this.getRoleMetadata(targetRole);
            return meta ? meta.defaultWorkspace : 0;
        }
    }

    // Export globally
    window.SentinelRBAC = new SentinelRBAC();
    window.SENTINEL_ROLES = ROLES;
    window.SENTINEL_PERMISSIONS = PERMISSIONS;

})(window);
