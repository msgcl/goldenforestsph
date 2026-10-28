# Panay Mango — October 28, 2026 batch

Four photographs supplied by the user, identified as mango trees
on Panay Island, Western Visayas. All entries use the Plantation category.
The gallery date is the supplied filename date, not independently verified capture metadata.

Original photographs are preserved in `originals/`. Enhanced Cloudinary JPEG
copies are saved in `enhanced/`. Built-in imagegen PNG outputs are saved in
`output/imagegen/panay-october-2026/`.

The same prompt was used separately for each photograph:

> Enhance this real documentary photograph of young Sweet Elena mango trees on Panay Island for a website. Apply only gentle exposure correction, restrained natural color balance, slight contrast and sharpening, and mild noise reduction. Preserve the exact original composition, aspect ratio, trees, every trunk and branch, leaves, grass, stakes, palms, clouds, sky, ground and background. Do not add, remove, relocate or invent anything. No sky replacement, no dramatic saturation or lighting, no stylization, no text. Keep it recognizably the exact same photograph with subtle quality improvement.

`manifest.json` records the source filenames, captions, category, location and
verified Cloudinary URLs. To upload this batch or import its existing manifest
into another configured database:

```
npx tsx script/import_panay_october_2026_gallery.ts
```

The importer backs up existing gallery records, adds only missing batch URLs,
and verifies that every pre-existing record remains unchanged before committing.
It never overwrites Cloudinary media or deletes existing gallery items.

Public titles use “Panay Mango” with short, distinct field descriptions; captions omit the cultivar name per the user’s correction. The image-edit prompt above is preserved as originally used.
To update an already imported batch, run `npx tsx script/update_panay_mango_gallery_metadata.ts`.
