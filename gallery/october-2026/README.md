# October 2026 gallery additions

Ten photographs supplied by the user. Originals are preserved in `originals/`;
reviewed enhanced JPEG copies are in `enhanced/`. `manifest.json` records each
caption, category, Cloudinary asset URL, and source filename. The user confirmed
that the three Plantation field photos show the Aquilaria crassna out-planting site at Panay Island,
Western Visayas; the seven Nursery photos show Aquilaria crassna in Kabankalan
City, Negros Occidental, Philippines. Every title and description identifies the species.
The date uses the supplied WhatsApp
filename date rather than verified capture metadata.

Images were enhanced with the built-in imagegen tool. Final PNG outputs are
preserved in `output/imagegen/october-2026/`. The prompt requested restrained
exposure, contrast, color balance, and sharpening, with original framing, plants,
structures, objects, and people preserved; no added or removed objects or text.
For photo 04, the selected revision requested only a slight foreground shadow
lift and gentle noise reduction, explicitly retaining the original pale sky.

Each selected image was enhanced before upload, uploaded to Cloudinary with a
unique batch public ID without overwriting assets, and downloaded again to
verify delivery. Gallery records use the secure Cloudinary URLs.

To import these additions into another configured database, run:

```
npx tsx script/import_october_2026_gallery.ts
```

For a database that already contains the October batch, apply the confirmed
titles, descriptions, and locations with `npx tsx script/update_october_2026_gallery_metadata.ts`.
This updates only those three fields on the ten matching batch URLs and verifies
that all other gallery data remains unchanged.

The importer backs up existing gallery rows locally, adds only missing URLs, and
verifies that every existing gallery row is unchanged before committing. It does
not modify nursery statistics or sales allocations. No videos were supplied in
this batch.
