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
  container     : '#bb-container',
  content       : '#bb-content',
  prev          : '#bb-previous',
  next          : '#bb-next',
  current       : 1, // if you want to change the starting position
  html          : '<div></div>',
  controlsHtml  :
};


BaggageBand.prototype.init = function(selector, options) {

  this.options  = jQuery.extend({}, BaggageBand.options, options);
  this.containerEl = selector || this.options.container;
  this.nextEl = this.options.next;
  this.prevEl = this.options.prev;
  this.current = this.options.current;
  this.panels = jQuery(this.options.content).children(); // This can be done better.
  this.items = this.panels.length;

  console.log(this.panels, this.items);
  this._setup();
};

BaggageBand.prototype._setup = function() {

  // Add HTML to DOM
  // jQuery(this.container).append(BaggageBand.options.html);

  var that = this,
      nextEv = jQuery.proxy(this._next, this),
      prevEv = jQuery.proxy(this._prev, this);

  jQuery(this.nextEl).on('click', nextEv);
  jQuery(this.prevEl).on('click', prevEv);

  jQuery(document).on('baggageband.next baggageband.prev', function(){
    console.log('current', that.current)
  });

  jQuery(document).trigger('baggageband.initialized');
};

BaggageBand.prototype._next = function() {
  // check and make sure we aren't at
  // the end go to start if we are
  if (this.current === this.items){
    this.current = 1;
  } else {
    this.current++;
  }
  jQuery(document).trigger('baggageband.next');
};

BaggageBand.prototype._prev = function() {
  // check and make sure we aren't at
  // the start go to end if we are
  if (this.current === 1){
    this.current = this.items;
  } else {
    this.current--;
  }
  jQuery(document).trigger('baggageband.prev');
};

BaggageBand.prototype._paginate = function(page) {
  this.current = page;
  jQuery(document).trigger('baggageband.paginated');
};
