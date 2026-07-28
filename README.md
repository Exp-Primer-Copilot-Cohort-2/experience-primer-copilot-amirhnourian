# SeaRoute Finland

An interactive, dependency-free dashboard prototype for the Finnish marine routing pipeline. It presents the proposed Gulf of Finland study area, seasonal conditions, vessel risk thresholds, data sources, and a print-ready full report.

The included sample report contains a clearly labelled synthetic four-season dataset, seasonal wave-height heatmaps, and sample conditions for Hanko, Helsinki, Sköldvik, and HaminaKotka. It is intended to demonstrate the eventual output before live data ingestion is connected.

## Run locally

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>. Use **Download full report** to open the browser print dialog, then choose **Save as PDF**. The print layout includes all dashboard data, methodology, sources, and assumptions.

## Notes

- Values shown in the dashboard are clearly identified as illustrative planning data.
- The interface is a frontend prototype and does not make live API requests.
- The report is optimized for A4 printing with background graphics enabled.
