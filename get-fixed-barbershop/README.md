# Get Fixed Barbershop

Static site (HTML + CSS + JS, no build step) with a booking form that sends the request to the barber on WhatsApp, including the client's address or GPS link.

## Run it in VS Code
1. File > Open Folder > `get-fixed-barbershop`
2. Install the **Live Server** extension (VS Code will suggest it)
3. Right-click `index.html` > **Open with Live Server**

## Structure
- `index.html` : page content (hero, services, how it works, booking form, gallery, TikTok)
- `css/style.css` : colours are variables at the top (`--accent`, `--bg`...)
- `js/main.js` : the **EDIT HERE** block at the top (phone, salon address, gallery photos, services and prices) + form logic
- `assets/logo.webp` : logo, `assets/images/` : put real photos here

## Common edits
- **Prices**: add a 4th item to a service in `SERVICES`, e.g. `["✂️","Coupe homme","...","3 000 FCFA"]`
- **Salon address**: set `CFG.salon`
- **Photos**: copy images to `assets/images/`, list them in `GALLERY`
- **Phone number**: `CFG.phone` and `CFG.phoneDisplay`

## Put it online (free)
Drag the folder onto https://app.netlify.com/drop, or push to GitHub and enable GitHub Pages.

## Ideas for next steps
Real photos, prices, Google Maps embed of the salon, English version, opening hours, reviews section.

## Testing the GPS button
Browsers only allow location on `https://` pages or `localhost` / `127.0.0.1`. Use Live Server (not a double-click on `index.html`), click **Allow** when asked, and on Mac turn on Location Services for your browser (System Settings > Privacy & Security > Location Services). Testing from a phone over your Wi-Fi (`http://192.168...`) will not work until the site is online on https (Netlify gives you https). If GPS fails, clients can type an address or paste a Google Maps / WhatsApp location link.

## Location accuracy and navigation
- The GPS button listens for up to 12 s and keeps the most accurate fix, shows "± N m", and warns above 100 m. Laptops use Wi-Fi positioning and can be off by hundreds of metres, so the client can also **tap the map or drag the pin** to mark the exact spot. That pin is what the directions use.
- The interactive map was removed; the GPS button, address, landmark and pasted link remain.
- The WhatsApp message gives the barber Google Maps directions for car/taxi and bicycle, plus the exact coordinates. I could not verify a public Yango deep link for Côte d'Ivoire, so for Yango he copies the coordinates into the destination box.
- `CFG.salonCoords` (exact salon position) gives clients a precise route to the salon.

## Real photos on the service cards
Drop your photos in `assets/images/` using the names in `assets/images/README.txt` (e.g. `coupe-homme.jpg`). They show on the matching service card automatically; if a file is missing, the emoji is shown instead.
