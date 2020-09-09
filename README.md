**GALLERY SERVICE API:** follows the general pattern of REST.

**GET User Info:**
Retrieves user info data.
* GET `/user/:id`

**Path Parameters:**
* `id` user id

**Success Status Code:** `200`

**Returns:** a JSON Object.
```json
    {
      "user_id":  "Number",
      "user_name": "String",
      "email": "String",
      "date_of_birth": "Date",
      "address": "String",
      "phone_number": "String",
    }
```
------------------------------------------------------------------

**GET Users Saved Lists:**
Retrieves user saved lists.
* GET `/user/:id/lists`

**Path Parameters:**
* `id` user id

**Success Status Code:** `200`

**Returns:** a JSON Object.
```json
    {
      "list_id":  "Number",
      "list_name": "String",
      "poropsed_start": "Date",
      "propposed_end": "Date",
      "listing_count": "Date",
      "date_created": "String",
    }
```

------------------------------------------------------------------

**GET A Property:**
Retrieves data about the specified property id.
* GET `/property/:property_id`

**Path Parameters:**
* `property_id` property id

**Success Status Code:** `200`

**Returns:** a JSON Object.
```json
    {
      "property_id":  "Number",
      "title": "String",
      "bedrooms": "Number",
      "beds": "Number",
      "baths": "Number",
      "guests": "Number",
      "rating": "Number",
      "reviews": "Number",
      "superHost": "Boolean",
      "location": "String",
      "user_id": "Number",
      "images": "Array"
    }
```

------------------------------------------------------------------

**POST New Property:** Posts a new property to the gallery.
* POST `user/:id/property`

**Path Parameters:**
* `id` user id

**Success Status Code:** `201`

**The Request Body** expects a JSON object containing the following keys:
```json
    {
      "property_id":  "Number",
      "title": "String",
      "rating": "Number",
      "reviews": "Number",
      "superHost": "Boolean",
      "location": "String",
    }
```

------------------------------------------------------------------

**UPDATE Gallery:**updates an existing property with the specified data.
* PUT `user/:id/property/:property_id`

**Path Parameters:**
* `id` user id
* `property_id` property id to update

**Success Status Code:** `204`

**The Request Body** expects a JSON object with the following keys:
```json
    {
      "property_id": "Number",
      "title": "String",
      "rating": "Number",
      "reviews": "Number",
      "superHost": "Boolean",
      "location": "String",
    }
```
------------------------------------------------------------------

**DELETE Property:**deletes an existing property with the specified id.
* DELETE `user/:id/property/:property_id`

**Path Parameters:**
* `id` property id
* `property_id` property id to delete

**Success Status Code:** `204`

------------------------------------------------------------------

**Add Image:** adds a new images to an existing gallery property
* POST `user/:id/property/:property_id/images`

**Path Parameters:**
* `id` user id
* `property_id` property id

**Success Status Code:** `201`
```json
  [
    {
      "img_id":  "Number",
      "img_url": "String",
      "uploaded": "Date",
      "img_description": "String",
      "listing_id": "Number"
    }
  ]
```

// allow a user to save a property to a list