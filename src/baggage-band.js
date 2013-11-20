/* Baggage Band
 * v0.0.1
 *
 * Baggage Band is a light weight carousel
 */

BaggageBand = function(selector, options) {
  // Allows BaggageBand to be called with or without new
  if(this instanceof BaggageBand) {
    this.init(selector, options);
  } else {
    new BaggageBand(selector, options);
  }
};

jQuery.fn.baggageband = function( options) {
  return new BaggageBand(this.selector, options);
};

BaggageBand.options = {
  container: '#bb-container',
  html   : '<div></div>'
};


BaggageBand.prototype.init = function(selector, options) {
  // init('.baggageband', {...})
  // if(selector !== undefined) {  }
  // init({...})
  // if(typeof selector === 'object' && options === undefined) { options = selector; selector = undefined; }

  this.options  = jQuery.extend({}, BaggageBand.options, options);
  this.selector = selector || this.options.container;

  this._setup();
};

BaggageBand.prototype._setup = function() {
  // Add HTML to DOM
  // jQuery('').append(BaggageBand.options.html);

  jQuery(document).trigger('baggageband.initialized');
};
