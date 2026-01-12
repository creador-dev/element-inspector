# Element Inspector 🔍

A lightweight Chrome extension that lets you instantly inspect HTML elements by simply hovering over them. Perfect for developers, QA engineers, and anyone working with web pages who needs quick access to element attributes without opening DevTools.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/chrome-extension-orange.svg)

## ✨ Features

- **🎯 Instant Inspection** - Hover over any element to see its details immediately
- **🎨 Visual Highlighting** - Elements are highlighted with a blue outline for clarity
- **⚙️ Customizable Display** - Choose exactly what information you want to see
- **🚀 Lightweight & Fast** - Minimal performance impact on your browsing
- **💾 Persistent Settings** - Your preferences are saved across browser sessions
- **🔄 Dynamic Content Support** - Works with dynamically loaded elements
- **🎛️ Toggle On/Off** - Easy enable/disable from the extension popup
- **📱 Clean UI** - Multiline tooltip with professional design

## 📋 Display Options

Control what information appears in the tooltip:

- ✅ **Element Tag** - Show HTML tag name (e.g., `<div>`, `<button>`, `<a>`)
- ✅ **ID Attribute** - Display element's ID if it has one
- ✅ **Class Names** - Show all classes applied to the element
- ✅ **Data Attributes** - Display all `data-*` attributes
- ✅ **All Attributes** - Show every other attribute (href, src, title, etc.)

> 💡 **Smart Display**: Only attributes that exist are shown - no clutter!

## 🚀 Installation

### From Source

1. Clone this repository or download the ZIP file
   ```bash
   git clone https://github.com/yourusername/element-inspector.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in the top-right corner)

4. Click **Load unpacked**

5. Select the extension directory

6. The extension icon will appear in your toolbar - you're ready to go! 🎉

### From Chrome Web Store

*Coming soon!*

## 📖 How to Use

### Basic Usage

1. **Navigate** to any webpage
2. **Hover** your mouse over any element
3. **View** the tooltip with element details
4. **Move away** to hide the tooltip

### Configuring Display Options

1. Click the **Element Inspector** icon in your Chrome toolbar
2. Toggle the main switch to enable/disable the extension
3. Check/uncheck display options to customize what you see:
   - Show ID
   - Show Class Name
   - Show Tag Name
   - Show Data Attributes
   - Show All Attributes
4. Settings save automatically!

## 💼 Use Cases

### For Developers
- Quickly identify elements for CSS selectors
- Debug HTML structure without opening DevTools
- Verify class names and IDs during development
- Inspect attributes for JavaScript manipulation

### For QA Engineers
- Find element IDs for test automation (Selenium, Cypress, Playwright)
- Verify proper attribute usage in web applications
- Document element selectors for test cases
- Validate dynamic content changes

### For Web Scraping
- Identify target elements for data extraction
- Quickly find unique identifiers
- Verify attribute patterns across pages

### For Learning
- Understand HTML structure of real websites
- See how professional sites use classes and IDs
- Learn attribute patterns and best practices

## 🛠️ Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Storage only (for saving preferences)
- **Languages**: Vanilla JavaScript, CSS, HTML
- **Performance**: Minimal memory footprint, efficient event handling
- **Compatibility**: Works on all websites

## 🎨 Example Output

```
<button>
ID: submit-btn
Class: btn btn-primary mt-3
data-action: submit
data-track: click-event
type: submit
aria-label: Submit form
```

## 🔒 Privacy & Security

- ✅ **No data collection** - Zero tracking or analytics
- ✅ **No external requests** - All processing happens locally
- ✅ **Minimal permissions** - Only storage for settings
- ✅ **Open source** - Code is transparent and auditable
- ✅ **No ads or monetization** - Free forever

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by browser DevTools and React Developer Tools
- Built with ❤️ for the web development community

## 📧 Support

Found a bug or have a feature request? Please open an issue on GitHub.

---

**Made with ❤️ for developers by developers**
