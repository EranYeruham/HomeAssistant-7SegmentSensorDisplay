# 7-Segment Display Card

A custom Lovelace card that displays sensor values in a realistic 7-segment LED display style.

## Installation

This card is available through HACS (Home Assistant Community Store).

### HACS Installation (Recommended)
1. Open HACS
2. Go to Frontend
3. Search for "7-Segment Display Card"
4. Install
5. Restart Home Assistant
6. Add the card to your dashboard

### Manual Installation
Download `sevenSegmentCard.js` and place it in `/config/www/`

## Configuration

```yaml
type: custom:seven-segment-card
entity: sensor.energy_consumption
title: "Energy Usage"
color: "#00cc00"
size: 60

4. **Commit message**: `"Add HACS info file"`

## Step 4: Create a Proper Release

1. **Go to "Releases"**
2. **Click "Create a new release"**
3. **Tag version**: `v1.0.0`
4. **Release title**: `7-Segment Display Card v1.0.0`
5. **Description**:

```markdown
## ✨ Features
- 7-segment LED display for Home Assistant sensors
- Customizable colors and size
- Clickable history integration
- HACS compatible installation

## 📦 Installation

### Via HACS (Recommended)
1. Add this repository to HACS
2. Install "7-Segment Display Card"
3. Restart Home Assistant

### Manual Installation  
Download `sevenSegmentCard.js` from the assets below.

## 🔧 Configuration

```yaml
type: custom:seven-segment-card
entity: sensor.energy_consumption
title: "Energy Usage"

6. **Upload the file**: Drag `sevenSegmentCard.js` into the release assets
7. **Click "Publish release"**

## Step 5: Submit to HACS Default Repository

Now you need to get your repository added to HACS's default list:

### Option A: Request Addition (Easier)
1. **Go to**: https://github.com/hacs/default
2. **Click "Issues"**
3. **Click "New Issue"**
4. **Choose "Add to default"**
5. **Fill out the form**:
   - Repository URL: `https://github.com/EranYeruham/HomeAssistant-7SegmentSensorDisplay`
   - Category: `plugin`
   - Description: Brief description of your card

### Option B: Create Pull Request (Advanced)
1. Fork the HACS default repository
2. Edit the appropriate JSON file
3. Add your repository
4. Create pull request

## Step 6: Wait for Approval

- HACS maintainers will review your submission
- They may ask for changes
- Once approved, users can install via HACS
- This process can take days to weeks

## 🔧 Alternative: Manual HACS Installation

Users can add your repository manually before official approval:

**Instructions for users:**
1. Open HACS
2. Click on "Frontend"
3. Click the 3-dots menu (top right)
4. Click "Custom repositories"
5. Add URL: `https://github.com/EranYeruham/HomeAssistant-7SegmentSensorDisplay`
6. Category: `Lovelace`
7. Click "Add"

## 📝 Checklist Before Submitting to HACS

- ✅ `hacs.json` file exists
- ✅ Proper README.md with installation instructions
- ✅ `info.md` file for HACS store
- ✅ MIT License file
- ✅ Semantic versioning (v1.0.0)
- ✅ Working JavaScript file
- ✅ Repository topics added
- ✅ No obvious bugs

**Would you like me to help you with any of these steps in detail?** The most important part is creating the `hacs.json` file and a proper release first!
