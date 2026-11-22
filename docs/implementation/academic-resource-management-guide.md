# Academic Resource Management Guide

**Target Audience:** Curators, Academic Administrators, and Software Engineers  
**Platform:** Invertis Learn  
**Portal Route:** `/admin` (Tab: "Academic Resource Manager")  

---

## 1. Role and Access

The Academic Resource Manager is an administrative suite integrated directly into the Invertis Learn Curator Dashboard. It enables authorized curators to inspect, verify, enable, disable, and replace external learning links, video playlists, online textbooks, and documentation.

Access is protected by the `curator_session` HttpOnly cookie and requires authentication with the administrative curator secret key (`CURATOR_SECRET_KEY`).

---

## 2. Manager Interface Features

### 2.1 Multi-Dimensional Filtering
- **Programme Filter:** Filter resources by academic program (`PHD-009`, `MTECH-CSE`, `BTECH-CSE`, `DIP-CSE`, or `ALL`).
- **Format Filter:** Switch between resource types (`playlist`, `video`, `course`, `notes`, `textbook`, `documentation`, `practical`).
- **Status Filter:** Inspect resources by health state (`page_verified`, `unavailable`, `access_restricted`).
- **Real-Time Search:** Search titles, providers, URLs, and unique resource IDs (`RES-VID-001`, `RES-NOTE-006`).

### 2.2 Live Actions
- **Probe URL (Refresh Icon):** Sends an outbound HEAD request with SSRF guard to test destination availability in real time.
- **Edit URL (Pencil Icon):** Opens modal dialog to update the destination URL for broken or deprecated links.
- **Toggle Eligibility (Active/Disabled):** Instantly suppresses an external resource from appearing in student syllabus pages without deleting records.

---

## 3. Student Broken Link Reports Workflow

1. Students encounter a broken video or external note on any subject page.
2. Clicking the flag icon (`Report`) opens `ReportContentModal`.
3. Submissions are stored securely as `auditEvent` rows with `action: "CONTENT_REPORT"`.
4. Curators review reports in `/admin` under **Student Demand & Content Reports** -> **Content & Link Reports**.
5. The curator can test the link, replace it via the **Academic Resource Manager**, and mark the report resolved.
