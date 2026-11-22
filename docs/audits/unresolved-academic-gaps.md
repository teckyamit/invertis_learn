# Invertis Learn — Unresolved Academic Gaps & Curator Roadmap

**Date:** 22 November 2026  
**Auditor:** Academic Content & Quality Assurance Team  
**Focus:** Documented Curriculum Gaps Pending Official University Ingestion  

---

## 1. Overview of Remaining Academic Gaps

While all 24 core and postgraduate subjects possess complete multi-format verified resources, specific curriculum gaps exist on the official university portal that require curator cross-validation when new materials are released.

---

## 2. Uncovered Syllabus Topics (from canonical dataset)

The following topics were identified as having incomplete open-access coverage in `data/academic-resources/uncovered-syllabus-topics.json`:

1. **PhD-032 (Advance Research Studies in Computer Engineering):**
   - *Topic:* Dedicated free MATLAB academic starter manual.
   - *Status:* MathWorks Onramp requires free user account registration; NS-2 installation guide provided in interim under practical resources.

2. **RPE 101 (Research and Publication Ethics):**
   - *Topic:* Direct open-access full-text copies of proprietary COPE and WAME committee publications.
   - *Status:* University UGC-CARE guidelines and open publishing ethics modules mapped; full COPE guidelines link directly to COPE official website.

3. **MCS-105 (Cloud Computing):**
   - *Topic:* Vendor-neutral serverless computing laboratory manuals without AWS/GCP credit requirements.
   - *Status:* LocalStack and Docker container tutorials mapped as practical simulation alternatives.

4. **BCS-304 (Python Programming):**
   - *Topic:* Unit 5 GUI development using Tkinter vs PyQt.
   - *Status:* Python official documentation and GeeksforGeeks tutorial portal covers Tkinter comprehensively.

5. **IIOT4 (Machine Learning - Cloud Computing Track):**
   - *Topic:* Hardware interfacing for edge ML (TinyML on ESP32/Raspberry Pi).
   - *Status:* Conceptual lectures and Python scikit-learn notebooks mapped; hardware lab manual pending department submission.

6. **DIP-CSE Year I Baseline:**
   - *Topic:* Official standalone Year I Diploma CSE curriculum PDF.
   - *Status:* No standalone Year I Diploma CSE syllabus PDF is publicly indexed on `invertisuniversity.ac.in`. Syllabi are presented from Invertis Learn internal records pending university publication.

---

## 3. Curator Priority Action Items

1. **Student Content Reports Triage:**
   - Monitor the new **Academic Resource Manager** in `/admin` weekly for student-submitted `UNAVAILABLE_VIDEO` or `BROKEN_PDF` alerts.
2. **Automated Monitoring:**
   - Review weekly run outputs from `.github/workflows/academic-resource-health.yml`.
3. **Faculty Note Submissions:**
   - Encourage departmental faculty uploads for courses currently showing the "Curated Video Lectures Under Academic Mapping" notice.
