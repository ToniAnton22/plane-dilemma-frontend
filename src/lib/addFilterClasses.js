export const addFilterClasses = ((filter) => {
    if(filter?.capital){
        return `<div class="location-popup capital-popup">
            <div class="popup-header">
                <span class="popup-icon">👑</span>
                <h3 class="popup-title">${filter?.name}</h3>
            </div>
            <div class="popup-divider">✦</div>
            <div class="popup-body">
                <p class="popup-detail"><span class="detail-label">Population:</span> ${filter?.population}</p>
                <p class="popup-type">Capital City</p>
            </div>
        </div>`;
    }
    else if(filter?.shanty_Town){
        return `<div class="location-popup shanty-popup">
            <div class="popup-header">
                <span class="popup-icon">🏚️</span>
                <h3 class="popup-title">${filter?.name}</h3>
            </div>
            <div class="popup-divider">✦</div>
            <div class="popup-body">
                <p class="popup-detail"><span class="detail-label">Population:</span> ${filter?.population}</p>
                <p class="popup-type">Shanty Town</p>
            </div>
        </div>`;
    }
    else if(filter?.port){
        return `<div class="location-popup port-popup">
            <div class="popup-header">
                <span class="popup-icon">⚓</span>
                <h3 class="popup-title">${filter?.name}</h3>
            </div>
            <div class="popup-divider">✦</div>
            <div class="popup-body">
                <p class="popup-detail"><span class="detail-label">Population:</span> ${filter?.population}</p>
                <p class="popup-type">Port Town</p>
            </div>
        </div>`;
    }
    else{
        return `<div class="location-popup town-popup">
            <div class="popup-header">
                <span class="popup-icon">🏘️</span>
                <h3 class="popup-title">${filter?.name}</h3>
            </div>
            <div class="popup-divider">✦</div>
            <div class="popup-body">
                <p class="popup-detail"><span class="detail-label">Population:</span> ${filter?.population}</p>
                <p class="popup-type">Town</p>
            </div>
        </div>`;
    }
});