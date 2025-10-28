# FlexSim Team - Marketing Website

Eine professionelle HTML-Vorlage für das FlexSim Team mit schwarzem Hintergrund und weißer Schrift.

## 📁 Projektstruktur

```
Marketing FlexSim/
├── index.html          # Haupt-HTML-Datei
├── style.css           # Styling und Design
├── script.js           # JavaScript für Interaktionen
├── assets/
│   ├── fonts/         # Schriftarten (optional)
│   └── images/        # Bilder für Team-Avatare
└── TXP/               # TXP Animation (optional)
```

## ✨ Features

- ✅ **Schwarzer Hintergrund** mit weißer Schrift für professionelles Erscheinungsbild
- ✅ **FlexSim Projekte Sektion** - Präsentation von bis zu 6 Projekten
- ✅ **Team-Sektion** - 3 Teammitglieder mit Kästchen-Design
- ✅ **Responsive Design** - funktioniert auf allen Geräten
- ✅ **Hover-Animationen** - interaktive Karten mit Effekten
- ✅ **TXP-Animation** - optionaler animierter Charakter (wenn Assets verfügbar)
- ✅ **Logo-Animationen** - Partikel-Effekte beim Klick auf "FlexSim"

## 🎨 Anpassung der Inhalte

### 1. FlexSim Projekte anpassen

In der `index.html` findest du die Projekt-Karten ab Zeile 22. Passe folgende Elemente an:

```html
<div class="project-card">
    <div class="project-number">01</div>
    <h3 class="project-title">Dein Projekt Name</h3>
    <p class="project-description">Deine Projektbeschreibung hier...</p>
    <div class="project-status">Status: In Bearbeitung</div>
</div>
```

**Verfügbare Status-Optionen:**
- In Bearbeitung
- Abgeschlossen
- In Planung
- Geplant

### 2. Team-Mitglieder anpassen

Ab Zeile 60 in der `index.html` kannst du die Team-Informationen ändern:

```html
<div class="team-card">
    <div class="team-avatar">
        <div class="avatar-placeholder">👤</div>
    </div>
    <h3 class="team-name">Name des Teammitglieds</h3>
    <p class="team-role">Position/Rolle</p>
    <p class="team-description">Kurze Beschreibung der Verantwortlichkeiten...</p>
</div>
```

**Avatar anpassen:**
- Ersetze `👤` mit einem anderen Emoji
- ODER füge ein Bild hinzu:
  ```html
  <img src="assets/images/person1.jpg" alt="Name" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
  ```

### 3. Farben anpassen

In der `style.css` (Zeilen 11-20) kannst du die Farbpalette ändern:

```css
:root {
    --primary-color: #00A8E8;      /* Hauptfarbe (Blau) */
    --secondary-color: #0066CC;    /* Sekundärfarbe (Dunkelblau) */
    --accent-color: #FFD700;       /* Akzentfarbe (Gold) */
    --background-black: #000000;   /* Hintergrund */
    --card-background: #1a1a1a;    /* Karten-Hintergrund */
    --text-white: #ffffff;         /* Haupttext */
    --text-gray: #b0b0b0;         /* Sekundärtext */
}
```

## 🖼️ Bilder hinzufügen

### Team-Avatare
1. Speichere Bilder im Ordner `assets/images/`
2. Benenne sie z.B. `team-member-1.jpg`, `team-member-2.jpg`, etc.
3. Ersetze in der HTML:
   ```html
   <div class="team-avatar">
       <img src="assets/images/team-member-1.jpg" alt="Name">
   </div>
   ```

### Projekt-Bilder
Falls du Projekt-Screenshots hinzufügen möchtest:
```html
<div class="project-card">
    <img src="assets/images/projekt1.jpg" alt="Projekt 1" style="width: 100%; border-radius: 10px; margin-bottom: 15px;">
    <!-- Rest des Inhalts -->
</div>
```

## 🎭 TXP-Animation aktivieren

1. Kopiere den `TXP` Ordner aus dem AI Bytes Projekt
2. Lege ihn in `Marketing FlexSim/TXP/`
3. Die Animation wird automatisch aktiviert, wenn die Dateien vorhanden sind

## ⌨️ Tastenkombinationen

- **F** - Löst eine Logo-Animation mit Partikeln aus
- **Klick auf "FlexSim"** - Zeigt ebenfalls die Animation
- **Klick auf TXP** - TXP spricht (wenn Animation verfügbar)

## 🚀 Website öffnen

Öffne einfach die `index.html` Datei in einem Browser (Chrome, Firefox, Edge).

## 💡 Tipps

1. **Mehr Projekte hinzufügen**: Kopiere einfach einen `<div class="project-card">` Block und passe die Inhalte an
2. **Mehr Team-Mitglieder**: Kopiere einen `<div class="team-card">` Block
3. **Schriftgröße anpassen**: In `style.css` nach `font-size` suchen und Werte ändern
4. **Hintergrund ändern**: Ändere `--background-black` in den CSS-Variablen

## 📱 Responsive Design

Die Website passt sich automatisch an verschiedene Bildschirmgrößen an:
- **Desktop**: 3 Team-Mitglieder nebeneinander, mehrere Projekt-Karten
- **Tablet**: 2 Spalten für Projekte, flexible Team-Anordnung
- **Mobil**: 1 Spalte, gestapeltes Layout

## ❓ Hilfe

Bei Fragen zur Anpassung:
1. Kommentare im Code beachten
2. CSS-Klassen sind selbsterklärend benannt
3. JavaScript ist optional für Animationen

---

**Entwickelt von Til Sander** | Digital Factory Campus 2025
