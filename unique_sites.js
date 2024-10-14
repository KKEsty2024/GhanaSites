const fs = require('fs');

// Read the existing JSON data
fs.readFile('checkers.json', 'utf8', (err, data) => {
    if (err) throw err;

    // Parse the JSON data
    const originalData = JSON.parse(data);

    // Initialize counters
    let singleIconCount = 0;
    let doubleIconCount = 0;

    // Transform the data based on the "Tracker" field values
    const transformedData = originalData.Sheet1.map(site => {
        let icons = [];

        // Check the Tracker status and IMEI
        if (site.Tracker === "Yes") {
            // Site has a tracker with a valid IMEI
            if (site["Tracker IMEI"] && site["Tracker IMEI"] !== 0) {
                icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/Findr%20logo.png"); // Findr icon
                icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/cell%20tower.jpg"); // Cell tower icon
                doubleIconCount++; // Increment double icon count
            }
        } else if (site.Tracker === "none") {
            // Site is potential (no tracker)
            icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/cell%20tower.jpg"); // Only cell tower icon
            singleIconCount++; // Increment single icon count
        } else if (site["Tracker IMEI"] === 0) {
            // Site has a tracker but IMEI is 0
            icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/cell%20tower.jpg"); // Only cell tower icon
            singleIconCount++; // Increment single icon count
        }

        // Prepare the transformed site data
        return {
            lat: site.Latitude,
            lon: site.Longitude,
            name: site["Site Name"],
            id: site["Site Number"],
            trackerIMEI: site["Tracker IMEI"] || 0, // Show IMEI if available
            icons: icons.length > 0 ? icons : null   // Include icons only if present
        };
    });

    // Write the transformed data to a new JSON file
    fs.writeFile('transformed_Unique.json', JSON.stringify(transformedData, null, 2), (err) => {
        if (err) throw err;
        console.log('Transformed JSON saved as transformer.json');

        // Log the counts to the console
        console.log(`Count of sites with a single icon: ${singleIconCount}`);
        console.log(`Count of sites with double icons: ${doubleIconCount}`);
    });
});
