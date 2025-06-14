class SevenSegmentCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.updateDisplay();
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.addEventListener('click', this._handleClick.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this.removeEventListener('click', this._handleClick.bind(this));
  }

  _handleClick(e) {
    console.log('Element clicked!');
    e.stopPropagation();
    this._showHistory();
  }

  render() {
    const size = this.config.size || 60;
    const inactiveColor = this.config.inactive_color || '#1a1a1a';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --digit-size: ${size};
          --inactive-color: ${inactiveColor};
        }
        .card {
          padding: 16px;
          background: var(--ha-card-background, var(--card-background-color, white));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,0.1));
          font-family: var(--paper-font-body1_-_font-family);
          cursor: pointer;
          transition: box-shadow 0.3s ease;
        }
        
        .card:hover {
          box-shadow: var(--ha-card-box-shadow, 0 4px 12px rgba(0,0,0,0.15));
        }
        
        .title {
          font-size: 1.2em;
          font-weight: bold;
          margin-bottom: 16px;
          color: var(--primary-text-color);
          text-align: center;
        }
        
        .display-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: 20px;
          background: #1a1a1a;
          border-radius: 8px;
          border: 2px solid #333;
        }
        
        #display {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 4px;
        }
        
        .digit {
          position: relative;
          width: calc(var(--digit-size, 60) * 1px);
          height: calc(var(--digit-size, 60) * 1.67px);
        }
        
        .segment {
          position: absolute;
          background: var(--inactive-color);
          transition: background-color 0.3s ease;
        }
        
        .segment.on {
          background: ${this.config.color || '#ff0000'};
          box-shadow: 0 0 10px ${this.config.color || '#ff0000'};
        }
        
        /* Horizontal segments */
        .seg-a, .seg-d, .seg-g {
          width: calc(var(--digit-size, 60) * 0.67px);
          height: calc(var(--digit-size, 60) * 0.1px);
          left: calc(var(--digit-size, 60) * 0.17px);
        }
        
        .seg-a { top: calc(var(--digit-size, 60) * 0.03px); }
        .seg-d { bottom: calc(var(--digit-size, 60) * 0.03px); }
        .seg-g { top: calc(var(--digit-size, 60) * 0.78px); }
        
        /* Vertical segments */
        .seg-b, .seg-c, .seg-e, .seg-f {
          width: calc(var(--digit-size, 60) * 0.1px);
          height: calc(var(--digit-size, 60) * 0.58px);
        }
        
        .seg-b { top: calc(var(--digit-size, 60) * 0.13px); right: calc(var(--digit-size, 60) * 0.07px); }
        .seg-c { bottom: calc(var(--digit-size, 60) * 0.13px); right: calc(var(--digit-size, 60) * 0.07px); }
        .seg-e { bottom: calc(var(--digit-size, 60) * 0.13px); left: calc(var(--digit-size, 60) * 0.07px); }
        .seg-f { top: calc(var(--digit-size, 60) * 0.13px); left: calc(var(--digit-size, 60) * 0.07px); }
        
        .decimal {
          width: calc(var(--digit-size, 60) * 0.13px);
          height: calc(var(--digit-size, 60) * 0.13px);
          background: var(--inactive-color);
          border-radius: 50%;
          position: absolute;
          bottom: calc(var(--digit-size, 60) * 0.07px);
          right: calc(var(--digit-size, 60) * -0.2px);
          transition: background-color 0.3s ease;
        }
        
        .decimal.on {
          background: ${this.config.color || '#ff0000'};
          box-shadow: 0 0 8px ${this.config.color || '#ff0000'};
        }
        
        .unit {
          color: var(--secondary-text-color);
          font-size: 1.1em;
          margin-left: 16px;
          align-self: flex-end;
          margin-bottom: 8px;
        }
      </style>
      
      <div class="card" @click="${this._showHistory}">
        ${this.config.title ? `<div class="title">${this.config.title}</div>` : ''}
        <div class="display-container">
          <div id="display"></div>
          ${this.config.unit ? `<div class="unit">${this.config.unit}</div>` : ''}
        </div>
      </div>
    `;
  }

  updateDisplay() {
    if (!this._hass || !this.config.entity) return;
    
    const entity = this._hass.states[this.config.entity];
    if (!entity) return;
    
    let value = entity.state;
    const digits = this.config.digits || 7; // 6 digits + 1 decimal
    const decimals = this.config.decimals !== undefined ? this.config.decimals : 1;
    
    // Handle numeric formatting
    if (!isNaN(value)) {
      value = parseFloat(value).toFixed(decimals);
    }
    
    // Pad with leading zeros if needed
    let [intPart, decPart] = value.toString().split('.');
    const totalIntDigits = digits - (decimals > 0 ? decimals : 0);
    intPart = intPart.padStart(totalIntDigits, '0');
    
    if (decimals > 0 && decPart) {
      value = intPart + '.' + decPart.padEnd(decimals, '0');
    } else if (decimals > 0) {
      value = intPart + '.' + '0'.repeat(decimals);
    } else {
      value = intPart;
    }
    
    const displayElement = this.shadowRoot.getElementById('display');
    displayElement.innerHTML = this.createDigits(value);
  }

  createDigits(value) {
    const digits = value.split('');
    let html = '';
    
    for (let i = 0; i < digits.length; i++) {
      const char = digits[i];
      
      if (char === '.') {
        // Add decimal point to previous digit
        const lastDigit = html.lastIndexOf('</div>');
        if (lastDigit !== -1) {
          html = html.substring(0, lastDigit) + 
                 '<div class="decimal on"></div>' + 
                 html.substring(lastDigit);
        }
      } else {
        html += this.createDigit(char);
      }
    }
    
    return html;
  }

  createDigit(char) {
    const patterns = {
      '0': ['a', 'b', 'c', 'd', 'e', 'f'],
      '1': ['b', 'c'],
      '2': ['a', 'b', 'g', 'e', 'd'],
      '3': ['a', 'b', 'g', 'c', 'd'],
      '4': ['f', 'g', 'b', 'c'],
      '5': ['a', 'f', 'g', 'c', 'd'],
      '6': ['a', 'f', 'g', 'e', 'd', 'c'],
      '7': ['a', 'b', 'c'],
      '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      '9': ['a', 'b', 'c', 'd', 'f', 'g'],
      '-': ['g'],
      ' ': [],
      'E': ['a', 'f', 'g', 'e', 'd'],
      'r': ['e', 'g'],
      'o': ['g', 'e', 'd', 'c'],
      'H': ['f', 'g', 'b', 'c', 'e'],
      'L': ['f', 'e', 'd'],
      'P': ['a', 'b', 'f', 'g', 'e']
    };
    
    const segments = patterns[char] || [];
    const allSegments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    
    let html = '<div class="digit">';
    
    allSegments.forEach(seg => {
      const isOn = segments.includes(seg) ? 'on' : '';
      html += `<div class="segment seg-${seg} ${isOn}"></div>`;
    });
    
    html += '</div>';
    return html;
  }

  static getConfigElement() {
    return document.createElement('seven-segment-card-editor');
  }

  static getStubConfig() {
    return {
      entity: '',
      title: '7-Segment Display',
      color: '#ff0000',
      inactive_color: '#1a1a1a',
      decimals: 1,
      digits: 7,
      size: 60,
      tap_action: { action: 'more-info' }
    };
  }

  _showHistory() {
    console.log('_showHistory called for:', this.config.entity);
    
    if (!this.config.entity) {
      console.log('No entity configured');
      return;
    }
    
    // Simple navigation approach
    const entityId = this.config.entity;
    const url = `/history?entity_id=${entityId}`;
    
    console.log('Navigating to:', url);
    window.location.href = url;
  }

  getCardSize() {
    return 3;
  }
}

// Wait for the DOM to be ready
if (customElements.get('seven-segment-card')) {
  console.info('%cSEVEN-SEGMENT-CARD', 'color: orange; font-weight: bold', 'already defined');
} else {
  customElements.define('seven-segment-card', SevenSegmentCard);
  console.info('%cSEVEN-SEGMENT-CARD', 'color: #ff6b6b; font-weight: bold', 'defined successfully');
}

// Register the card
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'seven-segment-card',
  name: '7-Segment Display Card',
  description: 'Display sensor values in 7-segment LED style'
});

console.info('%cSEVEN-SEGMENT-CARD', 'color: #ff6b6b; font-weight: bold', 'v1.1.16 loaded successfully');