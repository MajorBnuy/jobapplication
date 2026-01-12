# Phase 1
In order to ease the use of our application, we want to split the following features into separate routes:
- New Job Application Page
  - Available at `http://localhost:3000/applications/new`
  - Must present a form to create a new job application with the following fields:
    - Company (text input)
    - Homepage (URL input)
    - Motivation Letter (text area, optional)
- Home Page
  - Available at `http://localhost:3000/`
  - Must present a list of job applications with their
    - Company
    - Status
    - Motivation Letter (a badge if present)
    - Date Applied (if available)
- Job Application Details Page
  - Available at `http://localhost:3000/applications/:id`
  - Must present a form pre-filled with the job application's current data
  - Must allow updating the following fields:
    - Company (text input)
    - Homepage (URL input)
    - Motivation Letter (text area, optional)
  - Must include a "Save" button that updates the job application and redirects to the Job Application Details Page
  - Must include a "Delete" button that removes the job application and redirects to the Home Page
## Nice to Have
- Markdown Rich Text Editor for Motivation Letter
  - Implement a rich text editor for the Motivation Letter field on both the New Job Application Page and the Job Application Details Page.
  - The rich text editor should support basic formatting options such as bold, italic, underline, bullet points, and numbered lists.
- "I applied" Button on Home Page and Job Application Details Page
  - When clicked, this button should set the Date Applied field to the current date and update the display accordingly.
- Search Functionality on Home Page
  - Implement a search bar on the Home Page that allows users to filter job applications by company name.
  - The search should be case-insensitive and update the list of job applications in real-time as the user types.
- Pagination on Home Page
  - If there are more than 10 job applications, implement pagination to display only 10 applications per page.
  - Include navigation controls to move between pages.
- Read-Only Mode for Job Application Details Page
  - Implement a toggle button that switches the Job Application Details Page between edit mode and read-only mode.
  - In read-only mode
    - The "Save" button should be hidden
    - The Motivation Letter should be displayed as rendered markdown instead of an editable text area.
- Add a "Notes" to Job Application
  - On the Job Application Details Page, add a "Notes" section where users can add, edit, and delete personal notes related to the job application.
  - Notes should be displayed in a list format with timestamps indicating when each note was created or last modified.
-----------------------------------------
# Checkliste Phase 1

## Pflicht-Features

- [X] Neue Job Application Seite (`/applications/new`)
  - [X] Formular mit Feldern:
    - [X] Firma (Text)
    - [X] Homepage (URL)
    - [X] Motivationsschreiben (optional, Textarea)
- [X] Home Page (`/`)
  - [X] Liste aller Bewerbungen mit:
    - [X] Firma
    - [X] Status
    - [X] Motivationsschreiben (Badge falls vorhanden)
    - [X] Bewerbungsdatum (falls vorhanden)
- [X] Job Application Detailseite (`/applications/:id`)
  - [X] Formular mit aktuellen Daten der Bewerbung (vorbefüllt)
  - [X] Felder:
    - [X] Firma (Text)
    - [X] Homepage (URL)
    - [X] Motivationsschreiben (optional, Textarea)
  - [ ] "Speichern"-Button (aktualisiert Bewerbung und leitet zurück auf Detailseite)
  - [ ] "Löschen"-Button (entfernt Bewerbung und leitet zurück auf Home Page)

## Nice to Have

- [ ] Markdown Rich Text Editor für Motivationsschreiben (Formatierungen: Fett, Kursiv, Unterstrichen, Listen)
- [ ] "Ich habe mich beworben"-Button (setzt Bewerbungsdatum auf aktuelles Datum, auf Home und Detailseite)
- [ ] Suchfunktion auf Home Page (Filter nach Firmenname, Case-insensitive, Echtzeit)
- [ ] Pagination auf Home Page (mehr als 10 Bewerbungen, Navigation zwischen Seiten)
- [ ] Read-Only Modus für Detailseite (Umschaltbar, "Speichern"-Button ausgeblendet, Motivationsschreiben als gerendertes Markdown)
- [ ] "Notizen" zu Bewerbung (Hinzufügen, Bearbeiten, Löschen von Notizen mit Zeitstempel, Listenformat auf Detailseite)