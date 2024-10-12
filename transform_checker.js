const fs = require('fs');

// Read the existing JSON data
fs.readFile('checker.json', 'utf8', (err, data) => {
    if (err) throw err;

    // Parse the JSON data
    const originalData = JSON.parse(data);

    // Transform the data based on the "Check" field values
    const transformedData = originalData.Sheet1.map(site => {
        let icons = [];
        
        // Determine icons and other details based on the "Check" field
        if (site.Check === "Installed_and_Tracker") {
            // Add both icons (Findr logo and cell tower) for "Installed_and_Tracker"
            icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/Findr%20logo.png"); // Placeholder for Findr icon URL
            icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/cell%20tower.jpg"); // Placeholder for Cell tower icon URL
        } else if (site.Check === "Installed_Only") {
            // Add only the cell tower icon for "Installed_Only"
            icons.push("https://raw.githubusercontent.com/KKEsty2024/GhanaSites/main/cell%20tower.jpg"); // Placeholder for Cell tower icon URL
        }

        // Prepare the transformed site data
        return {
            lat: site.Latitude,
            lon: site.Longitude,
            name: site["Site Name"],
            id:   site["Site ID Number"],
            imei: site["Ghana Sites.Tracker IMEI"] !== 0 ? site["Ghana Sites.Tracker IMEI"] : null, // Show IMEI if available
            icons: icons.length > 0 ? icons : null // Include icons only if present
        };
    });

    // Write the transformed data to a new JSON file
    fs.writeFile('transformed_checkers_sites.json', JSON.stringify(transformedData, null, 2), (err) => {
        if (err) throw err;
        console.log('Transformed JSON saved as transformed_checkers_sites.json');
    });
});
