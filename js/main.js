// Local JSON fallback data (ensures prototype works even when opened directly via file://)
const defaultHotspotData = {
    "mickey": {
        "title": "Mickey Keychain",
        "description": "A silver token attached to the base of the Kingdom Key's hilt, featuring the iconic silhouette of Mickey Mouse."
    },
    "teeth": {
        "title": "Keyblade Teeth",
        "description": "The crown-shaped end of the blade designed to unlock gateways and channel combat magic."
    },
    "handle": {
        "title": "Grip & Handguard",
        "description": "The protective golden handguard and blue cylindrical grip that provide balance and control in battle."
    }
};

let hotspotData = defaultHotspotData;

// Fetch descriptions from local JSON file
fetch('data/hotspots.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        hotspotData = data;
    })
    .catch(error => {
        // Fallback used seamlessly if file:// protocol blocks local fetch
        console.log('Using local fallback data:', error);
    });

// DOM Elements
const infoTitle = document.getElementById('info-title');
const infoDescription = document.getElementById('info-description');
const hotspots = document.querySelectorAll('.Hotspot');

// Add click event to each hotspot button
hotspots.forEach(button => {
    button.addEventListener('click', () => {
        const key = button.getAttribute('data-key');

        if (hotspotData && hotspotData[key]) {
            infoTitle.textContent = hotspotData[key].title;
            infoDescription.textContent = hotspotData[key].description;
        }

        // Highlight active hotspot
        hotspots.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
