# Home Assistant 7-Segment Display Card

[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2023.12+-blue.svg)](https://www.home-assistant.io/)
[![GitHub release](https://img.shields.io/github/release/EranYeruham/HomeAssistant-7SegmentSensorDisplay.svg)](https://github.com/EranYeruham/HomeAssistant-7SegmentSensorDisplay/releases)
[![GitHub stars](https://img.shields.io/github/stars/EranYeruham/HomeAssistant-7SegmentSensorDisplay.svg)](https://github.com/EranYeruham/HomeAssistant-7SegmentSensorDisplay/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A custom Home Assistant Lovelace card that displays sensor values in a realistic 7-segment LED display style. Perfect for showing energy consumption, temperature, or any numeric sensor values with a retro digital look.

## ✨ Features

- 🔢 **Configurable digit count** - Set any number of digits with decimal places
- 🎨 **Customizable colors** - Active and inactive segment colors
- 📏 **Adjustable size** - Scale the display to fit your dashboard
- 🖱️ **Clickable history** - Click to view sensor history
- ⚡ **Real-time updates** - Automatically updates when sensor values change
- 🌙 **Dark theme friendly** - Looks great in any Home Assistant theme

## 🚀 Installation

### Method 1: Manual Installation

1. **Download the file:**
   - Download `sevenSegmentCard.js` from this repository
   - Place it in your `/config/www/` folder

2. **Add resource to Home Assistant:**
   - Go to **Settings** → **Dashboards** → **Resources**
   - Click **"Add Resource"**
   - URL: `/local/sevenSegmentCard.js`
   - Resource type: **JavaScript Module**

3. **Clear browser cache:**
   - Hard refresh: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### Method 2: HACS Installation

> Coming soon! This card will be available through HACS in future releases.

## 🔧 Configuration

### Basic Configuration

```yaml
type: custom:seven-segment-card
entity: sensor.energy_consumption
title: "Energy Usage"
```

### Complete Configuration

```yaml
type: custom:seven-segment-card
entity: sensor.3phase_clamp_meter_relay_energy
title: "Power Meter"
color: "#00cc00"              # Active segment color
inactive_color: "#122212"     # Inactive segment color
unit: "kWh"                   # Unit to display
decimals: 1                   # Number of decimal places
digits: 7                     # Total digits (including decimal)
size: 60                      # Size of each digit in pixels
tap_action:
  action: more-info           # Click action
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | The sensor entity to display |
| `title` | string | Optional | Card title |
| `color` | string | `#ff0000` | Active segment color (hex) |
| `inactive_color` | string | `#1a1a1a` | Inactive segment color (hex) |
| `unit` | string | Optional | Unit of measurement to display |
| `decimals` | number | `1` | Number of decimal places |
| `digits` | number | `7` | Total number of digits |
| `size` | number | `60` | Size of each digit in pixels |
| `tap_action` | object | `{action: more-info}` | Action when card is clicked |

## 🎨 Color Examples

### Energy Monitoring
```yaml
color: "#00cc00"        # Green
inactive_color: "#002200"
```

### Temperature Display
```yaml
color: "#ff6600"        # Orange
inactive_color: "#220800"
```

### Classic Red LED
```yaml
color: "#ff0000"        # Red
inactive_color: "#330000"
```

### Blue Digital
```yaml
color: "#0099ff"        # Blue
inactive_color: "#001133"
```

## 📊 Example Use Cases

### Power Consumption Monitor
```yaml
type: custom:seven-segment-card
entity: sensor.house_energy_consumption
title: "House Energy"
color: "#00ff00"
inactive_color: "#001100"
unit: "kWh"
decimals: 1
digits: 6
size: 80
```

### Temperature Display
```yaml
type: custom:seven-segment-card
entity: sensor.living_room_temperature
title: "Living Room"
color: "#ff4400"
inactive_color: "#220800"
unit: "°C"
decimals: 1
digits: 4
size: 60
```

### Compact Counter
```yaml
type: custom:seven-segment-card
entity: sensor.visitor_count
title: "Visitors Today"
color: "#0088ff"
inactive_color: "#001122"
decimals: 0
digits: 3
size: 40
```

## 🎯 Tap Actions

### Show History (Default)
```yaml
tap_action:
  action: more-info
```

### Navigate to Energy Dashboard
```yaml
tap_action:
  action: navigate
  navigation_path: /energy
```

### Call a Service
```yaml
tap_action:
  action: call-service
  service: light.toggle
  service_data:
    entity_id: light.living_room
```

## 🔧 Troubleshooting

### Card Not Loading
- **Check file location**: Ensure `sevenSegmentCard.js` is in `/config/www/`
- **Clear cache**: Hard refresh your browser (`Ctrl+F5`)
- **Check resources**: Verify the resource is added correctly in Dashboard settings
- **Check console**: Open browser dev tools (F12) and look for error messages

### Configuration Errors
- **Entity not found**: Make sure your entity ID exists and is spelled correctly
- **Invalid colors**: Use proper hex color format (`#rrggbb`)
- **Size issues**: Try different size values if display looks wrong

### Click Not Working
- **Update browser**: Make sure you're using a modern browser
- **Check console**: Look for JavaScript errors in browser dev tools
- **Try different tap_action**: Test with `navigation_path` instead of `more-info`

## 🏗️ Development

### Building from Source
```bash
git clone https://github.com/EranYeruham/HomeAssistant-7SegmentSensorDisplay.git
cd HomeAssistant-7SegmentSensorDisplay
# Edit sevenSegmentCard.js
```

### Testing
1. Copy modified file to `/config/www/`
2. Hard refresh browser
3. Test configuration changes

## 📋 Supported Characters

The display supports these characters:
- **Numbers**: 0-9
- **Letters**: E, r, o, H, L, P
- **Symbols**: - (dash), (space)
- **Decimal point**: Automatic positioning

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Feature Requests
- 🔲 HACS integration
- 🔲 More character support
- 🔲 Animation effects
- 🔲 Multiple color themes
- 🔲 Segment customization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Home Assistant community for inspiration and support
- Contributors and testers
- Everyone who provided feedback and suggestions

## 📞 Support

- 🐛 [Report bugs](https://github.com/EranYeruham/HomeAssistant-7SegmentSensorDisplay/issues)
- 💡 [Request features](https://github.com/EranYeruham/HomeAssistant-7SegmentSensorDisplay/issues)
- 💬 [Discussions](https://github.com/EranYeruham/HomeAssistant-7SegmentSensorDisplay/discussions)

---

⭐ **If this card helped you, please give it a star!** ⭐
