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

jQuery.fn.baggageband = function( options ) {
  return new BaggageBand(this.selector, options);
};

BaggageBand.options = {
  container : '#bb-container',
  content   : '#bb-content',
  prev      : '#bb-previous',
  next      : '#bb-next',
  current   : 1, // if you want to change the starting position
  html      : '<div></div>'
};


BaggageBand.prototype.init = function(selector, options) {
  // init('.baggageband', {...})
  // if(selector !== undefined) {  }
  // init({...})
  // if(typeof selector === 'object' && options === undefined) { options = selector; selector = undefined; }

  this.options  = jQuery.extend({}, BaggageBand.options, options);
  this.container = selector || this.options.container;
  this.next = this.options.next;
  this.prev = this.options.prev;
  this.current = this.options.current;
  this.panels = jQuery(this.options.content).children(); // This can be done better.
  this.items = this.panels.length;

  console.log(this.panels, this.items);
  this._setup();
};

BaggageBand.prototype._setup = function() {
  // var next = jQuery.proxy(, this);
  // Add HTML to DOM
  // jQuery(this.container).append(BaggageBand.options.html);
  var that = this;
  // console.log(jQuery(this.next));
  jQuery(this.next).on('click', function() { that.next() } );
  jQuery(this.prev).on('click', function() { that.prev() } );

  jQuery(document).trigger('baggageband.initialized');
};

BaggageBand.prototype.next = function() {
  // check and make sure we aren't at
  // the end go to start if we are
  if (this.current === this.items){
    this.current = 1;
  } else {
    this.current++;
  }
  jQuery(document).trigger('baggageband.next');
};


BaggageBand.prototype.prev = function() {
  // check and make sure we aren't at
  // the end go to start if we are
  if (this.current === this.items){
    this.current = 1;
  } else {
    this.current--;
  }
  jQuery(document).trigger('baggageband.prev');
};

