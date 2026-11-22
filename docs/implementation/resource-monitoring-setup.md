# Scheduled Resource Monitoring Setup Guide

**Target Audience:** DevOps, System Administrators, Security Engineers  
**Components:** `scripts/monitor-resource-health.js`, `.github/workflows/academic-resource-health.yml`  

---

## 1. Monitoring Architecture

External links (YouTube playlists, NPTEL course portals, university documentation) can experience bitrot, deletion, or paywalls over time. Invertis Learn deploys a continuous health monitoring pipeline to detect and flag broken links before students encounter them.

```
+-------------------------------------------------------------+
|                 Canonical Resource Registry                  |
|          (data/academic-resources/resource-registry.json)   |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|               Outbound Link Health Monitor                   |
|           (scripts/monitor-resource-health.js)              |
|  - SSRF Protection (blocks private / cloud metadata IPs)     |
|  - Concurrency Limiter (5 simultaneous HTTP requests)        |
|  - 8000ms Timeout with Exponential Backoff Retries          |
+------------------------------+------------------------------+
                               |
        +----------------------+----------------------+
        |                                             |
        v                                             v
+-------------------------------+   +----------------------------------+
| docs/implementation/          |   | Curator Dashboard               |
| RESOURCE_HEALTH_REPORT.json   |   | (/admin Academic Resource Manager)|
+-------------------------------+   +----------------------------------+
```

---

## 2. SSRF Protection Invariants

The monitoring script strictly prohibits outbound connections to:
- Loopback addresses (`127.0.0.1`, `localhost`, `::1`)
- Private RFC1918 subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`)
- Cloud instance metadata endpoints (`169.254.169.254`)
- Non-HTTP/HTTPS protocols (`file://`, `gopher://`, `ftp://`)

---

## 3. Scheduled Automated Execution

### GitHub Actions Workflow
The workflow is pre-configured in `.github/workflows/academic-resource-health.yml`:
- **Trigger:** Runs automatically every Sunday at 02:00 UTC (`0 2 * * 0`) and on manual `workflow_dispatch`.
- **Jobs:** Executes `node scripts/monitor-resource-health.js` followed by `node scripts/verify-curated-cse-resources.js`.
- **Alerting:** Fails the CI pipeline if critical resource degradation exceeds thresholds.

### Manual CLI Execution
```bash
node scripts/monitor-resource-health.js
```
The monitor will log individual probe results and write a structured status JSON report to `docs/implementation/RESOURCE_HEALTH_REPORT.json`.
