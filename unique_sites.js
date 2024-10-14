const fs = require('fs');

// Read the existing JSON data
fs.readFile('checker.json', 'utf8', (err, data) => {
    if (err) throw err;

    // Parse the JSON data
    const originalData = JSON.parse(data);

    // Transform the data based on the "Tracker" field values
    const transformedData = originalData.Sheet1.map(site => {
        let icons = [];
        
        // Determine icons and other details based on the "Tracker" field
        if (site.Tracker === "Yes") {
            // Add both icons (Findr logo and cell tower) for "Tracker: Yes"
            icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/Findr%20logo.png"); // Placeholder for Findr icon URL
            icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/cell%20tower.jpg"); // Placeholder for Cell tower icon URL
        } else if (site.Tracker === "No") {
            // Add only the cell tower icon for "Tracker: No"
            icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/cell%20tower.jpg"); // Placeholder for Cell tower icon URL
        }

        // Prepare the transformed site data
        return {
            lat: site.Latitude,
            lon: site.Longitude,
            name: site["Site Name"],
            id: site["Site Number"],
            trackerIMEI: site["Tracker IMEI"] || null, // Show IMEI if available
            icons: icons.length > 0 ? icons : null,    // Include icons only if present
            batteryStatus: site.BatteryNotDelivered    // Include battery delivery status
        };
    });

    // Write the transformed data to a new JSON file
    fs.writeFile('transformed_Unique.json', JSON.stringify(transformedData, null, 2), (err) => {
        if (err) throw err;
        console.log('Transformed JSON saved as transformed_GhanaSites.json');
    });
});
