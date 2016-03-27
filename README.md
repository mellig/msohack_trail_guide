# msohack_trail_guide

Attempt to use public data on Missoula-area trails to create a simple interactive website. Work in progress.

Intent is to adress a percieved gap in currently available online trail information/mapping, most of which seems to be either produced originally for print (and uploaded to the web as pdfs/static images), or produced at a national scale without much locally-focused attention. Mobile usability is also an issue with some existing services.

raw-data folder includes raw .shp files
data folder includes geojson files for import into mapping via leaflet
CRS is WGS84/EPSG:4326

Site designed with Foundation 5.

## TODOs:

Refine interactive map behavior:

Have trail system organized by region (display colors based on that?)
On click, zoom to area of particular trail system and highlight (make other trails less opaque)

Have ways to highlight portions of the trail network by characteristic (e.g. leash laws)

Sync map to filtering behavior to the category buttons on home page (e.g. to make it possible to select trails by leash law category)

Data work:
- Clean up geodata (e.g. remove small sections of trail in town)
- Add in missing trailheads
- Figure out how to present length with multi-segment trail networks

See if it's possible to get cleaner data (with more information) from the city or other entities directly.

## Other notes:

One interface idea:
Presenting users with an initial, pre-selected 'Top 5 hikes' upon first reaching the site (e.g. classic local day hikes like the M trail), then let users select other hikes based on the interface.

Other ideas we discussed:
- Adding elevation profiles
- Outside link to Google Maps providing directions to the trailhead

Useful information to include for each trail:
- Trail name
- Length elevation gain
- Seasonal use restrictions 
- Allowed uses (e.g. bikes, motor-vehicles, horses)
- Leash laws
- How many dogs actually use the trail (for people who want to avoid them for whatever reason)
- Type of surface / ADA-accessibility
- Hike descriptions
- Trailhead facilities
- Camping availability
- Entity responsible for maintenance
- What's worth seeing?