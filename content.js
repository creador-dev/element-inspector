// Create tooltip element
const tooltip = document.createElement("div");
tooltip.id = "id-detector-tooltip";
tooltip.style.display = "none";
document.body.appendChild(tooltip);

// Track current highlighted element
let currentElement = null;
let isEnabled = false; // Default to disabled
let displayOptions = {
  showId: true,
  showClass: true,
  showTag: true,
  showData: true,
  showAllAttrs: false,
};

// Load enabled state and display options from storage
chrome.storage.sync.get(
  ["enabled", "showId", "showClass", "showTag", "showData", "showAllAttrs"],
  (result) => {
    isEnabled = result.enabled === true; // Default to false
    displayOptions.showId = result.showId !== false;
    displayOptions.showClass = result.showClass !== false;
    displayOptions.showTag = result.showTag !== false;
    displayOptions.showData = result.showData !== false;
    displayOptions.showAllAttrs = result.showAllAttrs === true;
  }
);

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleExtension") {
    isEnabled = request.enabled;
    if (!isEnabled && currentElement) {
      hideTooltip(currentElement);
    }
  } else if (request.action === "updateDisplayOptions") {
    displayOptions = request.options;
    // Update tooltip if currently showing
    if (currentElement) {
      showTooltip(currentElement);
    }
  }
});

// Function to show tooltip
function showTooltip(element) {
  const parts = [];

  // Build tooltip text based on display options
  if (displayOptions.showTag) {
    parts.push(`<${element.tagName.toLowerCase()}>`);
  }

  if (displayOptions.showId && element.id) {
    parts.push(`ID: ${element.id}`);
  }

  if (displayOptions.showClass) {
    if (element.className && typeof element.className === "string") {
      const classes = element.className.trim();
      if (classes) {
        const classList = classes.split(/\s+/).join(", ");
        parts.push(`Classes: ${classList}`);
      }
    }
  }

  if (displayOptions.showData) {
    // Get all data attributes
    const dataAttrs = [];
    for (let attr of element.attributes) {
      if (attr.name.startsWith("data-")) {
        dataAttrs.push(`${attr.name}: ${attr.value}`);
      }
    }
    if (dataAttrs.length > 0) {
      parts.push(...dataAttrs);
    }
  }

  if (displayOptions.showAllAttrs) {
    // Get all attributes
    const allAttrs = [];
    for (let attr of element.attributes) {
      // Skip id, class, and data attributes if they're already shown
      if (
        (displayOptions.showId && attr.name === "id") ||
        (displayOptions.showClass && attr.name === "class") ||
        (displayOptions.showData && attr.name.startsWith("data-"))
      ) {
        continue;
      }
      allAttrs.push(`${attr.name}: ${attr.value}`);
    }
    if (allAttrs.length > 0) {
      parts.push(...allAttrs);
    }
  }

  tooltip.textContent = parts.length > 0 ? parts.join("\n") : "No data";
  tooltip.style.display = "block";

  // Get element and tooltip dimensions
  const rect = element.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const spacing = 10; // Space between element and tooltip
  let left = rect.left + window.scrollX;
  let top = rect.top + window.scrollY;

  // Reset any previous transform
  tooltip.style.transform = "none";

  // Determine vertical position (top or bottom)
  const spaceAbove = rect.top;
  const spaceBelow = viewportHeight - rect.bottom;
  const tooltipHeight = tooltipRect.height || 50; // Fallback height

  if (spaceBelow >= tooltipHeight + spacing) {
    // Position below the element
    top = rect.bottom + window.scrollY + spacing;
  } else if (spaceAbove >= tooltipHeight + spacing) {
    // Position above the element
    top = rect.top + window.scrollY - tooltipHeight - spacing;
  } else {
    // Not enough space above or below, position below anyway
    top = rect.bottom + window.scrollY + spacing;
  }

  // Determine horizontal position (left, right, or center)
  const tooltipWidth = tooltipRect.width || 200; // Fallback width
  const spaceRight = viewportWidth - rect.left;
  const spaceLeft = rect.right;

  if (rect.left + tooltipWidth <= viewportWidth) {
    // Align with left edge of element
    left = rect.left + window.scrollX;
  } else if (rect.right - tooltipWidth >= 0) {
    // Align with right edge of element
    left = rect.right + window.scrollX - tooltipWidth;
  } else {
    // Center in viewport
    left = (viewportWidth - tooltipWidth) / 2 + window.scrollX;
  }

  // Ensure tooltip stays within viewport bounds
  const minLeft = window.scrollX + spacing;
  const maxLeft = window.scrollX + viewportWidth - tooltipWidth - spacing;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  const minTop = window.scrollY + spacing;
  const maxTop = window.scrollY + viewportHeight - tooltipHeight - spacing;
  top = Math.max(minTop, Math.min(top, maxTop));

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;

  // Highlight the element
  currentElement = element;
  element.classList.add("id-detector-highlight");
}

// Function to hide tooltip
function hideTooltip(element) {
  tooltip.style.display = "none";
  if (element) {
    element.classList.remove("id-detector-highlight");
  }
  currentElement = null;
}

// Global mouseover handler to show ID of exact element being hovered
document.addEventListener("mouseover", (e) => {
  // Check if extension is enabled
  if (!isEnabled) return;

  const target = e.target;

  // Skip if it's our tooltip
  if (target.id === "id-detector-tooltip") {
    return;
  }

  // Only update if we're hovering a different element
  if (currentElement !== target) {
    if (currentElement) {
      hideTooltip(currentElement);
    }
    // Show tooltip with selected information
    showTooltip(target);
  }
});

document.addEventListener("mouseout", (e) => {
  // Hide tooltip when leaving the element
  if (currentElement && e.target === currentElement) {
    hideTooltip(currentElement);
  }
});
// Clean up on page unload
window.addEventListener("beforeunload", () => {
  if (currentElement) {
    hideTooltip(currentElement);
  }
});
